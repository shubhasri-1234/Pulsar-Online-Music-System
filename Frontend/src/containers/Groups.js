import React, { useState, useEffect, useCallback } from 'react';

// components
import SideBar from "../components/_common/SideBar";
import Button from "../components/_common/Button";
import InputField from "../components/_common/InputField";
import Modal from 'react-bootstrap/Modal';

// friends components
import Chat from "../components/Friends/Chat";

// third party
import { connect } from "react-redux";

// config
import { friendsViews, themeColors, initNewGroup } from "../config";
import { dummyGroups, dummyChat } from "../dummy";

const Groups = ({ theme, user }) => {
    const [groups, setGroups] = useState(dummyGroups);
    const [currView, setCurrView] = useState(friendsViews[0].value);
    const [currGroup, setCurrGroup] = useState(dummyGroups[0].content[1]);
    const [currChat, setCurrChat] = useState([]);
    const [newGroup, setNewGroup] = useState(initNewGroup);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        setCurrChat(dummyChat.user.id === currGroup.id ? dummyChat.messages : []);
    }, [currGroup]);

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

    const handleModal = (close=false) => {
        if (close) {
            setModal(false);
            setNewGroup(initNewGroup);
        } else {
            setModal(true);
        }
    }

    const handleForm = (field, value) => {
        setNewGroup({
            ...newGroup,
            [field]: value
        });
    }

    const handleCreateGroup = () => {
        let updatedGroups = [ ...groups ];
        updatedGroups[0].content = [
            {
                id: Math.floor(Math.random() * (200 - 100) + 100),
                ...newGroup
            },
            ...updatedGroups[0].content,
        ]
        setGroups(updatedGroups);
        handleModal(true);
    }

    return (
        <div className="groups-container">
            <SideBar 
                sections={groups}
                handleSelect={(group) => setCurrGroup(group)}
                selected={currGroup}
                page="groups"
                create={true}
                handleOpenModal={() => handleModal(false)}
            />
            <div className="main-view">
                {
                    currView === friendsViews[0].value && currGroup.id &&
                    <Chat 
                        page="groups"
                        theme={theme}
                        user={currGroup}
                        data={currChat}
                        handleView={(view) => setCurrView(view)}
                        handleChat={handleChat}
                        showTabs={false}
                        modalOpen={modal}
                    />
                }
                <Modal show={modal} onHide={() => handleModal(true)} centered>
                    <Modal.Header closeButton closeVariant='white'>
                        <Modal.Title>Create Group</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputField 
                            classes="create-group"
                            customStyles={{ "--input-theme": themeColors[theme.color] }}
                            label="Name"
                            value={newGroup.name}
                            onChange={(e) => handleForm('name', e.target.value)}
                        />
                        <InputField 
                            classes="create-group"
                            customStyles={{ "--input-theme": themeColors[theme.color] }}
                            label="Artist"
                            value={newGroup.artist}
                            onChange={(e) => handleForm('artist', e.target.value)}
                        />
                        <InputField 
                            classes="create-group"
                            customStyles={{ "--input-theme": themeColors[theme.color] }}
                            label="Description"
                            value={newGroup.description}
                            onChange={(e) => handleForm('description', e.target.value)}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button classes="custom-modal-button" customStyles={{ "--button-theme": themeColors[theme.color] }} type="secondary" handleOnClick={() => handleModal(true)}>
                            Close
                        </Button>
                        <Button classes="custom-modal-button" disabled={!newGroup.name} customStyles={{ "--button-theme": themeColors[theme.color] }} handleOnClick={handleCreateGroup}>
                            Create
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}
export default connect((store) => ({
	theme: store.theme,
    user: store.login.user,
}))(Groups);
