import {FETCH_EVEN_POSTS} from '../actions';

export default function (state = {headers: [], items: []}, action) {
    switch (action.type) {
        case FETCH_EVEN_POSTS:
            return action.payload;
    }
    //console.log(state);
    return state;
}
