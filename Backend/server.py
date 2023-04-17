from flask import Flask
from flask import request
from flask_cors import CORS
from flask_mysqldb import MySQL
from flask_sqlalchemy import SQLAlchemy
import datetime
import time
import json
import jwt

app = Flask(__name__)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_DB'] = 'dbms_mini_project'

db = SQLAlchemy()
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root@localhost/dbms_mini_project"
db.init_app(app)

CORS(app)
mysql = MySQL(app)

@app.route("/")
def home():
    return "Home"

secret_key = "dbms"


# New User - Signup
@app.route("/signup", methods=["POST"])
def userRegister():
    fullname = request.json["fullname"]
    username = request.json["username"]
    email = request.json["email"]
    password = request.json["password"]

    flag = False

    query = 'select username from user_info'

    data_raw = db.engine.execute(query)

    for user in data_raw:
        if username == user['username']:
            flag = True
            
    if flag:
        return json.dumps({
            "success": False, 
            "error": { 
                "fields": {
                    "username": "Username already exists"
                }
            }
        })

    else:
        cur = mysql.connection.cursor()
        cur.execute(''' INSERT INTO user_info(fullname, username, email, password) VALUES("%s", "%s", "%s", "%s"); ''' %(fullname, username, email, password))
        mysql.connection.commit()
        cur.close()

        return json.dumps({"success": True, "message": "Signup successful"})

# User - Login
@app.route("/login", methods=["POST"])
def userLogin():
    username = request.json["username"]
    password = request.json["password"]
    
    flag = False
    uname_found = False
    pword_matched = False
    user_data = {}
    
    query = 'select * from user_info'

    data_raw = db.engine.execute(query)

    if username and password:
        for user in data_raw:
            if username == user['username']:
                uname_found = True
                if password == user['password']:
                    pword_matched = True
                    flag = True
                    
                    data = {}
                    data["id"] = user["id"]
                    data["username"] = user["username"]
                    data["email"] = user["email"]
                    data["fullname"] = user["fullname"]
                    
                    user_data = data
    
    if flag:
        user_data['expiry'] = str(datetime.datetime.now() + datetime.timedelta(days=1))
        token = jwt.encode(user_data, secret_key, algorithm="HS256")
        user_data['token'] = str(token)
        
        return json.dumps({"success": True, "data": user_data, "message": "Login successful"})
    else:
        resp = {
            "success": False,
            "message": "Login failed"
        }
        
        error = {}
        fields = {}
        if not uname_found:
            fields['username'] = "Username not found"
        elif not pword_matched:
            fields['password'] = "Wrong password"
        
        error['fields'] = fields
        resp['error'] = error
            
        return json.dumps(resp)

# Get list of all Users
@app.route("/users", methods=["GET"])
def getAllUsers(id):

    query = 'select * from user_info;'

    data_raw = db.engine.execute(query)

    data = []
    for item in data_raw:
        temp = {}    
        temp['id'] = item['id']
        temp['fullname'] = item['fullname']
        temp['username'] = item['username']
        temp['email'] = item['email']
        data.append(temp)

    return json.dumps({ "data": data }, default=str)


#Get dashboard data of loggedIn User
@app.route("/home", methods=["GET"])
def getDashboard():

    #top friends
    query = 'select fullname, id from user_info U,(select friendid from friends where userid=1) F where U.id=F.friendid limit 5'

    data_raw = db.engine.execute(query)

    data = []
    obj={}
    obj['title']='Friends'
    obj['content']=[]
    for item in data_raw:
        temp={}
        temp['fullname'] = item['fullname']
        temp['id']=item['id']
        obj['content'].append(temp)
    data.append(obj)


    #top songs
    query = 'select title, S.sid from songs S,(select sid from favourite_song_list where userid=1) F where S.sid=F.sid limit 5'

    data_raw = db.engine.execute(query)

    obj={}
    obj['title']='Songs'
    obj['content']=[]
    for item in data_raw:
        temp={}
        temp['title'] = item['title']
        temp['sid']=item['sid']

        obj['content'].append(temp)
    data.append(obj)

    #top groups
    query = 'select groupname, A.groupid from artist_fan_group A,(select groupid from group_members where userid=1) F where A.groupid=F.groupid limit 10'
    data_raw = db.engine.execute(query)

    obj={}
    obj['title']='Groups'
    obj['content']=[]
    for item in data_raw:
        temp={}
        temp['groupname'] = item['groupname']
        temp['groupid']=item['groupid']

        obj['content'].append(temp)
    data.append(obj)

    #top playlists
    query = 'select pname, P.pid from playlist_info P,(select pid from  favourite_playlist where userid=1) F where P.pid=F.pid limit 5'
    data_raw = db.engine.execute(query)
    
    obj={}
    obj['title']='Playlists'
    obj['content']=[]
    for item in data_raw:
        temp={}
        temp['pname'] = item['pname']
        temp['pid']=item['pid']
        obj['content'].append(temp)
    data.append(obj)

    return json.dumps({ "data": data }, default=str)

#Get friends of loggedIn User
@app.route("/friends", methods=["GET"])
def getFriends():

    #all friends
    query = 'select fullname, id, username from user_info U,(select friendid from friends where userid=2) F where U.id=F.friendid'

    data_raw = db.engine.execute(query)

    data = []
    obj={}
    obj['title']='Friends'
    obj['content']=[]
    for item in data_raw:
        temp={}
        temp['fullname'] = item['fullname']
        temp['id']=item['id']
        obj['content'].append(temp)
    data.append(obj)

    return json.dumps({ "data": data }, default=str)

#Get playlists of loggedIn User
@app.route("/playlists", methods=["POST"])
def getPlaylists():

    #all playlists
    userid = request.json["userId"]
    query = 'select pname, P.pid from playlist_info P,(select pid from  favourite_playlist where userid="%d") F where P.pid=F.pid;' % (int(userid))

    data_raw = db.engine.execute(query)

    obj={}
    obj['title']='Playlists'
    obj['content']=[]
    for item in data_raw:
        temp={}
        temp['name'] = item['pname']
        temp['id'] = item['pid']
        temp['type'] = 'playlist'
        temp['following'] = True
        obj['content'].append(temp)

    return json.dumps({ "data": obj, "success": True}, default=str)

#Get playlist songs of selected playlist
@app.route("/playlist", methods=["POST"])
def getPlaylistSongs():

    #all playlists
    userid = request.json["userId"]
    playlistid = request.json["playlistId"]

    query = 'select pname from playlist_info where pid = %d;' % (int(playlistid))
    playlist_name = db.engine.execute(query)
    print(playlist_name)
    
    query = 'select * from songs S,(select sid from playlist_songs where pid="%d") F where S.sid=F.sid;' % (int(playlistid))

    data_raw = db.engine.execute(query)

    obj={}
    obj['id'] = playlistid
    obj['name'] = playlist_name
    songs=[]
    for song in data_raw:
        temp={}
        temp['id'] = song['sid']
        temp['name'] = song['title']
        temp['artist'] = song['artist']
        temp['durationInSec'] = song['durationsec']
        temp['album'] = song['album']
        temp['art']=''
        temp['release'] = song['year']
        temp['playlistid'] = playlistid

        query = 'select count(*) from (SELECT * FROM favourite_song_list where userid = %d and sid = %d) a;' % (int(userid), (int(song['sid'])))
        favourite = db.engine.execute(query)

        if(favourite==1):
            temp['liked'] = True
        else:
            temp['liked'] = False

        songs.append(temp)

    obj['songs'] = songs

    return json.dumps({ "data": obj, "success": True}, default=str)

