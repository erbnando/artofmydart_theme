import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchEvenPosts} from '../actions/index';
import Article from '../components/article';
import PageNav from '../components/pagenav';

class BlogRight extends Component {
	componentWillMount() {
		//console.log(this.props);
        this.getPosts(this.props, true);
	}

	componentWillReceiveProps(nextProps) {
		this.getPosts(nextProps);
		//console.log('will receive props');
	}

	shouldComponentUpdate(nextProps) {
		//console.log(this.props.even_posts);
		//console.log(nextProps.even_posts);
		return this.props.even_posts !== nextProps.even_posts;
	}

	getPosts(props, willMount = false) {
		if (props.page !== this.props.page || willMount /*|| this.props.props.location.pathname !== props.props.location.pathname*/) {
			this.props.fetchEvenPosts(props.page || 1, 'books');
		}

	}

    renderEvenPosts(posts) {
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
		//set right flag to true
		window.rightloaded = true;
		if (window.leftloaded !== true) {
			//console.log('blog right loaded first');
			//console.log('blog right:', window.rightloaded, 'blog left:', window.leftloaded);
		} else {
			setTimeout(function() {
				if(document.getElementById('content-right')) {
					document.getElementById('content-right').style.opacity = "1";
				}
				if(document.getElementById('content-left')) {
					document.getElementById('content-left').style.opacity = "1";
				}
				//scroll to top
				//window.scrollTo(0, 0);
				//console.log('+++++blog right triggered display');
				window.rightloaded = false;
				window.leftloaded = false;
			}, 250);
		}
	}

	shouldRender() {
		return ((this.props.page * 8) < this.props.even_posts.headers['x-wp-total']);
	}

	getNav() {
		if(this.props.nav == true) {
			return <PageNav pageNum={this.props.page}
							total={this.props.even_posts.headers['x-wp-total']}
					 		shouldRender={this.shouldRender()}
							route={this.props.route || ''}
							slug={this.props.slug || ''}
							type="index"/>
		} else {
			return
		}
	}

	render() {
		//console.log(this.props.even_posts.items);
		//if (this.props.page < 2 || this.props.page == null) {
		//console.log(this.props);
		if (this.props.even_posts.items) {
			return (
                <div>
	                <main className="posts">
	                    {this.renderEvenPosts(this.props.even_posts.items)}
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

function mapStateToProps({even_posts}) {
	return {even_posts};
}

export default connect(mapStateToProps, {fetchEvenPosts})(BlogRight)
