import React, {Component} from 'react';
import {Link} from 'react-router-dom'

export default class BookNav extends Component {

	/*
	getPrevPage() {
		if (parseInt(this.props.pageNum) > 2) {
			return `/page/${parseInt(this.props.pageNum) - 1}`;
		} else {
			return `/`;
		}

	}

	getPageNumber() {
		if (this.props.type == 'blog') {
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
		//console.log(`/${this.getArchiveType()}${this.getArchiveSlug()}/${parseInt(this.props.pageNum) + 1}`);
		return `/${this.getArchiveType()}${this.getArchiveSlug()}/${parseInt(this.props.pageNum) + 1}`;
	}

	getArchiveType() {
		//console.log(this.props.type);
		if (this.props.type == 'blog') {
			return 'page';
		} else {
			return 'index/page';
		}
	}

	getArchiveSlug() {
		return "" !== this.props.slug ? `/${this.props.slug}` : '';
	}

	hideComponents() {
		//console.log('link onclick');
		if (document.getElementById('content-left') && document.getElementById('content-right')){
			if (window.location.pathname !== '/') {
				document.getElementById('content-left').style.opacity = "0";
				document.getElementById('content-right').style.opacity = "0";
				//console.log('-----content left and right hidden');
			}
		}
	}
*/

	getNextPage() {
		//console.log(this.props);
		return <Link className="next" to={`/books/${this.props.slug}/${parseInt(this.props.page) + 1}`} ></Link>;
	}

	getPrevPage() {
		if (this.props.page > 1) {
			return <Link className="prev" to={`/books/${this.props.slug}/${parseInt(this.props.page) - 1}`} ></Link>;
		} else {
			return <span />
		}
	}

	render() {
		//console.log(this.props.shouldRender);
		/*
		if (!this.props.shouldRender) {
			return <span />;
		}

		var previousButton = '';
		if (1 < this.props.pageNum) {
			previousButton = <Link to={this.getPrevPage()} className="nav-link">Previous</Link>;
		}
		*/

		//var nextButton = '';
		//if (((4 + (this.props.pageNum - 1)*8) || 1) <= this.props.total) {
		//nextButton = <Link to={this.getNextPage()} /*onClick={this.hideComponents}*/ className="nav-link more">{this.getPageNumber()}</Link>;
		//}

		return (
			<div className="book-nav">
				{this.getPrevPage()}
				{this.getNextPage()}
			</div>
		);
	}
}
