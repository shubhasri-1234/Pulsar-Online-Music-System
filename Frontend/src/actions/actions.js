// utils
import { lS } from "../utils"

// store
import { store } from "../redux/store"

// actions
import { ActionTypes } from "./_types"

export const changeTheme = () => {
    const theme = lS.get('theme');
    if (theme) {
        let color = 'yellow';
        switch (theme) {
            case 'yellow':
                color = 'red';
                break;
            case 'red':
                color = 'blue';
                break;
            case 'blue':
                color = 'green';
                break;
            case 'green':
                color = 'yellow';
                break;
            default:
                break;
        }
        lS.set('theme', color);
        store.dispatch({
            type: ActionTypes.CHANGE_THEME,
            payload: {
                color: color
            }
        });
    } else {
        lS.set('theme', 'red');
        store.dispatch({
            type: ActionTypes.CHANGE_THEME,
            payload: {
                color: 'red'
            }
        });
    }
}
