import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions/index';

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
				<p>not found</p>
			</div>
		);
	}
}

module.exports = Index;
