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

	componentWillUpdate() {
	}

	componentDidUpdate() {
		if (this.props.match.params.pageNum == undefined) {
			var page = 1;
		} else {
			var page = this.props.match.params.pageNum;
		}
		if (this.props.book.book.acf.book_pages[parseInt(page - 2)]) {
			if (this.props.match.params.pageNum !== undefined && this.props.book.book.acf.book_pages[parseInt(page - 2)].page_type !== 'fullimage') {
				console.log('neither cover nor full');
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
		if (parseInt(page) - 1 === this.props.book.book.acf.book_pages.length )	{
			return true
		} else {
			return false
		}
	}

	separatingLine(page) {
		//console.log(this.props.book.book.acf.book_pages[parseInt(page - 2)]);
		if (this.props.book.book.acf.book_pages[parseInt(page - 2)].separating_line == true) {
			return true
		} else {
			return false
		}
	}

	coverLoaded() {
		console.log('cover image loaded');
		setTimeout(function() {
			if(document.getElementById('book')) {
				document.getElementById('book').style.transition = "opacity .5s";
				document.getElementById('book').style.opacity = "1";
			}
		}, 500);
	}

	fullImageLoaded() {
		console.log('full image loaded');
		setTimeout(function() {
			if(document.getElementById('book')) {
				document.getElementById('book').style.transition = "opacity .5s";
				document.getElementById('book').style.opacity = "1";
			}
		}, 500);
	}

	getPage() {
		if (this.props.match.params.pageNum == undefined) {
			var page = 1;
		} else {
			var page = this.props.match.params.pageNum;
		}
		if(this.props.book.book && this.props.book.book.acf.book_cover){
			if (page == 1) {
				return (
					<div className="content book cover" id="content">
						<div>
							<div id="book">
								<div className="img-wrapper">
									<img 
									src={this.props.book.book.acf.book_cover.sizes.book_cover}
									onLoad={this.coverLoaded()}/>
								</div>
								<div className="title-wrapper">
									<h2>{this.props.book.book.title.rendered}</h2>
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
												<p className="author-title">{this.props.book.book.acf.author_title}</p>
												<p className="author-name">{this.props.book.book.acf.author_name}</p>
												<h1 className="book-title">{this.props.book.book.title.rendered}</h1>
											</div>
										</div>
									</div>
								</div>
								<BookNav slug={this.props.match.params.slug} page={this.props.match.params.pageNum} lastpage={this.lastPage(page)} />
							</div>
						);
					} else if (this.props.book.book.acf.book_pages[parseInt(page - 2)].page_type == 'regular') {
						return (
							<div className="content book regular" id="content">
								<div>
									<div id="book">
										<ContentLeft content={this.props.book.book.acf.book_pages[parseInt(page - 2)]} />
										<ContentRight sep={this.separatingLine(page)} content={this.props.book.book.acf.book_pages[parseInt(page - 2)]} />
									</div>
								</div>
								<BookNav slug={this.props.match.params.slug} page={this.props.match.params.pageNum} lastpage={this.lastPage(page)} />
							</div>
						);
					} else if (this.props.book.book.acf.book_pages[parseInt(page - 2)].page_type == 'fullimage') {
						return (
							<div className="content book regular fullimage" id="content">
								<div>
									<div id="book">
										<img 
										src={this.props.book.book.acf.book_pages[parseInt(page - 2)].full_sized_image.sizes.fullsize}
										onLoad={this.fullImageLoaded()}/>
									</div>
								</div>
								<BookNav slug={this.props.match.params.slug} page={this.props.match.params.pageNum} lastpage={this.lastPage(page)} />
							</div>
						);
					} else if (this.props.book.book.acf.book_pages[parseInt(page - 2)].page_type == 'lastpage') {
						//console.log(this.props);
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
