import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchBook} from '../actions/index';
import BookNav from '../components/booknav';
import ContentLeft from '../components/content_left';
import ContentRight from '../components/content_right';
import {Link} from 'react-router-dom'

class Book extends Component {
    componentWillMount() {
        this.props.fetchBook(this.props.match.params.slug);
    }

	componentDidMount() {
	}

	componentWillReceiveProps() {
	}

	componentDidUpdate() {
		var checkImgsLoadedInterval = setInterval(checkImgsLoaded, 100);
		function checkImgsLoaded() {
			for(var img of Array.from(document.images)) {
				if (img.complete == false) {
					var loaded = false;
				} else {
					var loaded = true;
				}
			}
			if (loaded == true) {
				clearInterval(checkImgsLoadedInterval);
				setTimeout(function() {
					if(document.getElementById('book')) {
						document.getElementById('book').style.transition = "opacity .5s";
						document.getElementById('book').style.opacity = "1";
					}
				}, 500);
			}
		}
	}

	lastPage(page) {
		if ((parseInt(page) - 1 === this.props.book.book.acf.book_pages.length) || (this.props.book.book.acf.book_pages.length == undefined)) {
			return true
		} else {
			return false
		}
	}

	separatingLine(page) {
		//console.log(this.props.book.book.acf.book_pages[parseInt(page - 2)].page_type);
		if (this.props.book.book.acf.book_pages[parseInt(page - 2)].separating_line == true && this.props.book.book.acf.book_pages[parseInt(page - 2)].page_type != 'spread') {
			return 'sep'
		} else {
			return ''
		}
	}

	coverImage() {
		if (this.props.book.book.acf.book_cover) {
			return this.props.book.book.acf.book_cover.sizes.book_cover
		} else {
			return ''
		}
	}

	getPage() {
		if (this.props.match.params.pageNum == undefined) {
			var page = 1;
		} else {
			var page = this.props.match.params.pageNum;
		}
		if(this.props.book.book){
			if (page == 1) {
				return (
					<div className="content book cover" id="content">
						<div>
							<div id="book">
								<div className="img-wrapper">
									<Link to={`/books/${this.props.match.params.slug}/2`} >
										<img 
										src={this.coverImage()}/>
									</Link>
								</div>
								<div className="title-wrapper">
									<h2 dangerouslySetInnerHTML={{__html: this.props.book.book.title.rendered }} />
								</div>
							</div>
						</div>
						<BookNav page="1" slug={this.props.match.params.slug} lastpage={this.lastPage()}/>
					</div>
				);
			} else {
				if (this.props.book.book.acf.book_pages[parseInt(page - 2)]) {
					if (this.props.book.book.acf.book_pages[parseInt(page - 2)].page_type == 'title') {
						return (
							<div className="content book title" id="content">
								<div>
									<div id="book">
										<div className="book-grid-two">
										</div>
										<div className="book-grid-two">
											<div>
												<h1 className="book-title" dangerouslySetInnerHTML={{__html: this.props.book.book.title.rendered }} />
												<p className="author-title" dangerouslySetInnerHTML={{__html: this.props.book.book.acf.author_title }} />
												<p className="author-name" dangerouslySetInnerHTML={{__html: this.props.book.book.acf.author_name }} />
											</div>
										</div>
									</div>
								</div>
								<BookNav slug={this.props.match.params.slug} page={this.props.match.params.pageNum} lastpage={this.lastPage(page)} />
							</div>
						);
					} else if (this.props.book.book.acf.book_pages[parseInt(page - 2)].page_type == 'textimages' || this.props.book.book.acf.book_pages[parseInt(page - 2)].page_type == 'spread') {
						//console.log(this.props.book.book.acf.book_pages[parseInt(page - 2)]);
						return (
							<div className={'content book textimages ' + this.separatingLine(page)} id="content">
								<div className="book-container">
									<div id="book">
										<ContentLeft content={this.props.book.book.acf.book_pages[parseInt(page - 2)]} />
										<ContentRight content={this.props.book.book.acf.book_pages[parseInt(page - 2)]} />
									</div>
								</div>
								<BookNav slug={this.props.match.params.slug} page={this.props.match.params.pageNum} lastpage={this.lastPage(page)} />
							</div>
						);
					} else if (this.props.book.book.acf.book_pages[parseInt(page - 2)].page_type == 'last') {
						return (
							<div className="content book lastpage" id="content">
								<div>
									<div id="book">
										<div dangerouslySetInnerHTML={{__html: this.props.book.book.acf.book_pages[parseInt(page - 2)].last_page_content}} />
										<Link to={`/index/`}><h5>Back to Index</h5></Link>
									</div>
								</div>
								<BookNav slug={this.props.match.params.slug} page={this.props.match.params.pageNum} lastpage={this.lastPage(page)} />
							</div>
						);
					} else {
						return (
							<span />
						);
					}
				}
			}
		} else {
			return (
				<div className="content book" id="content">
					<span />
				</div>
			);
		}
	}

	render() {
		if (this.props.book.book) {
			//console.log(this.props);
			return (
				<div>
					{this.getPage()}
				</div>
			);
		} else {
			return <span />
		}
	}
}

function mapStateToProps({book}) {
	return {book};
}

export default connect(mapStateToProps, {fetchBook})(Book)
