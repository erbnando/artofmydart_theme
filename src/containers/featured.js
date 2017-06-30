import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import {connect} from 'react-redux';
import {fetchFeatBook} from '../actions';

class Featured extends Component {	
	componentWillMount() {
		//console.log('F will mount');
		this.props.fetchFeatBook();
	}

	componentDidMount() {
		//console.log('F did mount');
	}

	componentDidUpdate() {
		//console.log('F did mount');
	}

	componentWillReceiveProps() {
		//console.log('F will receive props');
	}

	componentWillUnmount() {
		//console.log('F will unmount');		
	}

	imgLoaded() {
		window.leftloaded = true;
		if (window.rightloaded !== true) {
			//console.log('blog left:', window.leftloaded, 'blog right:', window.rightloaded);
		} else {
			setTimeout(function() {
				document.getElementById('content-left').style.opacity = "1";
				document.getElementById('content-right').style.opacity = "1";
			//	console.log('blog left triggered display');
				window.leftloaded = false;
				window.rightloaded = false;
			}, 250);
		}
	}

	render(nextprops) {
		//console.log(this.props);
		if (typeof this.props.feat_book.featured.better_featured_image != 'undefined') {
			//console.log(this.props.feat_book.featured.better_featured_image.media_details.sizes.home.source_url);
			//console.log(this.props.feat_book.featured);
			return (
				<div className="featured">
					<img 
					id='featured-image'
					onLoad={this.imgLoaded}
					src={this.props.feat_book.featured.better_featured_image.media_details.sizes.home.source_url}
					/>
					<Link 
					to={this.props.feat_book.featured.link}>
					<h1>{this.props.feat_book.featured.title.rendered}</h1>
					</Link>
					<p>{this.props.feat_book.featured.acf.author}</p>
				</div>
			);
		} else {
			//console.log('undefined');
			return (
				<p>loading...</p>
			);
		}
	}

}

function mapStateToProps({feat_book}) {
	//console.log('mapStateToProps');
	return {feat_book};
}

export default connect(mapStateToProps, {fetchFeatBook}, null, {pure: true})(Featured)
