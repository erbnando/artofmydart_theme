import {FETCH_BOOK} from '../actions';

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_BOOK:
	    	//console.log('feat book reducer');
            return action.payload;
    }
    return state;
}