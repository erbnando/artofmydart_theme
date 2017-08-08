import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchOddPosts} from '../actions/index';
import Article from '../components/article';
import PageNav from '../components/pagenav';

class BlogLeft extends Component {
	componentWillMount() {
		//console.log('will mount');
		//console.log(this.props);
		//console.log('will mount');
		this.getPosts(this.props, true);
	}

	componentWillReceiveProps(nextProps) {
		//console.log('will receive props');
		//console.log(nextProps);
		this.getPosts(nextProps);
	}

	shouldComponentUpdate(nextProps) {
		//console.log(this.props.odd_posts.items);
		//console.log(nextProps.odd_posts.items);
		//console.log(this.props.odd_posts !== nextProps.odd_posts);
		return this.props.odd_posts !== nextProps.odd_posts;
	}

	getPosts(props, willMount = false) {
		//console.log(props.page);
		if (props.page !== this.props.page || willMount /*|| this.props.props.location.pathname !== props.props.location.pathname*/) {
			if(this.props.nav == true) {
				this.props.fetchOddPosts(props.page || 1, 'books', 'home')
			} else {
				this.props.fetchOddPosts(props.page || 1, 'books', 'index');
			}
		}
	}

	renderOddPosts(posts) {
		return posts.map(post => {
			return <Article key={post.id}
							type={post.type}
							pId={post.id}
							title={post.title.rendered}
							author={post.acf.author_single_line}
							date={post.acf.date}
							link={post.link}/>
		});
	}

	componentDidUpdate() {
		if (document.getElementById('blog-left')) {
			if (this.props.odd_posts.items.length == 0) {
				document.getElementById('blog-left').className = "grid-two blog-left blog-left-hidden";
			} else {
				document.getElementById('blog-left').className = "grid-two blog-left";
			}
		}

		if (this.props.props.location.pathname == '/') {
			window.rightloaded = true;
			if (window.leftloaded === true) {
				setTimeout(function() {
					if(document.getElementById('content-right')) {
						document.getElementById('content-right').style.opacity = "1";
					}
					if(document.getElementById('content-left')) {
						document.getElementById('content-left').style.opacity = "1";
					}
					window.leftloaded = false;
					window.rightloaded = false;
				}, 250);
			}
		} else {
			window.leftloaded = true;
			if (window.rightloaded === true) {
				setTimeout(function() {
					if(document.getElementById('content-right')) {
						document.getElementById('content-right').style.opacity = "1";
					}
					if(document.getElementById('content-left')) {
						document.getElementById('content-left').style.opacity = "1";
					}
					window.leftloaded = false;
					window.rightloaded = false;
				}, 250);
			}
		}
	}

	shouldRender() {
		return ((this.props.page * 8)-4) < this.props.odd_posts.headers['x-wp-total']
	}

	getNav() {
		//console.log(this.props);
		if(this.props.nav == true) {
			return <PageNav pageNum={this.props.page}
							total={this.props.odd_posts.headers['x-wp-total']}
					 		shouldRender={this.shouldRender()}
							route={this.props.route || ''}
							slug={this.props.slug || ''}
							type="home"/>
		} else {
			return
		}
	}

	render() {
		//console.log('render');
		//console.log(this.props.odd_posts.headers['x-wp-total']);
		//console.log(((this.props.page * 8)-4) <= this.props.odd_posts.headers['x-wp-total']);
		if (this.props.odd_posts.items) {
			return (
				<div>
					<main className="posts">
						{this.renderOddPosts(this.props.odd_posts.items)}
					</main>
					{this.getNav()}
				</div>
			);
		} else {
			return (
				<p>loading...</p>
			);
		}
	}
}

function mapStateToProps({odd_posts}) {
	return {odd_posts};
}

export default connect(mapStateToProps, {fetchOddPosts})(BlogLeft)
