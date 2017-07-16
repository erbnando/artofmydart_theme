import axios from 'axios';
export const FETCH_ODD_POSTS = 'FETCH_ODD_POSTS';
export const FETCH_EVEN_POSTS = 'FETCH_EVEN_POSTS';
export const FETCH_FEAT_BOOK = 'FETCH_FEAT_BOOK';
export const FETCH_PAGE = 'FETCH_PAGE';
export const FETCH_BOOK = 'FETCH_BOOK';
export const FETCH_MENU = 'FETCH_MENU';

const WP_API_ENDPOINT = `${RT_API.root}wp/v2`;
const PRETTYPERMALINK_ENDPOINT = `${RT_API.root}react-theme/v1/prettyPermalink/`;
const MENU_ENDPOINT = `${RT_API.root}react-theme/v1/menu-locations/`;

export function fetchOddPosts(pageNum = 1, post_type = 'books', type = 'home') {
	return function (dispatch) {
		if (type == 'home') {
			//console.log('home');
			pageNum = 1;
			axios({
				method: 'get',
				url: `${WP_API_ENDPOINT}/frontpage`,
			})
			.then(response => {
				//console.log(`${WP_API_ENDPOINT}/${post_type}?_embed&page=${pageNum}&per_page=4&exclude=${response.data.acf.current_book}`);
				return axios({
					method: 'get',
					url: `${WP_API_ENDPOINT}/${post_type}?_embed&page=${pageNum}&per_page=4&exclude=${response.data.acf.current_book}&orderby=date`
				});
			})
			.then(response => {
				//console.log('\nmposts response:');
				//console.log(response);
				//console.log('odd', `${WP_API_ENDPOINT}/${post_type}?_embed&page=${pageNum}&per_page=4`);
				dispatch({
					type: FETCH_ODD_POSTS,
					//payload: response.data
					payload: {items: response.data, headers: response.headers}
				});
			});
		} else {
			//console.log('index');
			pageNum = parseInt(pageNum)*2 - 1;
			axios.get(`${WP_API_ENDPOINT}/${post_type}?_embed&page=${pageNum}&per_page=4`)
				.then(response => {
					//console.log('\nmposts response:');
					//console.log(response);
					//console.log('odd', `${WP_API_ENDPOINT}/${post_type}?_embed&page=${pageNum}&per_page=4`);
					dispatch({
						type: FETCH_ODD_POSTS,
						//payload: response.data
						payload: {items: response.data, headers: response.headers}
					});
				});
		}
	}
}

export function fetchEvenPosts(pageNum = 1, post_type = 'books') {
	return function (dispatch) {
		pageNum = parseInt(pageNum)*2;
		//console.log('page even:', pageNum);
		axios.get(`${WP_API_ENDPOINT}/${post_type}?_embed&page=${pageNum}&per_page=4`)
			.then(response => {
				//console.log('\nmposts response:');
				//console.log(response);
				//console.log('even', `${WP_API_ENDPOINT}/${post_type}?_embed&page=${pageNum}&per_page=4`);
				dispatch({
					type: FETCH_EVEN_POSTS,
					//payload: response.data
					payload: {items: response.data, headers: response.headers}
				});
			});
	}
}

export function fetchFeatBook() {
	return function (dispatch) {
		axios({
			method: 'get',
			url: `${WP_API_ENDPOINT}/frontpage`,
			//timeout: 1000,
		})
		.then(response => {
			//console.log(`${WP_API_ENDPOINT}/books/` + response.data.acf.current_book.ID);
			//console.log(response);
			return axios({
				method: 'get',
				url: `${WP_API_ENDPOINT}/books/` + response.data.acf.current_book
			});
		})
		.then(response => {
			//console.log(response);
			dispatch({
				type: FETCH_FEAT_BOOK,
				payload: {featured: response.data}
			});
		});
	}
}

export function fetchPage(slug) {
	return function (dispatch) {
		axios.get(`${WP_API_ENDPOINT}/pages?slug=${slug}`)
			.then(response => {
				//console.log('\nmposts response:');
				//console.log(response.data[0]);
				//console.log('odd', `${WP_API_ENDPOINT}/${post_type}?_embed&page=${pageNum}&per_page=4`);
				dispatch({
					type: FETCH_PAGE,
					payload: {page: response.data[0]}
				});
			});
	}
}

export function fetchBook(slug) {
	return function (dispatch) {
		axios.get(`${WP_API_ENDPOINT}/books?slug=${slug}`)
			.then(response => {
				//console.log('\nmposts response:');
				//console.log(response.data[0]);
				//console.log('odd', `${WP_API_ENDPOINT}/${post_type}?_embed&page=${pageNum}&per_page=4`);
				dispatch({
					type: FETCH_BOOK,
					payload: {book: response.data[0]}
				});
			});
	}
}

/*
export function fetchPost(prettyPermalink) {
	return function (dispatch) {
		axios.get(`${PRETTYPERMALINK_ENDPOINT}${prettyPermalink}`)
			.then(response => {
				dispatch({
					type: FETCH_POST,
					payload: [response.data]
				});
				//console.log(`${PRETTYPERMALINK_ENDPOINT}${prettyPermalink}`);
			});
	}
}
*/

export function fetchMenu(menu) {
	return function (dispatch) {
		axios.get(`${MENU_ENDPOINT}${menu}`)
			.then(response => {
				//console.log('\nmenu response:');
				//console.log(response.data);
				dispatch({
					type: FETCH_MENU,
					payload: {items: response.data, name: menu}
				});
			});
	}
}
