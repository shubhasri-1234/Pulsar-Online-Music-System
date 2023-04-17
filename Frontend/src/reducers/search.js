// actions
import { ActionTypes } from '../actions/_types';

const INITIAL_STATE = {
    loading: false,
    error: {},
    searchInput: '',
    results: {},
};

export const search = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ActionTypes.SEARCH_REQUEST:
			return {
				...state,
                error: {},
				loading: true
			}
		case ActionTypes.SEARCH_SUCCESS:
			return {
				...state,
				...action.payload,
				loading: false
			}
		case ActionTypes.SEARCH_FAILURE:
			return {
				...state,
				error: action.payload,
				loading: false
			}
		case ActionTypes.UPDATE_SEARCH_STATE:
			return {
				...state,
				...action.payload,
			}
		default:
			return state;
	}
}
