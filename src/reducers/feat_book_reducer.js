import {FETCH_FEAT_BOOK} from '../actions';

export default function (state = {featured: []}, action) {
    switch (action.type) {
        case FETCH_FEAT_BOOK:
	    	//console.log('feat book reducer');
            return action.payload;
    }
    return state;
}