import {FETCH_PAGE} from '../actions';

export default function (state = {featured: []}, action) {
    switch (action.type) {
        case FETCH_PAGE:
	    	//console.log('feat book reducer');
            return action.payload;
    }
    return state;
}