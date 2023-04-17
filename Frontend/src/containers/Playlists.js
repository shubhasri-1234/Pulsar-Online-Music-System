import React, { useCallback, useState, useEffect, useRef } from 'react';

// components
import SideBar from "../components/_common/SideBar";

// playlists components
import Home from "../components/Playlists/Home";
import Discover from "../components/Playlists/Discover";
import Playlist from "../components/Playlists/Playlist";

// third party
import { connect } from "react-redux";

// icons
import { IconContext } from "react-icons";
import { MdPlayCircle, MdPauseCircle } from "react-icons/md";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IoIosShuffle, IoIosVolumeLow, IoIosVolumeHigh, IoIosVolumeOff, IoIosArrowDropupCircle } from "react-icons/io";
import { RiRepeat2Fill, RiRepeatOneFill } from "react-icons/ri";

// utils
import { getReadableTime } from "../utils";

// actions
import { fetchPlaylists, fetchPlaylist } from "../actions/playlists";

// config
import { themeColors } from "../config";
import { dummyPlaylists, dummyPlaylist } from "../dummy";

const Playlists = ({ theme, playlistsList, playlistDetails }) => {
    const { listLoading, listData } = playlistsList;
    const { loading, data } = playlistDetails;

    const [selectedTab, setSelectedTab] = useState(dummyPlaylists.content[0]);
    const [currSong, setCurrSong] = useState(dummyPlaylist.songs[1]);
    const [currSongIndex, setCurrSongIndex] = useState(1);
    const [currDuration, setCurrDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState('all');
    const [isAlbumArtExpanded, setAlbumArtExpanded] = useState(false);
    const [showExpandIcon, setShowExpandIcon] = useState(false);
    const [currVolume, setCurrVolume] = useState(80);
    const intervalRef = useRef();

    useEffect(() => {
        handlePlay();
    }, []);

    const handleSelectPlaylist = async (tab) => {
        setSelectedTab(tab);
    }

    const handlePlay = () => {
        setIsPlaying(true);
        if (!currSong.id) {
            setCurrSong(dummyPlaylist.songs[0]);
            setCurrSongIndex(0);
        }
    }

    const handlePause = useCallback(() => {
        setIsPlaying(false);
        clearInterval(intervalRef.current);
    }, [intervalRef]);

    const handleSlider = (value) => {
        setCurrDuration(parseInt(value));
    }

    const handleActions = useCallback((action='next') => {
        switch (action) {
            case 'next':
                setCurrSong(dummyPlaylist.songs[currSongIndex === 9 ? 0 : currSongIndex + 1]);
                setCurrSongIndex(currSongIndex === 9 ? 0 : currSongIndex + 1);
                setCurrDuration(0);
                if (!isPlaying) {
                    setIsPlaying(true);
                }
                break;

            case 'previous':
                setCurrSong(dummyPlaylist.songs[currSongIndex === 0 ? 9 : currSongIndex - 1]);
                setCurrSongIndex(currSongIndex === 0 ? 9 : currSongIndex - 1);
                setCurrDuration(0);
                if (!isPlaying) {
                    setIsPlaying(true);
                }
                break;

            case 'shuffle':
                setIsShuffle(!isShuffle);
                break;

            case 'repeat':
                if (isRepeat === 'off') {
                    setIsRepeat('all');
                } else if (isRepeat === 'all') {
                    setIsRepeat('one');
                } else {
                    setIsRepeat('off');
                }
                break;

            case 'like':
                setCurrSong({
                    ...currSong,
                    liked: !currSong.liked,
                });
                break;

            default:
                break;
        }
    }, [isPlaying, isShuffle, isRepeat, currSong, currSongIndex]);

    const handlePlaySong = (song, index) => {
        setCurrDuration(0);
        setCurrSong(song);
        setCurrSongIndex(index);
        if (!isPlaying) {
            setIsPlaying(true);
        }
    }

    const handleDuration = useCallback(() => {
        if (currDuration === currSong.durationInSec) {
            if (isRepeat === 'off' && currSongIndex === 9) {
                setCurrSong({});
                setCurrSongIndex(undefined);
                setCurrDuration(0);
                handlePause();
            } else if (isRepeat === 'one') {
                setCurrDuration(0);
            } else {
                handleActions('next');
            }
        } else {
            setCurrDuration(currDuration + 1);
        }
    }, [currDuration, currSong, currSongIndex, isRepeat, handleActions, handlePause]);

    const handleExpandAlbumArt = () => {
        setAlbumArtExpanded(true);
        setShowExpandIcon(false);
    }

    useEffect(() => {
        if (isPlaying) {
            const id = setInterval(() => {
                handleDuration();
            }, 1000);
            intervalRef.current = id;
        }
        return () => clearInterval(intervalRef.current);
    }, [handleDuration, isPlaying]);

    return (
        <div className="playlists-container">
            <div className="content-section">
                <SideBar 
                    section={dummyPlaylists}
                    handleSelect={handleSelectPlaylist}
                    selected={selectedTab}
                    page="playlists"
                    currSong={currSong}
                    isPlaying={isPlaying}
                    isAlbumArtExpanded={isAlbumArtExpanded}
                    setAlbumArtExpanded={() => setAlbumArtExpanded(false)}
                />
                <div className="main-view">
                    {
                        selectedTab.type === 'dashboard' &&
                        <Home />
                    }
                    {
                        selectedTab.type === 'new' &&
                        <Discover />
                    }
                    {
                        selectedTab.type === 'playlist' &&
                        <Playlist
                            theme={theme}
                            currSong={currSong}
                            playlist={dummyPlaylist}
                            isPlaying={isPlaying}
                            handleSelect={handlePlaySong}
                            handleAction={handleActions}
                        />
                    }
                </div>
            </div>
            <div className="player-container">
                <div className="info-container">
                    {
                        currSong.id &&
                        <React.Fragment>
                            <div className="info">
                                {
                                    !isAlbumArtExpanded &&
                                    <div 
                                        className="album" 
                                        onClick={handleExpandAlbumArt} 
                                        onMouseEnter={() => setShowExpandIcon(true)}
                                        onMouseLeave={() => setShowExpandIcon(false)}
                                    >
                                        {
                                            currSong.art ?
                                            <img src={currSong.art} alt="" />
                                            :
                                            <div className="placeholder-art"></div>
                                        }
                                        {
                                            showExpandIcon &&
                                            <IconContext.Provider value={{ color: themeColors[theme.color], size: "16px", className: 'expand-icon' }}>
                                                <IoIosArrowDropupCircle />
                                            </IconContext.Provider>
                                        }
                                    </div>
                                }
                                <div className="details">
                                    <div className="name" title={currSong.name}>{currSong.name}</div>
                                    <div className="artist" title={currSong.artist}>{currSong.artist}</div>
                                </div>
                            </div>
                            <IconContext.Provider value={{ color: themeColors[theme.color], size: "15px", className: 'like' }}>
                                {
                                    currSong.liked ?
                                    <FaHeart onClick={() => handleActions('like')} />
                                    :
                                    <FaRegHeart onClick={() => handleActions('like')} />
                                }
                            </IconContext.Provider>
                        </React.Fragment>
                    }
                </div>
                <div className="controls">
                    <IconContext.Provider value={{ color: isShuffle ? themeColors[theme.color] : "#808080", size: "25px", className: 'shuffle' }}>
                        <IoIosShuffle onClick={() => handleActions('shuffle')} />
                    </IconContext.Provider>
                    <IconContext.Provider value={{ color: themeColors[theme.color], size: "35px", className: currSong.id ? 'previous' : 'previous disabled' }}>
                        <BiSkipPrevious onClick={() => handleActions('previous')} />
                    </IconContext.Provider>
                    <IconContext.Provider value={{ color: themeColors[theme.color], size: "35px", className: 'play-pause' }}>
                        {
                            isPlaying ?
                            <MdPauseCircle onClick={handlePause} />
                            :
                            <MdPlayCircle onClick={handlePlay} />
                        }
                    </IconContext.Provider>
                    <IconContext.Provider value={{ color: themeColors[theme.color], size: "35px", className: currSong.id ? 'next' : 'next disabled' }}>
                        <BiSkipNext onClick={() => handleActions('next')} />
                    </IconContext.Provider>
                    <IconContext.Provider value={{ color: isRepeat === 'off' ? "#808080" : themeColors[theme.color], size: "18px", className: 'repeat' }}>
                        {
                            (isRepeat === 'off' || isRepeat === 'all') &&
                            <RiRepeat2Fill onClick={() => handleActions('repeat')} />
                        }
                        {
                            isRepeat === 'one' &&
                            <RiRepeatOneFill onClick={() => handleActions('repeat')} />
                        }
                    </IconContext.Provider>
                </div>
                <div className={"slider" + (!currSong.id ? ' disabled' : '')}>
                    <div className="curr-duration">{currSong.id ? getReadableTime(currDuration) : '--:--'}</div>
                    <input 
                        style={{ "--range-theme": themeColors[theme.color] }}
                        className="range"
                        type="range" 
                        value={currDuration} 
                        min={0} 
                        max={currSong?.durationInSec} 
                        onChange={(e) => handleSlider(e.target.value)} 
                    />
                    <div className="total-duration">{currSong.duration || '--:--'}</div>
                </div>
                <div className="volume">
                    <IconContext.Provider value={{ color: themeColors[theme.color], size: "25px" }}>
                        {
                            currVolume === 0 &&
                            <IoIosVolumeOff />
                        }
                        {
                            (currVolume > 0 && currVolume < 51) &&
                            <IoIosVolumeLow />
                        }
                        {
                            currVolume >= 51 &&
                            <IoIosVolumeHigh />
                        }
                    </IconContext.Provider>
                    <input 
                        style={{ "--range-theme": themeColors[theme.color] }}
                        className="range" 
                        type="range" 
                        value={currVolume} 
                        min={0} 
                        max={100} 
                        onChange={(e) => setCurrVolume(parseInt(e.target.value))} 
                    />
                </div>
            </div>
        </div>
    );
}
export default connect((store) => ({
	theme: store.theme,
    playlistsList: store.playlistsList,
    playlistDetails: store.playlistDetails,
}))(Playlists);
