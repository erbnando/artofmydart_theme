import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchOddPosts} from '../actions/index';
import Article from '../components/article';
import PageNav from '../components/pagenav';

class BlogRight extends Component {
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
		//console.log(this.props);
		if (props.page !== this.props.page || willMount /*|| this.props.props.location.pathname !== props.props.location.pathname*/) {
			this.props.fetchOddPosts(props.page || 1);
		}
	}

    renderOddPosts(posts) {
        return posts.map(post => {
            return <Article key={post.id}
                            type={post.type}
                            pId={post.id}
                            title={post.title.rendered}
                            author={post.acf.author}
                            date={post.acf.date}
                            link={post.link}/>
        });
    }

	componentDidUpdate() {
		//console.log('did update');
		window.rightloaded = true;
		if (window.leftloaded !== true) {
			//console.log('blog left:', window.rightloaded, 'blog right:', window.leftloaded);
		} else {
			setTimeout(function() {
				document.getElementById('content-left').style.opacity = "1";
				document.getElementById('content-right').style.opacity = "1";
			//	console.log('blog left triggered display');
				window.rightloaded = false;
				window.leftloaded = false;
			}, 250);
		}
	}

	render() {
		//console.log('render');
		//console.log(this.props.odd_posts.headers['x-wp-total']);
		//console.log(((this.props.page * 8)-4) <= this.props.odd_posts.headers['x-wp-total']);
		//if (this.props.page < 2 || this.props.page == null) {
		if (this.props.odd_posts.items) {
			return (
                <div>
	                <main className="posts">
	                    {this.renderOddPosts(this.props.odd_posts.items)}
	                </main>
					<PageNav pageNum={this.props.page}
							 total={this.props.odd_posts.headers['x-wp-total']}
							 shouldRender={((this.props.page * 8)-4) < this.props.odd_posts.headers['x-wp-total']}
							 route={this.props.route || ''}
                      		 slug={this.props.slug || ''}/>
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

export default connect(mapStateToProps, {fetchOddPosts})(BlogRight)
