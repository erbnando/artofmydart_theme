import React, {Component} from 'react';

class ContentLeft extends Component {
	getLeftImageSrc() {
		if (this.props.content.single_image_size_left == "medium") {
			return this.props.content.medium_single_image_left.sizes.medium
		}
		else if (this.props.content.single_image_size_left == "large") {
			return this.props.content.large_single_image_left.sizes.large
		}
		else if (this.props.content.single_image_size_left == "full") {
			return this.props.content.full_single_image_left.sizes.full
		}
	}

	getTopLeftImageSrc() {
		if (this.props.content.double_image_size_top_left == "medium") {
			return this.props.content.medium_double_image_top_left.sizes.doublemedium
		}
		else if (this.props.content.double_image_size_top_left == "full") {
			return this.props.content.full_double_image_top_left.sizes.doublefull
		}
	}

	getBottomLeftImageSrc() {
		//console.log(this.props);
		if (this.props.content.double_image_size_bottom_left == "medium") {
			return this.props.content.medium_double_image_bottom_left.sizes.doublemedium
		}
		else if (this.props.content.double_image_size_bottom_left == "full") {
			return this.props.content.full_double_image_bottom_left.sizes.doublefull
		}
	}

	getPosition() {
		if (this.props.content.page_type == 'textimages') {
			if (this.props.content.left_content == 'single') {
				if (this.props.content.left_image_placement == "top") {
					return 'top '
				} else if (this.props.content.left_image_placement == "bottom") {
					return 'bottom '
				} else if (this.props.content.left_image_placement == "left") {
					return 'left '
				} else if (this.props.content.left_image_placement == "right") {
					return 'right '
				} else if (this.props.content.left_image_placement == "topleft") {
					return 'top-left '
				} else if (this.props.content.left_image_placement == "topright") {
					return 'top-right '
				} else if (this.props.content.left_image_placement == "bottomleft") {
					return 'bottom-left '
				} else if (this.props.content.left_image_placement == "bottomright") {
					return 'bottom-right '
				} else if (this.props.content.left_image_placement == "center") {
					return 'center '
				}
			} else {
				return ' '
			}
		} else {
			return ' '
		} 
	}

	getSingleLeftCaptions() {
		var size = this.props.content.single_image_size_left + '_single_image_left';
		if (this.props.content[size]) {
			if (this.props.content[size].title || this.props.content[size].caption) {
				if (this.props.content[size].title) {
					var title = '<h6>' + this.props.content[size].title + '</h6>';
				} else {
					var title = '';
				}
				return '<div>' + '<h5>Left</H5>' + title + '<p>' + this.props.content[size].caption + '</p>' + '</div>';
			}
		}
	}

	getDoubleTopLeftCaptions() {
		var size = this.props.content.double_image_size_top_left + '_double_image_top_left';
		if (this.props.content[size]) {
			if (this.props.content[size].title || this.props.content[size].caption) {
				if (this.props.content[size].title) {
					var title = '<h6>' + this.props.content[size].title + '</h6>';
				} else {
					var title = '';
				}
				return '<div>' + '<h5>Upper Left</H5>' + title + '<p>' + this.props.content[size].caption + '</p>' + '</div>';
		 	}
		 }
	}

	getDoubleBottomLeftCaptions() {
		var size = this.props.content.double_image_size_top_left + '_double_image_bottom_left';
		if (this.props.content[size]) {
			if (this.props.content[size].title || this.props.content[size].caption) {
				if (this.props.content[size].title) {
					var title = '<h6>' + this.props.content[size].title + '</h6>';
				} else {
					var title = '';
				}
				return '<div>' + '<h5>Lower Left</H5>' + title + '<p>' + this.props.content[size].caption + '</p>' + '</div>';
		 	}
		 }
	}

	getFullSizedCaptions() {
		if (this.props.content.double_spread_full_sized_image.title || this.props.content.double_spread_full_sized_image.caption) {
			if (this.props.content.double_spread_full_sized_image.title) {
				var title = '<h6>' + this.props.content.double_spread_full_sized_image.title + '</h6>';
			} else {
				var title = '';
			}
			var caption = '<div>' + title + '<p>' + this.props.content.double_spread_full_sized_image.caption + '</p>' + '</div>';
	 		return caption
		}
	}

	getContent() {
		if (this.props.content.page_type == 'textimages') {
			if (this.props.content.left_content == 'text') {
				return (
					<div>
						<div dangerouslySetInnerHTML={{__html: this.props.content.text_content_left}} />
					</div>
				);
			} else if (this.props.content.left_content == 'quote') {
				return (
					<div>
						<div className="quote-text" dangerouslySetInnerHTML={{__html: this.props.content.quote_text_left}} />					
						<div className="quote-source" dangerouslySetInnerHTML={{__html: this.props.content.quote_source_left}} />
					</div>
				);
			} else if (this.props.content.left_content == 'single') {
				return (
					<div>
						<img 
						src={this.getLeftImageSrc()}
						/>
						<div id='captions-left-single' className="captions-left" dangerouslySetInnerHTML={{__html: this.getSingleLeftCaptions()}}></div>
					</div>
				);
			} else if (this.props.content.left_content == 'double') {
				return (
					<div>
						<div className={this.props.content.double_image_size_top_left}>
							<div>
								<img 
								src={this.getTopLeftImageSrc()}
								/>
								<div id='captions-left-double-top' className="captions-left" dangerouslySetInnerHTML={{__html: this.getDoubleTopLeftCaptions()}}></div>
							</div>
						</div>
						<div className={this.props.content.double_image_size_bottom_left}>
							<div>
								<img
								src={this.getBottomLeftImageSrc()}
								/>
								<div id='captions-left-double-bottom' className="captions-left" dangerouslySetInnerHTML={{__html: this.getDoubleBottomLeftCaptions()}}></div>
							</div>
						</div>
					</div>
				);
			}
		} else if (this.props.content.page_type == 'spread') {
			//console.log(this.props.content);
			if (this.props.content.double_spread_image_size == 'full' && this.props.content.double_spread_full_sized_image.sizes.fullsize) {
				return (
					<div>
						<img
						src={this.props.content.double_spread_full_sized_image.sizes.fullsize}
						/>
						<div id='captions-full-image' className={'captions-' + this.props.content.full_sized_image_caption_position} dangerouslySetInnerHTML={{__html: this.getFullSizedCaptions()}}></div>
					</div>
				);
			} else if (this.props.content.double_spread_image_size == 'large' && this.props.content.double_spread_large_image.sizes.largespread) {
				return (
					<div>
						<img
						src={this.props.content.double_spread_large_image.sizes.largespread}
						/>
						<div id='captions-full-image' className={'captions-' + this.props.content.full_sized_image_caption_position} dangerouslySetInnerHTML={{__html: this.getFullSizedCaptions()}}></div>
					</div>
				);
			}
		}
	}

	getPageType() {
		if (this.props.content.page_type == 'textimages') {
			if (this.props.content.left_content == 'text') {
				return 'text'
			} else if (this.props.content.left_content == 'quote') {
				return 'quote'
			} else if (this.props.content.left_content == 'single') {
				return 'single'
			} else if (this.props.content.left_content == 'double') {
				return 'double'
			} else if (this.props.content.left_content == 'blank') {
				return 'blank'
			}
		} else if (this.props.content.page_type == 'spread') {
			if (this.props.content.double_spread_image_size == 'full') {
				return 'fullimage'
			} else if (this.props.content.double_spread_image_size == 'large') {
				return 'largespread'
			}
		}
	}

	render() {
		//console.log(this.props.content);
		return (
			<div className={"book-grid-two " + this.getPosition() + this.getPageType()}>
				<div className={"content-left " + this.props.content.single_image_size_left}>
					{this.getContent()}
				</div>
			</div>
		);
	}
}

module.exports = ContentLeft;
