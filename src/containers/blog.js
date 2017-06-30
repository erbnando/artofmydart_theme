import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions/index';
import Header from '../components/header';
import Main from '../components/main';
import Featured from './featured';
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
		if (window.location.pathname === '/') {
			//console.log('1');
			return 1;
		} else {
			//console.log(window.location.pathname.replace("/page/", '').replace("/", '') || 1);
			return window.location.pathname.replace("/page/", '').replace("/", '');

		}
	}

	render() {
		//console.log(this.props);
		return (
			<div className="content" id="content">
				<div className="grid-two">
					<p className="section-title">Current</p>
					<div id="content-left">
						<BlogLeft page={this.getPage()}
								  props={this.props}/>
					</div>
				</div>
				<div className="grid-two">
					<p className="section-title">Recent</p>
					<div id="content-right">
						<BlogRight page={this.getPage()}
								   props={this.props}/>
					</div>
				</div>
			</div>
		);
	}
}

module.exports = Blog;
