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
		//console.log(this.props);
		if (this.props.match.params.pageNum == undefined) {
			var page = 1;
		} else {
			var page = this.props.match.params.pageNum;
		}
		if(this.props.book.book !== undefined && this.props.book.book.acf.book_cover !== undefined){
			if (page == 1) {
				return (
					<div className="content book cover" id="content">
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
				if (this.props.book.book.acf.book_pages[parseInt(page - 2)] && this.props.book.book.acf.book_pages[parseInt(page - 2)].page_type == 'title') {
					return (
						<div className="content book title" id="content">
							<div>
								<div className="book-grid-two">
								</div>
								<div className="book-grid-two">
									<div>
										<p className="author-title">{this.props.book.book.acf.author_title}</p>
										<p className="author-name">{this.props.book.book.acf.author_name}</p>
										<h1 className="book-title">{this.props.book.book.title.rendered}</h1>
									</div>
								</div>
							</div>
							<BookNav slug={this.props.match.params.slug} page={this.props.match.params.pageNum} />
						</div>
					);
				} else {
					return (
						<div className="content book" id="content">
							<span>no content</span>
						</div>
					);
				}
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
