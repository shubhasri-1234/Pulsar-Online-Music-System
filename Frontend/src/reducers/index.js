// third party
import { combineReducers } from 'redux';

// utils
import { lS } from '../utils';

// action types
import { ActionTypes } from "../actions/_types";

// reducers
import { login } from "./login";
import { signup } from "./signup";
import { search } from "./search";
import { playlistsList, playlistDetails } from "./playlists";

const notification = (state = {
	show: false,
	message: '',
	timeout: 3000,
	color: 'secondary',
	error: null,
}, action) => {
	switch (action.type) {
		case ActionTypes.SHOW_NOTIFICATION:
			return {
				...state,
				show: true,
				...action.payload,
			};
		case ActionTypes.HIDE_NOTIFICATION:
			return {
				...state,
				show: false,
				...action.payload,
			};
		default:
			return state;
	}
};

export const theme = (state = {
	color: lS.get('theme') || 'yellow',
}, action) => {
	switch (action.type) {
		case ActionTypes.CHANGE_THEME:
			return {
				...state,
                ...action.payload,
			}
		default:
			return state;
	}
}

const appReducer = combineReducers({
	theme,
	notification,
	login,
	signup,
	search,
	playlistsList,
	playlistDetails,
});

const rootReducer = (state, action) => {
	if(action.type === 'USER_LOGOUT') {
		state = undefined;
	}
	return appReducer(state, action);
}
export default rootReducer;
