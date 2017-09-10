import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions/index';
import Featured from '../components/featured';
import BlogLeft from '../components/index_left';

class Home extends Component {
	componentWillMount() {
	}

	componentDidMount() {
	}

	shouldComponentUpdate() {
	}

	componentDidUpdate() {
	}

	componentWillReceiveProps() {
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
			<div className="content home" id="content">
				<div className="grid-two index-home-left">
					<p className="section-title">Current</p>
					<div id="content-left">
						<Featured />
					</div>
				</div>
				<div className="grid-two">
					<p className="section-title">Recent</p>
					<div id="content-right">
						<BlogLeft page={this.getPage()}
								  props={this.props}
								  nav={true}/>
					</div>
				</div>
			</div>
		);
	}
}

module.exports = Home;
