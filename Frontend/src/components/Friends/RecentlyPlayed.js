import React from 'react';

const RecentlyPlayed = ({
    user={},
    handleView,
}) => {
    return (
        <div className="chat-container">
            <div className="chat-header-container">
                <div className="user-container">
                    <div className="icon"></div>
                    <div className="name">{user.name}</div>
                </div>
                <div className="view" onClick={() => handleView('commonFavourites')}>Common Favourites</div>
                <div className="view" onClick={() => handleView('chat')}>Back to Chat</div>
            </div>
        </div>
    )
}
export default RecentlyPlayed;