import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions/index';
import BlogLeft from './blog_left';
import BlogRight from './blog_right';

class Index extends Component {
	componentWillMount() {
		//console.log('I will mount');
	}

	componentDidMount() {
		//console.log('I did mount');
	}

	componentDidUpdate() {
		//console.log('I did update');
	}

	componentWillReceiveProps() {
		//console.log('I will receive props');
	}

	getPage() {
		if (window.location.pathname === '/index/' || window.location.pathname === '/index') {
			//console.log('1');
			return 1
		} else {
			//console.log(window.location.pathname.replace("/index/page/", '').replace("/", ''));
			return window.location.pathname.replace("/index/page/", '').replace("/", '');

		}
	}

	render() {
		//console.log(this.getPage());
		return (
			<div className="content index" id="content">
				<div className="grid-two blog-left">
					<p className="section-title">Index</p>
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

module.exports = Index;
