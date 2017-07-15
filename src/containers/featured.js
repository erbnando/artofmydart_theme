import React, {Component} from 'react';
import {Link} from 'react-router-dom'
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
			//console.log('index featured loaded first');
			//console.log('blog left:', window.leftloaded, 'blog right:', window.rightloaded);
		} else {
			setTimeout(function() {
				if(document.getElementById('content-left')) {
					document.getElementById('content-left').style.opacity = "1";
				}
				if(document.getElementById('content-right')) {
					document.getElementById('content-right').style.opacity = "1";
				}
				//scroll to top
				//window.scrollTo(0, 0);
				//console.log('+++++index featured triggered display');
				window.leftloaded = false;
				window.rightloaded = false;
			}, 250);
		}
	}

	getFeaturedImage() {
		if (this.props.feat_book.featured.acf.book_cover) {
			return this.props.feat_book.featured.acf.book_cover.sizes.home;
		} else {
			return 'http://placehold.it/200x200?text=featured%20book';
		}

	}

	render() {
		//console.log(this.props);
		if (typeof this.props.feat_book.featured.acf != 'undefined') {
			//console.log(this.props.feat_book.featured.better_featured_image.media_details.sizes.home.source_url);
			//console.log(this.props.feat_book.featured);
			return (
				<div className="featured">
					<Link 
					to={"/books/" + this.props.feat_book.featured.slug}>
						<div className="featured-image">
							<img 
							id='featured-image'
							onLoad={this.imgLoaded}
							src={this.getFeaturedImage()}
							/>
						</div>
						<div className="featured-details">
							<div>
								<h3>{this.props.feat_book.featured.title.rendered}</h3>
								<p>{this.props.feat_book.featured.acf.author_single_line}</p>
							</div>
						</div>
					</Link>
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
