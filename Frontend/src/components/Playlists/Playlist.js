import React from 'react';

// icons
import { IconContext } from "react-icons";
import { GiSoundWaves } from "react-icons/gi"

// config
import { themeColors } from "../../config";

const Playlist = ({
    theme,
    currSong={},
    playlist={},
    handleSelect,
    isPlaying=false,
    handleAction,
}) => {
    return (
        <div className="playlist-container">
            <div className="header">
                <div className="icon"></div>
                <div className="info">
                    <div className="name">{playlist?.name}</div>
                    <div className="count">{playlist?.songs?.length} songs</div>
                </div>
            </div>
            <div className="table-container">
                <div className="header-container">
                    <div className="num">#</div>
                    <div className="name">Name</div>
                    <div className="album">Album</div>
                    <div className="year">Year</div>
                    <div className="duration">Duration</div>
                </div>
                {
                    playlist.songs.length > 0 && playlist.songs.map((song, i) => (
                        <div theme={theme.color} className={"song-container" + (song.id === currSong.id ? ' selected' : '')} key={i}>
                            {
                                (song.id === currSong.id) && isPlaying ?
                                <div className="num icon">
                                    <IconContext.Provider value={{ color: themeColors[theme.color], size: "35px", className: 'wave-icon' }}>
                                        <GiSoundWaves />
                                    </IconContext.Provider>
                                </div>
                                :
                                <div className="num">{i+1}</div>
                            }
                            <div className="name" onClick={() => handleSelect(song, i)}>
                                {
                                    song.art ?
                                    <img className="art" src={song.art} alt="" />
                                    :
                                    <div className="album"></div>
                                }
                                <div>
                                    <div className="title">{song.name}</div>
                                    <div className="artist">{song.artist}</div>
                                </div>
                            </div>
                            <div className="album">{song.album}</div>
                            <div className="year">{song.release}</div>
                            <div className="duration">{song.duration}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
export default Playlist;
