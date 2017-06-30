import axios from 'axios';
export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_ODD_POSTS = 'FETCH_ODD_POSTS';
export const FETCH_EVEN_POSTS = 'FETCH_EVEN_POSTS';
export const FETCH_FEAT_BOOK = 'FETCH_FEAT_BOOK';
export const FETCH_POST = 'FETCH_POST';
export const FETCH_MENU = 'FETCH_MENU';

const WP_API_ENDPOINT = `${RT_API.root}wp/v2`;
const PRETTYPERMALINK_ENDPOINT = `${RT_API.root}react-theme/v1/prettyPermalink/`;
const MENU_ENDPOINT = `${RT_API.root}react-theme/v1/menu-locations/`;

export function fetchOddPosts(pageNum = 1, post_type = 'books') {
	return function (dispatch) {
		pageNum = parseInt(pageNum) + (parseInt(pageNum) - 1);
		//console.log(pageNum);
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

export function fetchEvenPosts(pageNum = 2, post_type = 'books') {
	return function (dispatch) {
		pageNum = parseInt(pageNum) + (parseInt(pageNum) - 2);
		//console.log(pageNum);
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

export function fetchPosts(pageNum = 1, post_type = 'books') {
	return function (dispatch) {
		if (pageNum < 2 || pageNum == null) {
			axios.get(`${WP_API_ENDPOINT}/${post_type}?_embed&page=${pageNum}&per_page=4`)
				.then(response => {
					//console.log('\nmposts response:');
					//console.log(response);
					//console.log(`${WP_API_ENDPOINT}/${post_type}?_embed&page=${pageNum}`);
					dispatch({
						type: FETCH_POSTS,
						//payload: response.data
						payload: {items: response.data, headers: response.headers}
					});
				});
		} else {
			var offset = (((pageNum-1)*8)-4);
			axios.get(`${WP_API_ENDPOINT}/${post_type}?_embed&page=${pageNum}&per_page=8&offset=` + offset)
				.then(response => {
					//console.log('\nmposts response:');
					//console.log(response);
					//console.log(`${WP_API_ENDPOINT}/${post_type}?_embed&page=${pageNum}&per_page=8&offset=` + offset);
					dispatch({
						type: FETCH_POSTS,
						//payload: response.data
						payload: {items: response.data, headers: response.headers}
					});
				});
		}
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