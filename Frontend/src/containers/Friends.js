import React, { useState, useEffect, useCallback } from 'react';

// components
import SideBar from "../components/_common/SideBar";

// friends components
import Chat from "../components/Friends/Chat";
import CommonFavourites from "../components/Friends/CommonFavourites";
import RecentlyPlayed from "../components/Friends/RecentlyPlayed";

// third party
import { connect } from "react-redux";

// config
import { friendsViews } from "../config";
import { dummyFriends, dummyChat } from "../dummy";

const Friends = ({ theme, user }) => {
    const [currView, setCurrView] = useState(friendsViews[0].value);
    const [currUser, setCurrUser] = useState(dummyFriends[0].content[0]);
    const [currChat, setCurrChat] = useState([]);

    useEffect(() => {
        setCurrChat(dummyChat.user.id === currUser.id ? dummyChat.messages : []);
    }, [currUser]);

    const handleChat = useCallback((newMessage) => {
        setCurrChat([
            ...currChat,
            {
                name: user.fullname,
                username: user.username,
                id: user.id,
                message: newMessage,
            },
        ]);
    }, [currChat, user]);

    return (
        <div className="friends-container">
            <SideBar 
                sections={dummyFriends}
                handleSelect={(user) => setCurrUser(user)}
                selected={currUser}
                page="friends"
            />
            <div className="main-view">
                {
                    currView === friendsViews[0].value && currUser.id &&
                    <Chat 
                        page="friends"
                        theme={theme}
                        user={currUser}
                        data={currChat}
                        handleView={(view) => setCurrView(view)}
                        handleChat={handleChat}
                    />
                }
                {
                    currView === friendsViews[1].value && currUser.id &&
                    <CommonFavourites 
                        user={currUser}
                        handleView={(view) => setCurrView(view)}
                    />
                }
                {
                    currView === friendsViews[2].value && currUser.id &&
                    <RecentlyPlayed 
                        user={currUser}
                        handleView={(view) => setCurrView(view)}
                    />
                }
            </div>
        </div>
    );
}
export default connect((store) => ({
	theme: store.theme,
    user: store.login.user,
}))(Friends);
