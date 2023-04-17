// actions
import { ActionTypes } from '../actions/_types';

const PLAYLISTS_LIST_INITIAL_STATE = {
    listLoading: false,
    listError: {},
    listData: {
        title: 'Playlists',
        default: [],
        content: [],
    },
};
export const playlistsList = (state = PLAYLISTS_LIST_INITIAL_STATE, action) => {
	switch (action.type) {
		case ActionTypes.PLAYLISTS_LIST_REQUEST:
			return {
				...state,
                listError: {},
				listLoading: true
			}
		case ActionTypes.PLAYLISTS_LIST_SUCCESS:
			return {
				...state,
				...action.payload,
				listLoading: false
			}
		case ActionTypes.PLAYLISTS_LIST_FAILURE:
			return {
				...state,
				listError: action.payload,
				listLoading: false
			}
		case ActionTypes.UPDATE_PLAYLISTS_LIST_STATE:
			return {
				...state,
				...action.payload,
			}
		default:
			return state;
	}
}

const PLAYLIST_DETAILS_INITIAL_STATE = {
    loading: false,
    error: {},
    data: {
        id: null,
        name: '',
        songs: []
    },
};
export const playlistDetails = (state = PLAYLIST_DETAILS_INITIAL_STATE, action) => {
	switch (action.type) {
		case ActionTypes.PLAYLIST_DETAILS_REQUEST:
			return {
				...state,
                error: {},
				loading: true
			}
		case ActionTypes.PLAYLIST_DETAILS_SUCCESS:
			return {
				...state,
				...action.payload,
				loading: false
			}
		case ActionTypes.PLAYLIST_DETAILS_FAILURE:
			return {
				...state,
				error: action.payload,
				loading: false
			}
		case ActionTypes.UPDATE_PLAYLIST_DETAILS_STATE:
			return {
				...state,
				...action.payload,
			}
		default:
			return state;
	}
}
