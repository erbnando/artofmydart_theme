import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchBook} from '../actions/index';
import BookNav from '../components/booknav';

class Book extends Component {
    componentWillMount() {
        //console.log('\nmenu willmount:');
 	    //console.log(this.props.book);
        this.props.fetchBook(this.props.match.params.slug);
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
		console.log(this.props);
		if (this.props.match.params.pageNum == undefined) {
			var page = 1;
		} else {
			var page = this.props.match.params.pageNum;
		}
		if(this.props.book.book !== undefined && this.props.book.book.acf.book_cover !== undefined){
			if (page == 1) {
				return (
					<div className="content book" id="content">
						<div>
							<div className="img-wrapper">
								<img src={this.props.book.book.acf.book_cover.sizes.book_cover} />
							</div>
							<div className="title-wrapper">
								<h2>{this.props.book.book.title.rendered}</h2>
							</div>
						</div>
						<BookNav page="1" slug={this.props.match.params.slug} />
					</div>
				);
			} else {
				return (
					<div className="content book" id="content">
						<p>page {page}</p>
						<BookNav slug={this.props.match.params.slug} page={this.props.match.params.pageNum} />
					</div>
				);
			}
		} else {
			return (
				<div className="content book" id="content">
					<span>loading...</span>
				</div>
			);
		}
	}

	render() {
		return (
			<div>
				{this.getPage()}
			</div>
		);
	}
}

function mapStateToProps({book}) {
	return {book};
}

export default connect(mapStateToProps, {fetchBook})(Book)
