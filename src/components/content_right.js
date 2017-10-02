import React, {Component} from 'react';

class ContentRight extends Component {
	getRightImageSrc() {
		//console.log(this.props);
		if (this.props.content.single_image_size_right == "small") {
			return this.props.content.small_single_image_right.sizes.small
		}
		else if (this.props.content.single_image_size_right == "medium") {
			return this.props.content.medium_single_image_right.sizes.medium
		}
		else if (this.props.content.single_image_size_right == "large") {
			return this.props.content.large_single_image_right.sizes.large
		}
		else if (this.props.content.single_image_size_right == "full") {
			return this.props.content.full_single_image_right.sizes.full
		}
	}

	getTopRightImageSrc() {
		if (this.props.content.double_image_size_top_right == "medium") {
			return this.props.content.medium_double_image_top_right.sizes.doublemedium
		}
		else if (this.props.content.double_image_size_top_right == "full") {
			return this.props.content.full_double_image_top_right.sizes.doublefull
		}
	}

	getBottomRightImageSrc() {
		if (this.props.content.double_image_size_bottom_right == "medium") {
			return this.props.content.medium_double_image_bottom_right.sizes.doublemedium
		}
		else if (this.props.content.double_image_size_bottom_right == "full") {
			return this.props.content.full_double_image_bottom_right.sizes.doublefull
		}
	}

	getPosition() {
		if (this.props.content.right_content_image == 'single') {
			if (this.props.content.right_image_placement == "top") {
				return 'top '
			} else if (this.props.content.right_image_placement == "bottom") {
				return 'bottom '
			} else if (this.props.content.right_image_placement == "left") {
				return 'left '
			} else if (this.props.content.right_image_placement == "right") {
				return 'right '
			} else if (this.props.content.right_image_placement == "topleft") {
				return 'top-left '
			} else if (this.props.content.right_image_placement == "topright") {
				return 'top-right '
			} else if (this.props.content.right_image_placement == "bottomleft") {
				return 'bottom-left '
			} else if (this.props.content.right_image_placement == "bottomright") {
				return 'bottom-right '
			} else if (this.props.content.right_image_placement == "center") {
				return 'center '
			}
		} else {
			return ''
		}
	}

	getSingleRightCaptions() {
		var size = this.props.content.single_image_size_right + '_single_image_right';
		if (this.props.content[size].title || this.props.content[size].caption) {
			if (this.props.content[size].title) {
				var title = '<h6>' + this.props.content[size].title + '</h6>';
			} else {
				var title = '';
			}
			return '<div>' + '<h5>Right</H5>' + title + '<p>' + this.props.content[size].caption + '</p>' + '</div>';
		}
	}

	getDoubleTopRightCaptions() {
		var size = this.props.content.double_image_size_top_right + '_double_image_top_right';
		if (this.props.content[size].title || this.props.content[size].caption) {
			if (this.props.content[size].title) {
				var title = '<h6>' + this.props.content[size].title + '</h6>';
			} else {
				var title = '';
			}
			return '<div>' + '<h5>Upper Right</H5>' + title + '<p>' + this.props.content[size].caption + '</p>' + '</div>';
	 	}
	}

	getDoubleBottomRightCaptions() {
		var size = this.props.content.double_image_size_bottom_right + '_double_image_bottom_right';
		if (this.props.content[size].title || this.props.content[size].caption) {
			if (this.props.content[size].title) {
				var title = '<h6>' + this.props.content[size].title + '</h6>';
			} else {
				var title = '';
			}
			return '<div>' + '<h5>Lower Right</H5>' + title + '<p>' + this.props.content[size].caption + '</p>' + '</div>';
	 	}
	}

	getContent() {
		if (this.props.content.page_type == 'text') {
			if (this.props.content.right_content_text == 'text') {
				return (
					<div dangerouslySetInnerHTML={{__html: this.props.content.text_content_right}} />
				);
			} else if (this.props.content.right_content_text == 'quote') {
				return (
					<div>
						<div className="quote-text" dangerouslySetInnerHTML={{__html: this.props.content.quote_text_right}} />					
						<span className="quote-author" dangerouslySetInnerHTML={{__html: this.props.content.quote_author_right}} />,
						<span>&nbsp;</span>
						<span className="quote-source" dangerouslySetInnerHTML={{__html: this.props.content.quote_source_right}} />
					</div>
				);
			}
		} else if (this.props.content.page_type == 'images') {
			if (this.props.content.right_content_image == 'single') {
				return (
					<div>
						<img
						src={this.getRightImageSrc()}
						/>
						<div id='captions-right-single' className="captions-right" dangerouslySetInnerHTML={{__html: this.getSingleRightCaptions()}}></div>
					</div>
				);
			} else if (this.props.content.right_content_image == 'double') {
				return (
					<div>
						<div className={this.props.content.double_image_size_top_right}>
							<div>
								<img
								src={this.getTopRightImageSrc()}
								/>
								<div id='captions-right-double-top' className="captions-right" dangerouslySetInnerHTML={{__html: this.getDoubleTopRightCaptions()}}></div>
							</div>
						</div>
						<div className={this.props.content.double_image_size_bottom_right}>
							<div>
								<img
								src={this.getBottomRightImageSrc()}
								/>
								<div id='captions-right-double-bottom' className="captions-right" dangerouslySetInnerHTML={{__html: this.getDoubleBottomRightCaptions()}}></div>
							</div>
						</div>
					</div>
				);
			}
		}
	}

	getPageType() {
		if (this.props.content.page_type == 'text') {
			if (this.props.content.right_content_text == 'text') {
				return 'text'
			} else if (this.props.content.right_content_text == 'quote') {
				return 'quote'
			} else if (this.props.content.right_content_text == 'blank') {
				return 'blank'
			}
		} else if (this.props.content.page_type == 'images') {
			if (this.props.content.right_content_image == 'single') {
				return 'single'
			} else if (this.props.content.right_content_image == 'double') {
				return 'double'
			} else if (this.props.content.right_content_image == 'blank') {
				return 'blank'
			}
		}
	}

	render() {
		return (
			<div className={"book-grid-two " + this.getPosition() + this.getPageType()}>
				<div className={"content-right " + this.props.content.single_image_size_right}>
					{this.getContent()}
				</div>
			</div>
		);
	}
}

module.exports = ContentRight;
