// actions
import { ActionTypes } from "./_types"

// store
import { store } from "../redux/store"

// history
import history from "../history"

export const handleSignup = async (payload) => {
    store.dispatch({
        type: ActionTypes.USER_SIGNUP_REQUEST,
    });
    try {
        const url = "http://127.0.0.1:5000/signup";
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
                type: ActionTypes.USER_SIGNUP_SUCCESS,
                payload: {
                    username: payload.username
                }
            });
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
            // redirect to login
            setTimeout(() => {
                history.push('/login');
            }, 500);
        } else {
            store.dispatch({
                type: ActionTypes.USER_SIGNUP_FAILURE,
                payload: resp.error
            });
        }
    } catch (error) {
        console.log(error)
        store.dispatch({
            type: ActionTypes.USER_SIGNUP_FAILURE,
            payload: error
        });
    }
}
