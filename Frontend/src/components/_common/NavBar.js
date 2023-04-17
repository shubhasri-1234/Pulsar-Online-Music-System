import React, { useState, useCallback, useRef, useEffect, useImperativeHandle } from 'react';

// components
import InputField from "./InputField";

// third party
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { debounce } from "lodash";

// store
import { store } from "../../redux/store";

// icons
import { IconContext } from "react-icons";
import { IoIosSearch } from "react-icons/io";

// actions
import { ActionTypes } from "../../actions/_types";
import { handleSignout } from "../../actions/login";

// config
import { themeColors } from "../../config";

const NavBar = ({
    selectedTab,
	switchTab,
	tabs,
	renderTab,
	valueField='value',
	labelField='label',
	classes='',
    showSearch=false,
    theme,
    connectedRef,
}) => {
    const [searchHover, setSearchHover] = useState(false);
    const [currSearchVal, setCurrSearchVal] = useState('');
    const [applSearchVal, setApplSearchVal] = useState('');
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const inputRef = useRef(null);
    const navbarRef = useRef();

    useEffect(() => {
        if (selectedTab === 'search') {
            setTimeout(() => {
                inputRef?.current?.focus();
            }, 100);
        } else {
            setCurrSearchVal('');
            setApplSearchVal('');
            store.dispatch({
                type: ActionTypes.UPDATE_SEARCH_STATE,
                payload: {
                    searchInput: ''
                }
            });
        }
    }, [selectedTab]);

    const closeDropdown = useCallback(() => {
        if (isDropdownOpen) {
            setDropdownOpen(false);
        }
    }, [isDropdownOpen]);

    useImperativeHandle(connectedRef, () => ({
        closeDropdown,
    }), [closeDropdown]);

    const applySearch = useCallback(
		debounce((value) => {
			setApplSearchVal(value);
            store.dispatch({
                type: ActionTypes.UPDATE_SEARCH_STATE,
                payload: {
                    searchInput: value
                }
            });
		}, 500),
		[]
	);

	const handleSearch = useCallback((value) => {
		setCurrSearchVal(value);
		applySearch(value);
	}, [applySearch]);

    const horizontalScroll = useCallback((e) => {
		const container = navbarRef.current;
		if (container) {
			container.scrollTo({
				top: 0,
				left: container.scrollLeft + e.deltaY,
				behaviour: "smooth"
			});
		}
	}, []);

    return (
        <div className={"navbar-container " + (classes)} ref={navbarRef} onWheel={horizontalScroll}>
            {
                tabs.map((tab, i) => (
                    tab[valueField] === 'signout' ?
                    <div 
                        theme={theme.color}
                        className="tab"
                        onClick={() => setDropdownOpen(!isDropdownOpen)}
                        key={i}
                    >
                        {
                            renderTab ?
                            renderTab(tab)
                            :
                            <div className="text">{tab[labelField]}</div>
                        }
                        {
                            isDropdownOpen &&
                            <div className="dropdown">
                                <div className="action">View Profile</div>
                                <div className="action" onClick={handleSignout}>Sign Out</div>
                            </div>
                        }
                    </div>
                    :
                    tab[valueField] === 'search' ?
                    (
                        showSearch && (tab[valueField] === selectedTab) ? 
                        <a role="button" key={i}>
                            <div className="input-search-container selected">
                                <IconContext.Provider value={{ color: searchHover || (tab[valueField] === selectedTab) ? themeColors[theme.color] : "#ffffff", size: "22px", className: 'search-icon' }}>
                                    <IoIosSearch />
                                </IconContext.Provider>
                                <InputField 
                                    inputRef={inputRef}
                                    value={currSearchVal}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    placeholder="Search users, groups, songs, playlists..."
                                />
                            </div>
                        </a>
                        :
                        showSearch &&
                        <Link key={i} to={tab.path}>
                            <div 
                                className={"input-search-container" + (tab[valueField] === selectedTab ? " selected" : "")} 
                                onMouseEnter={() => setSearchHover(true)} 
                                onMouseLeave={() => setSearchHover(false)}
                                onClick={() => switchTab(tab)}
                            >
                                <IconContext.Provider value={{ color: searchHover || (tab[valueField] === selectedTab) ? themeColors[theme.color] : "#ffffff", size: "22px", className: 'search-icon' }}>
                                    <IoIosSearch />
                                </IconContext.Provider>
                            </div>
                        </Link>
                    )
                    :
                    <Link key={i} to={tab.path}>
                        <div 
                            theme={theme.color}
                            className={"tab" + (tab[valueField] === selectedTab ? " selected" : "")}
                            onClick={() => switchTab(tab)}
                        >
                            {
                                renderTab ?
                                renderTab(tab)
                                :
                                <div className="text">{tab[labelField]}</div>
                            }
                        </div>
                    </Link>
                ))
            }
        </div>
    );
}
export default connect((store) => ({
	theme: store.theme,
}))(NavBar);
