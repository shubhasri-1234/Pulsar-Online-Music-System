// utils
import { lS } from "../utils"

// actions
import { ActionTypes } from "./_types"

// store
import { store } from "../redux/store"

// history
import history from "../history"

export const handleLogin = async (payload) => {
    store.dispatch({
        type: ActionTypes.USER_LOGIN_REQUEST,
    });
    try {
        const url = "http://127.0.0.1:5000/login";
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const resp = await res.json();
        if (resp.success) {
            // update store
            store.dispatch({
                type: ActionTypes.USER_LOGIN_SUCCESS,
                payload: {
                    success: true,
                    loginDetail: resp.data,
                }
            });
            // set user logged in data in local storage
            lS.set('auth', resp.data);
            // notification
            store.dispatch({
                type: ActionTypes.SHOW_NOTIFICATION,
                payload: {
                    show: true,
                    message: resp.message,
                    timeout: 3000,
                    color: 'success',
                }
            });
            // redirect to user dashboard (home)
            setTimeout(() => {
                history.push('/');
            }, 500);
        } else {
            store.dispatch({
                type: ActionTypes.USER_LOGIN_FAILURE,
                payload: resp.error
            });
        }
    } catch (error) {
        console.log(error)
        store.dispatch({
            type: ActionTypes.USER_LOGIN_FAILURE,
            payload: error
        });
    }
}

export const handleSignout = () => {
    // reset local storage
    lS.remove('auth');
    // reset store
	store.dispatch({
		type: ActionTypes.USER_SIGNOUT,
	});
    // notification
    store.dispatch({
        type: ActionTypes.SHOW_NOTIFICATION,
        payload: {
            show: true,
            message: 'Sign out successful',
            timeout: 3000,
            color: 'success',
        }
    });
    // redirect to login
    history.push('/login');
}
