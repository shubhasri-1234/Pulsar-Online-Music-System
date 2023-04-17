import React, { useState, useEffect } from 'react';

// components
import Button from "./Button";

// third party
import { connect } from "react-redux";

// icons
import { IconContext } from "react-icons";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { BsPersonPlusFill, BsPlusLg } from "react-icons/bs";

// config
import { themeColors } from "../../config";

const SideBar = ({
    sections=[{
        title: '',
        content: [],
    }],
    section={},
    selected={},
    handleSelect,
    page='',
    create=false,
    handleOpenModal,
    currSong={},
    isPlaying=false,
    isAlbumArtExpanded=false,
    setAlbumArtExpanded,
    theme,
}) => {
    const [showCollapseIcon, setShowCollapseIcon] = useState(true);

    useEffect(() => {
        if (!isAlbumArtExpanded) {
            setShowCollapseIcon(false);
        }
    }, [isAlbumArtExpanded]);

    return (
        <div className={"sidebar-container " + (page)}>
            {
                (page === 'friends' || page === 'groups') && sections.map((section, i) => (
                    <div key={i} className="sidebar-section-container">
                        <div className="title">
                            <div>{section?.title || ''}</div>
                            {
                                create &&
                                <Button handleOnClick={handleOpenModal}>
                                    <IconContext.Provider value={{ color: '#000000', size: "11px", className: 'create-icon' }}>
                                        <BsPlusLg />
                                    </IconContext.Provider>
                                    <div>Create</div>
                                </Button>
                            }
                        </div>
                        <div className="content-container">
                            {
                                section?.content?.length > 0 && section?.content?.map((obj, j) => (
                                    <div key={j} theme={theme.color} className={"content-detail" + (selected.id === obj.id ? ' selected' : '')} onClick={() => handleSelect(obj)}>
                                        <div className={"icon " + (page)}></div>
                                        <div className="name">{obj?.name || ''}</div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
            {
                page === 'playlists' &&
                <React.Fragment>
                    <div className="title">{section?.title || ''}</div>
                    <div className="content-container">
                        {
                            section?.default?.length > 0 && section?.default?.map((obj, j) => (
                                <div key={j} theme={theme.color} className={"content-detail" + (selected.id === obj.id ? ' selected' : '')} onClick={() => handleSelect(obj)}>
                                    <div className="name">{obj?.name || ''}</div>
                                    {
                                        isPlaying && (obj.id === currSong.playlistId) &&
                                        <div className={"music-bars" + (isPlaying ? ' play' : ' pause')}>
                                            <div className="bar a"></div>
                                            <div className="bar b"></div>
                                            <div className="bar c"></div>
                                            <div className="bar d"></div>
                                        </div>
                                    }
                                </div>
                            ))
                        }
                        {
                            section?.content?.length > 0 && section?.content?.map((obj, k) => (
                                <div key={k} theme={theme.color} className={"content-detail" + (selected.id === obj.id ? ' selected' : '')} onClick={() => handleSelect(obj)}>
                                    <div className="name">{obj?.name || ''}</div>
                                    {
                                        isPlaying && (obj.id === currSong.playlistId) &&
                                        <div className={"music-bars" + (isPlaying ? ' play' : ' pause')}>
                                            <div className="bar a"></div>
                                            <div className="bar b"></div>
                                            <div className="bar c"></div>
                                            <div className="bar d"></div>
                                        </div>
                                    }
                                </div>
                            ))
                        }
                    </div>
                    {
                        currSong.id && isAlbumArtExpanded &&
                        <div 
                            className="song-album-art" 
                            onClick={setAlbumArtExpanded} 
                            onMouseEnter={() => setShowCollapseIcon(true)} 
                            onMouseLeave={() => setShowCollapseIcon(false)}
                        >
                            {
                                currSong?.art ?
                                <img src={currSong?.art} alt="" />
                                :
                                <div className="placeholder-art"></div>
                            }
                            {
                                showCollapseIcon &&
                                <IconContext.Provider value={{ color: themeColors[theme.color], size: "22px", className: 'collapse-icon' }}>
                                    <IoIosArrowDropdownCircle />
                                </IconContext.Provider>
                            }
                        </div>
                    }
                </React.Fragment>
            }
        </div>
    );
}

export default connect((store) => ({
	theme: store.theme,
}))(SideBar);
