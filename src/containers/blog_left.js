import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchEvenPosts} from '../actions/index';
import Article from '../components/article';
import PageNav from '../components/pagenav';

class BlogLeft extends Component {
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
		//console.log(props);
		if (props.page !== this.props.page || willMount /*|| this.props.props.location.pathname !== props.props.location.pathname*/) {
			this.props.fetchEvenPosts(props.page || 1);
		}

	}

    renderEvenPosts(posts) {
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
		window.leftloaded = true;
		if (window.rightloaded !== true) {
			console.log('blog left loaded first');
			//console.log('blog left:', window.leftloaded, 'blog right:', window.rightloaded);
		} else {
			setTimeout(function() {
				document.getElementById('content-left').style.opacity = "1";
				document.getElementById('content-right').style.opacity = "1";
				console.log('blog left triggered display');
				window.leftloaded = false;
				window.rightloaded = false;
			}, 250);
		}
	}

	render() {
		//console.log(this.props.even_posts.items);
		//if (this.props.page < 2 || this.props.page == null) {
		if (this.props.even_posts.items) {
			return (
                <div>
	                <main className="posts">
	                    {this.renderEvenPosts(this.props.even_posts.items)}
	                </main>
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

export default connect(mapStateToProps, {fetchEvenPosts})(BlogLeft)
