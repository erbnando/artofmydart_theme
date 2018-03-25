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
		if (window.rightloaded === true) {
			setTimeout(function() {
				if(document.getElementById('content-left')) {
					document.getElementById('content-left').style.transition = "opacity .5s";
					document.getElementById('content-left').style.opacity = "1";
				}
				if(document.getElementById('content-right')) {
					document.getElementById('content-right').style.transition = "opacity .5s";
					document.getElementById('content-right').style.opacity = "1";
				}
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
					<div className="featured-image">
						<img 
						id='featured-image'
						onLoad={this.imgLoaded}
						src={this.getFeaturedImage()}
						/>
					</div>
					<div className="featured-details">
						<div>
							<Link to={"/books/" + this.props.feat_book.featured.slug}>
								<h3 dangerouslySetInnerHTML={{__html: this.props.feat_book.featured.title.rendered}} />
								<p dangerouslySetInnerHTML={{__html: this.props.feat_book.featured.acf.author_single_line}} />
							</Link>
						</div>
					</div>
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
