import {FETCH_ODD_POSTS} from '../actions';

export default function (state = {headers: [], items: []}, action) {
    switch (action.type) {
        case FETCH_ODD_POSTS:
            return action.payload;
    }
    return state;
}
