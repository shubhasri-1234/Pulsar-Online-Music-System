// actions
import { ActionTypes } from "./_types"

// store
import { store } from "../redux/store"

// config
import { dummyPlaylists, dummyPlaylist } from "../dummy";

export const fetchPlaylists = async () => {
    store.dispatch({
        type: ActionTypes.PLAYLISTS_LIST_REQUEST,
    });
    // get logged in user id from login reducer
    const userId =  store.getState().login.user.id;
    try {
        // update store with dummy data for testing purpose
        // store.dispatch({
        //     type: ActionTypes.PLAYLISTS_LIST_SUCCESS,
        //     payload: {
        //         listData: dummyPlaylists
        //     }
        // });

        // api call
        const url = "http://127.0.0.1:5000/playlists";
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                userId,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const resp = await res.json();
        if (resp.success) {
            // update store
            store.dispatch({
                type: ActionTypes.PLAYLISTS_LIST_SUCCESS,
                payload: {
                    listData: resp.data
                }
            });
        } else {
            store.dispatch({
                type: ActionTypes.PLAYLISTS_LIST_FAILURE,
                payload: resp.error
            });
        }
    } catch (error) {
        console.log(error)
        store.dispatch({
            type: ActionTypes.PLAYLISTS_LIST_FAILURE,
            payload: error
        });
    }
}

export const fetchPlaylist = async (playlistId) => {
    store.dispatch({
        type: ActionTypes.PLAYLIST_DETAILS_REQUEST,
    });
    // get logged in user id from login reducer
    const userId =  store.getState().login.user.id;
    try {
        // update store with dummy data for testing purpose
        // store.dispatch({
        //     type: ActionTypes.PLAYLIST_DETAILS_SUCCESS,
        //     payload: {
        //         data: dummyPlaylist
        //     }
        // });

        // api call
        const url = "http://127.0.0.1:5000/playlist";
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                userId,
                playlistId,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const resp = await res.json();
        if (resp.success) {
            // update store
            store.dispatch({
                type: ActionTypes.PLAYLIST_DETAILS_SUCCESS,
                payload: {
                    data: resp.data
                }
            });
        } else {
            store.dispatch({
                type: ActionTypes.PLAYLIST_DETAILS_FAILURE,
                payload: resp.error
            });
        }
    } catch (error) {
        console.log(error)
        store.dispatch({
            type: ActionTypes.PLAYLIST_DETAILS_FAILURE,
            payload: error
        });
    }
}

