import React, { useState, useEffect, useCallback } from 'react';

// components
import Button from "../components/_common/Button";

// third party
import { connect } from "react-redux";

// utils
import { scroll } from "../utils";

// icons
import { IconContext } from "react-icons";
import { BsFillChatTextFill, BsPersonPlusFill, BsPlusLg, BsFillPlayFill } from "react-icons/bs";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { HiCheck } from "react-icons/hi";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

// config
import { initSearchFilters, themeColors } from "../config";
import { dummySearchResults } from "../dummy";

// constatnts

const Search = ({ search, theme }) => {
    const [searchResults, setSearchResults] = useState({});
    const [filters, setFilters] = useState(initSearchFilters);
    const {loading, searchInput, error, results} = search;
    const onlyOneFilter = Object.keys(filters).filter((filter) => (filters[filter] === true) && (filter !== 'all')).length === 1 ? true : false;

    const filterResults = useCallback(() => {
        if (searchInput) {
            setSearchResults({
                profiles: dummySearchResults.profiles.filter((profile) => profile.name.toLowerCase().includes(searchInput.toLowerCase())),
                groups: dummySearchResults.groups.filter((group) => group.name.toLowerCase().includes(searchInput.toLowerCase())),
                songs: dummySearchResults.songs.filter((song) => song.name.toLowerCase().includes(searchInput.toLowerCase())),
                playlists: dummySearchResults.playlists.filter((playlist) => playlist.name.toLowerCase().includes(searchInput.toLowerCase())),
                artists: dummySearchResults.artists.filter((artist) => artist.name.toLowerCase().includes(searchInput.toLowerCase())),
            });
        } else {
            setSearchResults({});
        }
    }, [searchInput]);

    const handleAction = (type, id, action=false) => {
        let updatedSearchResults = { ...searchResults };
        switch (type) {
            case 'profile':
                let updatedProfiles = updatedSearchResults.profiles.map((profile) => {
                    if (profile.id === id) {
                        profile.isFriend = action
                    }
                    return profile;
                });
                updatedSearchResults.profiles = updatedProfiles;
                break;
            case 'group':
                let updatedGroups = updatedSearchResults.groups.map((group) => {
                    if (group.id === id) {
                        group.joined = action
                    }
                    return group;
                });
                updatedSearchResults.groups = updatedGroups;
                break;
            case 'song':
                let updatedSongs = updatedSearchResults.songs.map((song) => {
                    if (song.id === id) {
                        song.liked = action
                    }
                    return song;
                });
                updatedSearchResults.songs = updatedSongs;
                break;
            case 'playlist':
                let updatedPlaylists = updatedSearchResults.playlists.map((playlist) => {
                    if (playlist.id === id) {
                        playlist.following = action
                    }
                    return playlist;
                });
                updatedSearchResults.playlists = updatedPlaylists;
                break;
            case 'artist':
                let updatedArtists = updatedSearchResults.artists.map((artist) => {
                    if (artist.id === id) {
                        artist.following = action
                    }
                    return artist;
                });
                updatedSearchResults.artists = updatedArtists;
                break;
            default:
                break;
        }
        setSearchResults(updatedSearchResults);
    }

    useEffect(() => {
        filterResults();
    }, [searchInput]);

    const handleFilter = (type, value) => {
        if (type === 'all') {
            setFilters(initSearchFilters);
        } else {
            setFilters({
                ...filters,
                all: false,
                [type]: value
            });
        }
    }

    useEffect(() => {
        if (Object.values(filters).find((val) => val === true) === undefined) {
            setFilters(initSearchFilters);
        } else if (Object.keys(filters).filter((filter) => filters[filter] === true).length === 5) {
            setTimeout(() => {
                setFilters(initSearchFilters);
            }, 200);
        }
    }, [filters]);

    const handleScroll = (direction=false, type='profiles') => {
		const content = document.querySelector(`.${type} .content`);
		if (direction) {
			// scroll to the right
			scroll({ top: 0, left: content?.scrollLeft + 1000 }, content);
		}
		else {
			// scroll to the left
			scroll({ top: 0, left: content?.scrollLeft - 1000 }, content);
		}
	}

    return (
        <div className="search-container">
            <div className="filters-container">
                <div className="title">Search</div>
                <div className="filters">
                    <div className={"filter" + (filters.all ? ' selected' : '')} onClick={() => handleFilter('all', !filters.all)}>All</div>
                    <div className={"filter" + (filters.users ? ' selected' : '')} onClick={() => handleFilter('users', !filters.users)}>Users</div>
                    <div className={"filter" + (filters.groups ? ' selected' : '')} onClick={() => handleFilter('groups', !filters.groups)}>Groups</div>
                    <div className={"filter" + (filters.songs ? ' selected' : '')} onClick={() => handleFilter('songs', !filters.songs)}>Songs</div>
                    <div className={"filter" + (filters.playlists ? ' selected' : '')} onClick={() => handleFilter('playlists', !filters.playlists)}>Playlists</div>
                    <div className={"filter" + (filters.artists ? ' selected' : '')} onClick={() => handleFilter('artists', !filters.artists)}>Artists</div>
                </div>
            </div>
            <div className="main-view">
                {
                    searchInput &&
                    <div className="search-results-container">
                        {
                            (filters.all || filters.users) &&
                            <div className="users results">
                                <Header 
                                    theme={theme}
                                    heading="Users" 
                                    count={searchResults?.profiles?.length} 
                                    handleScroll={handleScroll} 
                                    expand={onlyOneFilter} 
                                />
                                <div className={"content" + (onlyOneFilter ? " expand" : "")}>
                                    {
                                        searchResults?.profiles?.map((profile, i) => (
                                            <div theme={theme.color} className="profile card-container" key={i}>
                                                <div className="icon">
                                                    {
                                                        profile.pic ?
                                                        <img src={profile.pic} alt="" />
                                                        :
                                                        <div className="placeholder-container circle"></div>
                                                    }
                                                </div>
                                                <div className="info">
                                                    <div className="name">{profile.name}</div>
                                                    {
                                                        profile.isFriend ? 
                                                        <Button>
                                                            <IconContext.Provider value={{ color: "#1a1a1a", size: "13px", className: 'chat-icon' }}>
                                                                <BsFillChatTextFill />
                                                            </IconContext.Provider>
                                                            <div>Chat</div>
                                                        </Button>
                                                        :
                                                        <Button type="secondary" handleOnClick={() => handleAction('profile', profile.id, true)}>
                                                            <IconContext.Provider value={{ color: themeColors[theme.color], size: "16px", className: 'add-icon' }}>
                                                                <BsPersonPlusFill />
                                                            </IconContext.Provider>
                                                            <div>Add as Friend</div>
                                                        </Button>
                                                    }
                                                </div>
                                            </div>
                                        ))
                                    }
                                    {
                                        searchResults?.profiles?.length === 0 &&
                                        <div className="no-results-placeholder">
                                            No Users found
                                        </div>
                                    }
                                </div>
                            </div>
                        }
                        {
                            (filters.all || filters.groups) &&
                            <div className="groups results">
                                <Header 
                                    theme={theme}
                                    heading="Groups" 
                                    count={searchResults?.groups?.length} 
                                    handleScroll={handleScroll} 
                                    expand={onlyOneFilter} 
                                />
                                <div className={"content" + (onlyOneFilter ? " expand" : "")}>
                                    {
                                        searchResults?.groups?.map((group, i) => (
                                            <div theme={theme.color} className="group card-container" key={i}>
                                                <div className="icon">
                                                    {
                                                        group.img ?
                                                        <img src={group.img} alt="" />
                                                        :
                                                        <div className="placeholder-container"></div>
                                                    }
                                                </div>
                                                <div className="info">
                                                    <div className="name">{group.name}</div>
                                                    <div className="desc">{group.members} members</div>
                                                    {
                                                        group.joined ? 
                                                        <Button>
                                                            <IconContext.Provider value={{ color: "#1a1a1a", size: "13px", className: 'chat-icon' }}>
                                                                <BsFillChatTextFill />
                                                            </IconContext.Provider>
                                                            <div>Chat</div>
                                                        </Button>
                                                        :
                                                        <Button type="secondary" handleOnClick={() => handleAction('group', group.id, true)}>
                                                            <IconContext.Provider value={{ color: themeColors[theme.color], size: "11px", className: 'add-icon' }}>
                                                                <BsPlusLg />
                                                            </IconContext.Provider>
                                                            <div>Join</div>
                                                        </Button>
                                                    }
                                                </div>
                                            </div>
                                        ))
                                    }
                                    {
                                        searchResults?.groups?.length === 0 &&
                                        <div className="no-results-placeholder">
                                            No Groups found
                                        </div>
                                    }
                                </div>
                            </div>
                        }
                        {
                            (filters.all || filters.songs) &&
                            <div className="songs results">
                                <Header 
                                    theme={theme}
                                    heading="Songs" 
                                    count={searchResults?.songs?.length} 
                                    handleScroll={handleScroll} 
                                    expand={onlyOneFilter} 
                                />
                                {
                                    searchResults?.songs?.length === 0 &&
                                    <div className="no-results-placeholder songs">
                                        No Songs found
                                    </div>
                                }
                                {
                                    searchResults?.songs?.length > 0 &&
                                    <div className={"table-container" + (onlyOneFilter ? " expand" : "")}>
                                        <div className="header-container">
                                            <div className="num">#</div>
                                            <div className="name">Name</div>
                                            <div className="album">Album</div>
                                            <div className="duration">Duration</div>
                                            <div className="liked">Favourite</div>
                                        </div>
                                        {
                                            searchResults?.songs?.map((song, i) => (
                                                <div theme={theme.color} className="song-container" key={i}>
                                                    <div className="num">{i+1}</div>
                                                    <div className="name">
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
                                                    <div className="duration">{song.duration}</div>
                                                    <div className="liked">
                                                        <IconContext.Provider value={{ color: themeColors[theme.color], size: "15px", className: 'like' }}>
                                                            {
                                                                song.liked ?
                                                                <FaHeart onClick={() => handleAction('song', song.id, false)} />
                                                                :
                                                                <FaRegHeart onClick={() => handleAction('song', song.id, true)} />
                                                            }
                                                        </IconContext.Provider>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                }
                            </div>
                        }
                        {
                            (filters.all || filters.playlists) &&
                            <div className="playlists results">
                                <Header 
                                    theme={theme}
                                    heading="Playlists" 
                                    count={searchResults?.playlists?.length} 
                                    handleScroll={handleScroll} 
                                    expand={onlyOneFilter} 
                                />
                                <div className={"content" + (onlyOneFilter ? " expand" : "")}>
                                    {
                                        searchResults?.playlists?.map((playlist, i) => (
                                            <div theme={theme.color} className="playlist card-container" key={i}>
                                                <div className="icon">
                                                    {
                                                        playlist.img ?
                                                        <img src={playlist.img} alt="" />
                                                        :
                                                        <div className="placeholder-container"></div>
                                                    }
                                                </div>
                                                <div className="info">
                                                    <div className="name">{playlist.name}</div>
                                                    {
                                                        playlist.following ? 
                                                        <Button>
                                                            <IconContext.Provider value={{ color: "#1a1a1a", size: "18px", className: 'chat-icon' }}>
                                                                <BsFillPlayFill />
                                                            </IconContext.Provider>
                                                            <div>Play</div>
                                                        </Button>
                                                        :
                                                        <Button type="secondary" handleOnClick={() => handleAction('playlist', playlist.id, true)}>
                                                            <IconContext.Provider value={{ color: themeColors[theme.color], size: "11px", className: 'add-icon' }}>
                                                                <BsPlusLg />
                                                            </IconContext.Provider>
                                                            <div>Follow</div>
                                                        </Button>
                                                    }
                                                </div>
                                            </div>
                                        ))
                                    }
                                    {
                                        searchResults?.playlists?.length === 0 &&
                                        <div className="no-results-placeholder">
                                            No Playlists found
                                        </div>
                                    }
                                </div>
                            </div>
                        }
                        {
                            (filters.all || filters.artists) &&
                            <div className="artists results">
                                <Header 
                                    theme={theme}
                                    heading="Artists" 
                                    count={searchResults?.artists?.length} 
                                    handleScroll={handleScroll} 
                                    expand={onlyOneFilter} 
                                />
                                <div className={"content" + (onlyOneFilter ? " expand" : "")}>
                                    {
                                        searchResults?.artists?.map((artist, i) => (
                                            <div theme={theme.color} className="artist card-container" key={i}>
                                                <div className="icon">
                                                    {
                                                        artist.pic ?
                                                        <img src={artist.pic} alt="" />
                                                        :
                                                        <div className="placeholder-container circle"></div>
                                                    }
                                                </div>
                                                <div className="info">
                                                    <div className="name">{artist.name}</div>
                                                    {
                                                        artist.following ? 
                                                        <Button>
                                                            <IconContext.Provider value={{ color: "#1a1a1a", size: "18px", className: 'chat-icon' }}>
                                                                <HiCheck />
                                                            </IconContext.Provider>
                                                            <div>Following</div>
                                                        </Button>
                                                        :
                                                        <Button type="secondary" handleOnClick={() => handleAction('artist', artist.id, true)}>
                                                            <IconContext.Provider value={{ color: themeColors[theme.color], size: "11px", className: 'add-icon' }}>
                                                                <BsPlusLg />
                                                            </IconContext.Provider>
                                                            <div>Follow</div>
                                                        </Button>
                                                    }
                                                </div>
                                            </div>
                                        ))
                                    }
                                    {
                                        searchResults?.artists?.length === 0 &&
                                        <div className="no-results-placeholder">
                                            No Artists found
                                        </div>
                                    }
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    );
}
export default connect((store) => ({
	search: store.search,
    theme: store.theme,
}))(Search);

const Header = ({ heading, count, handleScroll, expand, theme }) => (
    <div className="header-container">
        <div className="header-text">{heading}</div>
        <div className="header-right">
            {
                count !== undefined &&
                <div className="count">{count} {count === 1 ? heading.slice(0, -1) : heading} found</div>
            }
            {
                heading !== 'Songs' && !expand &&
                <div className="icons">
                    <IconContext.Provider value={{ color: themeColors[theme.color], size: "15px", className: 'left-icon' }}>
                        <BiLeftArrow onClick={() => handleScroll(false, heading.toLowerCase())} />
                    </IconContext.Provider>
                    <IconContext.Provider value={{ color: themeColors[theme.color], size: "15px", className: 'right-icon' }}>
                        <BiRightArrow onClick={() => handleScroll(true, heading.toLowerCase())} />
                    </IconContext.Provider>
                </div>
            }
        </div>
    </div>
);
