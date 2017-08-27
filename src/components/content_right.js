import React, {Component} from 'react';

class ContentRight extends Component {
    componentWillMount() {
    }

	componentDidMount() {
	}

	componentDidUpdate() {
	}

	componentWillReceiveProps() {
	}

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
		//console.log(this.props.content.small_double_image_top_right.sizes.double_small);
		if (this.props.content.double_image_size_top_right == "small") {
			return this.props.content.small_double_image_top_right.sizes.doublesmall
		}
		else if (this.props.content.double_image_size_top_right == "medium") {
			return this.props.content.medium_double_image_top_right.sizes.doublemedium
		}
		else if (this.props.content.double_image_size_top_right == "full") {
			return this.props.content.full_double_image_top_right.sizes.doublefull
		}
	}

	getBottomRightImageSrc() {
		//console.log(this.props);
		if (this.props.content.double_image_size_bottom_right == "small") {
			return this.props.content.small_double_image_bottom_right.sizes.doublesmall
		}
		else if (this.props.content.double_image_size_bottom_right == "medium") {
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
				return ' '
			}
		} else {
			return ''
		}
	}

	getSingleRightCaptions() {
		if (this.props.content.single_image_caption_right) {
			var caption = '<div>' + '<h5>Right</H5>' + '<h6>' + this.props.content.single_image_caption_subheader_right + '</h6>' + this.props.content.single_image_caption_text_right + '</div>';
	 		return caption
		} 
	}

	getDoubleTopRightCaptions() {
		if (this.props.content.double_image_caption_top_right) {
			var caption = '<div>' + '<h5>Upper Right</H5>' + '<h6>' + this.props.content.double_image_caption_subheader_top_right + '</h6>' + this.props.content.double_image_caption_text_top_right + '</div>';
	 		return caption
		}
	}

	getDoubleBottomRightCaptions() {
		if (this.props.content.double_image_caption_bottom_right) {
			var caption = '<div>' + '<h5>Lower right</H5>' + '<h6>' + this.props.content.double_image_caption_subheader_bottom_right + '</h6>' + this.props.content.double_image_caption_text_bottom_right + '</div>';
	 		return caption
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
				if (this.props.content.single_image_caption_right) {
					return (
						<div>
						<img src={this.getRightImageSrc()} />
							<div className="captions-right" dangerouslySetInnerHTML={{__html: this.getSingleRightCaptions()}}></div>
						</div>
					);
				} else {
					return (
						<div>
							<img src={this.getRightImageSrc()} />
						</div>
					);
				}
			} else if (this.props.content.right_content_image == 'double') {
				if (this.props.content.double_image_caption_top_right || this.props.content.double_image_caption_bottom_right) {
					return (
						<div>
							<div className={this.props.content.double_image_size_top_right}>
								<div>
									<img src={this.getTopRightImageSrc()} />
									<div className="captions-right" dangerouslySetInnerHTML={{__html: this.getDoubleTopRightCaptions()}}></div>
								</div>
							</div>
							<div className={this.props.content.double_image_size_bottom_right}>
								<div>
									<img src={this.getBottomRightImageSrc()} />
									<div className="captions-right" dangerouslySetInnerHTML={{__html: this.getDoubleBottomRightCaptions()}}></div>
								</div>
							</div>
						</div>
					);
				} else {
					return (
						<div>
							<div className={this.props.content.double_image_size_top_right}>
								<div>
									<img src={this.getTopRightImageSrc()} />
								</div>
							</div>
							<div className={this.props.content.double_image_size_bottom_right}>
								<div>
									<img src={this.getBottomRightImageSrc()} />
								</div>
							</div>
						</div>
					);
				}
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
