import {combineReducers} from 'redux';

import menu from './menu_reducer';
import feat_book from './feat_book_reducer';
import odd_posts from './odd_posts_reducer';
import even_posts from './even_posts_reducer';
import page from './page_reducer';

export default combineReducers({
    menu,
    feat_book,
    odd_posts,
    even_posts,
    page
});