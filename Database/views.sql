create view view1 as (select P,Q from (select A.userid as P,B.userid as Q,count(*) as R from favourite_song_list A,favourite_song_list B where A.userid!=B.userid and A.sid=B.sid group by A.userid,B.userid having count(*)>=5) where P<Q);

create view view2 as (select distinct from1 as UserID, UserName from (select from1,count(*) from private_message group by from1 having count(*)>3) P,user_info where user_info.id=P.from1);

create view view3 as (select P,Q from (select A.userid as P,B.userid as Q,count(*) as R from friends A,friends B where A.userid!=B.userid and A.friendid=B.friendid group by A.userid,B.userid having count(*)>=5) where (P,Q) NOT IN (select F.userid,F.friendid from friends F));

create view view4 as With table1 as (select count(*) as A from friends), table2 as (select count(*) as B from user_info) select table1.A/table2.B as AVERAGE_NUMBER_OF_FRIENDS_PER_USER from table1,table2;

create view view5 as (select F.UserID, U.UserName,count(*) as COUNT from friends F,user_info U where F.UserID=U.ID group by F.UserID,U.UserName);

create view view6 as (select P.pid, U.pname, count(*) as COUNT from playlist_songs P,playlist_info U where P.pid=U.pid group by P.pid,U.pname);


