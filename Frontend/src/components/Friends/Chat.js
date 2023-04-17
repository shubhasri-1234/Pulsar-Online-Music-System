import React, { useState, useEffect, useRef, useCallback } from 'react';

// components
import InputField from "../_common/InputField";

// icons
import { IconContext } from "react-icons";
import { IoMdSend } from "react-icons/io";

// config
import { themeColors } from "../../config";

const Chat = ({
    user={},
    group={},
    data=[],
    handleView,
    handleChat,
    theme,
    page='',
    showTabs=true,
    modalOpen=false,
}) => {
    const [newMessage, setNewMessage] = useState('');
    const chatRef = useRef();
    const inputRef = useRef();

    const handleScroll = () => {
        // scroll to the bottom of chat to see latest messages
        if (chatRef?.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }

    useEffect(() => {
        handleScroll();
        if (!modalOpen) {
            setTimeout(() => {
                inputRef?.current?.focus();
            }, 100);
        }
    }, [user, group, data, modalOpen]);

    const handleInput = (value) => {
        setNewMessage(value);
    }

    const handleSendNewMessage = useCallback(() => {
        if (newMessage) {
            handleChat(newMessage);
            setNewMessage('');
        }
    }, [handleChat, newMessage]);

    const handleKeys = useCallback((e) => {
        if(e.keyCode === 13) {
			handleSendNewMessage();
		}
    }, [handleSendNewMessage]);

    return (
        <div className="chat-container">
            <div className="chat-header-container">
                <div className="user-container">
                    <div className={"icon " + (page)}></div>
                    <div className="name">{user.name || group.name}</div>
                </div>
                {
                    showTabs &&
                    <React.Fragment>
                        <div className="view" onClick={() => handleView('commonFavourites')}>Common Favourites</div>
                        <div className="view" onClick={() => handleView('recentlyPlayed')}>Recently Played</div>
                    </React.Fragment>
                }
            </div>
            <div className="messages-container" ref={chatRef}>
                {
                    data.map((message, i) => (
                        <div key={i} className={"message" + ((message.id === user.id || message.id === group.id) ? ' right' : ' left')}>{message.message || ''}</div>
                    ))
                }
            </div>
            <div className="input-message-container">
                <InputField 
                    value={newMessage}
                    onChange={(e) => handleInput(e.target.value)}
                    placeholder="Type a message..."
                    inputRef={inputRef}
                    onKeyUp={handleKeys}
                />
                <IconContext.Provider value={{ color: themeColors[theme.color], size: "25px", className: 'send-icon' }}>
                    <IoMdSend onClick={handleSendNewMessage} />
                </IconContext.Provider>
            </div>
        </div>
    );
}
export default Chat;
