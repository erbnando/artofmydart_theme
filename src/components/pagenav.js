import React, {Component} from 'react';
import { Link } from 'react-router-dom'

export default class PageNav extends Component {

	/*
	getPrevPage() {
		if (parseInt(this.props.pageNum) > 2) {
			return `/page/${parseInt(this.props.pageNum) - 1}`;
		} else {
			return `/`;
		}
	}
	*/

	getPageNumber() {
		//console.log(this.props.type);
		if (this.props.type == 'home') {
			if (this.props.pageNum == '1') {
				return 'More'
			} else {
				return
			}
		} else {
			return
		}
	}

	getNextPage() {
		if (this.props.type == 'home') {
			return `/index`;
		} else {
			//console.log(`/${this.getArchiveType()}${this.getArchiveSlug()}/${parseInt(this.props.pageNum) + 1}`);
			return `/index/page/${parseInt(this.props.pageNum) + 1}`;
		}
	}

	hideComponents() {
		//console.log('link onclick');
		/*
		if (document.getElementById('content-left') && document.getElementById('content-right')){
			if (window.location.pathname !== '/') {
				document.getElementById('content-left').style.opacity = "0";
				document.getElementById('content-right').style.opacity = "0";
				//console.log('-----content left and right hidden');
			}
		}
		*/
	}

	render() {
		//console.log(this.props.shouldRender);
		if (!this.props.shouldRender) {
			return <span />;
		}

		/*
		var previousButton = '';
		if (1 < this.props.pageNum) {
			previousButton = <Link to={this.getPrevPage()} className="nav-link">Previous</Link>;
		}
		*/

		var nextButton = '';
		//if (((4 + (this.props.pageNum - 1)*8) || 1) <= this.props.total) {
		nextButton = <Link to={this.getNextPage()} /*onClick={this.hideComponents}*/ className="nav-link more">{this.getPageNumber()}</Link>;
		//}

		return (
			<div className="nav">
				<div className="nav-item">
					{nextButton}
				</div>
			</div>
		);
	}
}
