import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchBook} from '../actions/index';
import BookNav from '../components/booknav';
import ContentLeft from '../components/content_left';
import ContentRight from '../components/content_right';
import {Link} from 'react-router-dom'

class Book extends Component {
    componentWillMount() {
        //console.log('menu will mount');
 	    //console.log(this.props.book);
        this.props.fetchBook(this.props.match.params.slug);
    }

	componentDidMount() {
        //console.log('menu did mount');
		//console.log('B did mount');
	}

	componentDidUpdate() {
        //console.log('menu did update');
		//console.log('B did update');
	}

	componentWillUpdate() {
        //console.log('menu did update');
		//console.log('B did update');
	}

	componentWillReceiveProps() {
        //console.log('menu will receive props');
		//console.log('B will receive props');
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

	imgLoaded() {
		setTimeout(function() {
			if(document.getElementById('cover')) {
				document.getElementById('cover').style.opacity = "1";
			}
			if(document.getElementById('title')) {
				document.getElementById('title').style.opacity = "1";
			}
		}, 250);
	}

	getPage() {
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
							<div id="cover" className="img-wrapper">
								<img 
								src={this.props.book.book.acf.book_cover.sizes.book_cover}
								onLoad={this.imgLoaded}/>
							</div>
							<div id="title" className="title-wrapper">
								<h2>{this.props.book.book.title.rendered}</h2>
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
								<BookNav slug={this.props.match.params.slug} page={this.props.match.params.pageNum} lastpage={this.lastPage(page)} />
							</div>
						);
					} else if (this.props.book.book.acf.book_pages[parseInt(page - 2)].page_type == 'regular') {
						return (
							<div className="content book regular" id="content">
								<div>
									<ContentLeft content={this.props.book.book.acf.book_pages[parseInt(page - 2)]} />
									<ContentRight sep={this.separatingLine(page)} content={this.props.book.book.acf.book_pages[parseInt(page - 2)]} />
								</div>
								<BookNav slug={this.props.match.params.slug} page={this.props.match.params.pageNum} lastpage={this.lastPage(page)} />
							</div>
						);
					} else if (this.props.book.book.acf.book_pages[parseInt(page - 2)].page_type == 'fullimage') {
						return (
							<div className="content book regular fullimage" id="content">
								<div>
									<img src={this.props.book.book.acf.book_pages[parseInt(page - 2)].full_sized_image.sizes.fullsize} />
								</div>
								<BookNav slug={this.props.match.params.slug} page={this.props.match.params.pageNum} lastpage={this.lastPage(page)} />
							</div>
						);
					} else if (this.props.book.book.acf.book_pages[parseInt(page - 2)].page_type == 'lastpage') {
						//console.log(this.props);
						return (
							<div className="content book lastpage" id="content">
								<div>
									<div dangerouslySetInnerHTML={{__html: this.props.book.book.acf.book_pages[parseInt(page - 2)].last_page_content}} />
									<Link to={`/index/`}><h5>Back to Index</h5></Link>
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
