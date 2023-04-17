// actions
import { ActionTypes } from '../actions/_types';

const INITIAL_STATE = {
    loading: false,
    error: {},
    username: '',
};

export const signup = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ActionTypes.USER_SIGNUP_REQUEST:
			return {
				...state,
                error: {},
				loading: true
			}
		case ActionTypes.USER_SIGNUP_SUCCESS:
			return {
				...state,
				...action.payload,
				loading: false
			}
		case ActionTypes.USER_SIGNUP_FAILURE:
			return {
				...state,
				error: action.payload,
				loading: false
			}
        case ActionTypes.UPDATE_SIGNUP_STATE:
            return {
                ...state,
                ...action.payload,
            }
		default:
			return state;
	}
}
