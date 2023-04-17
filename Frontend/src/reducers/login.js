// utils
import { isLoggedin, lS } from '../utils';

// actions
import { ActionTypes } from '../actions/_types';

const INITIAL_STATE = {
    loading: false,
    error: {},
    success: isLoggedin() ? true : false,
    user: {
        id: isLoggedin() ? lS.get('auth').id : '',
        username: isLoggedin() ? lS.get('auth').username : '',
        email: isLoggedin() ? lS.get('auth').email : '',
        fullname: isLoggedin() ? lS.get('auth').fullname : '',
        token: isLoggedin() ? lS.get('auth').token : '',
        expiry: isLoggedin() ? lS.get('auth').expiry : '',
    },
};

export const login = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ActionTypes.USER_LOGIN_REQUEST:
			return {
				...state,
                error: {},
				loading: true
			}
		case ActionTypes.USER_LOGIN_SUCCESS:
			return {
				...state,
				...action.payload,
				loading: false
			}
		case ActionTypes.USER_LOGIN_FAILURE:
			return {
				...state,
				error: action.payload,
				loading: false
			}
		case ActionTypes.UPDATE_LOGIN_STATE:
			return {
				...state,
				...action.payload,
			}
		case ActionTypes.USER_SIGNOUT:
			return {
				loading: false,
				error: {},
				success: false,
				user: {
					id: '',
					username: '',
					email: '',
					fullname: '',
					token: '',
					expiry: '',
				},
			};
		default:
			return state;
	}
}
