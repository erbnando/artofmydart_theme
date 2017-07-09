import React, {Component} from 'react';
import {connect} from 'react-redux';
import BlogLeft from './blog_left';
import BlogRight from './blog_right';

class Blog extends Component {
	componentWillMount() {
		//console.log('B will mount');
	}

	componentDidMount() {
		//console.log('B did mount');
	}

	componentDidUpdate() {
		//console.log('B did update');
	}

	componentWillReceiveProps() {
		//console.log('B will receive props');
	}

	getPage() {
		//console.log(window.location.pathname);
		if (window.location.pathname === '/') {
			//console.log('1');
			return 1;
		} else {
			//console.log(window.location.pathname.replace("/page/", '').replace("/", '') || 1);
			return window.location.pathname.replace("/page/", '').replace("/", '');

		}
	}

	render() {
		console.log(this.props);
		return (
			<div className="content" id="content">
				<div className="grid-two blog-left">
					<p className="section-title">Recent</p>
					<div id="content-left">
						<BlogLeft page={this.getPage()}
								  props={this.props}
								  nav={false}/>
					</div>
				</div>
				<div className="grid-two blog-right" id="blog-right">
					<div id="content-right">
						<BlogRight page={this.getPage()}
								   props={this.props}
								   nav={true}/>
					</div>
				</div>
			</div>
		);
	}
}

module.exports = Blog;
