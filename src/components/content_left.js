import React, {Component} from 'react';

class ContentLeft extends Component {
    componentWillMount() {
    }

	componentDidMount() {
	}

	componentDidUpdate() {
	}

	componentWillReceiveProps() {
	}

	getLeftImageSrc() {
		if (this.props.content.single_image_size_left == "small") {
			return this.props.content.small_single_image_left.sizes.small
		}
		else if (this.props.content.single_image_size_left == "medium") {
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
		if (this.props.content.left_content_image == 'single') {
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
			return ''
		}
	}

	getSingleLeftCaptions() {
		if (this.props.content.single_image_caption_left) {
			if (this.props.content.single_image_caption_subheader_left) {
				var title = '<h6>' + this.props.content.single_image_caption_subheader_left + '</h6>';
			} else {
				var title = '';
			}
 			var caption = '<div>' + '<h5>Left</H5>' + title + this.props.content.single_image_caption_text_left + '</div>';
	 		return caption
		} 
	}

	getDoubleTopLeftCaptions() {
		if (this.props.content.double_image_caption_top_left) {
			if (this.props.content.double_image_caption_subheader_top_left) {
				var title = '<h6>' + this.props.content.double_image_caption_subheader_top_left + '</h6>';
			} else {
				var title = '';
			}
			var caption = '<div>' + '<h5>Upper Left</H5>' + title + this.props.content.double_image_caption_text_top_left + '</div>';
	 		return caption
		}
	}

	getDoubleBottomLeftCaptions() {
		if (this.props.content.double_image_caption_bottom_left) {
			if (this.props.content.double_image_caption_subheader_bottom_left) {
				var title = '<h6>' + this.props.content.double_image_caption_subheader_bottom_left + '</h6>';
			} else {
				var title = '';
			}
			var caption = '<div>' + '<h5>Lower Left</H5>' + title + this.props.content.double_image_caption_text_bottom_left + '</div>';
	 		return caption
		}
	}

	getFullSizedCaptions() {
		if (this.props.content.full_sized_image_caption) {
			if (this.props.content.full_sized_image_caption_subheader) {
				var title = '<h6>' + this.props.content.full_sized_image_caption_subheader + '</h6>';
			} else {
				var title = '';
			}
			var caption = '<div>' + title + this.props.content.full_sized_image_caption_text + '</div>';
	 		return caption
		}
	}

/*
	showCaption(caption) {
		var captionsLeft = document.getElementsByClassName("captions-left");
		for(var i = 0; i < captionsLeft.length; i++) {
		    if(captionsLeft[i].style.opacity == "1") {
			    captionsLeft[i].style.opacity = "0";
				captionsLeft[i].style.zIndex = "0";
		    }
		}
		var captionsRight = document.getElementsByClassName("captions-right");
		for(var i = 0; i < captionsRight.length; i++) {
		    if(captionsRight[i].style.opacity == "1") {
			    captionsRight[i].style.opacity = "0";
				captionsLeft[i].style.zIndex = "0";
		    }
		}
		if (document.getElementById(caption)) {
			document.getElementById(caption).style.opacity = "1";
			document.getElementById(caption).style.zIndex = "1";
		}
	}
*/

	getContent() {
		if (this.props.content.page_type == 'text') {
			if (this.props.content.left_content_text == 'text') {
				return (
					<div dangerouslySetInnerHTML={{__html: this.props.content.text_content_left}} />
				);
			} else if (this.props.content.left_content_text == 'quote') {
				return (
					<div>
						<div className="quote-text" dangerouslySetInnerHTML={{__html: this.props.content.quote_text_left}} />					
						<span className="quote-author" dangerouslySetInnerHTML={{__html: this.props.content.quote_author_left}} />,
						<span>&nbsp;</span>
						<span className="quote-source" dangerouslySetInnerHTML={{__html: this.props.content.quote_source_left}} />
					</div>
				);
			}
		} else if (this.props.content.page_type == 'images') {
			if (this.props.content.left_content_image == 'single') {
				if (this.props.content.single_image_caption_left) {
					return (
						<div>
							<img 
							src={this.getLeftImageSrc()}
							//onMouseEnter={() => this.showCaption('captions-left-single')}
							/>
							<div id='captions-left-single' className="captions-left" dangerouslySetInnerHTML={{__html: this.getSingleLeftCaptions()}}></div>
						</div>
					);
				} else {
					return (
						<div>
							<img 
							src={this.getLeftImageSrc()}
							//onMouseEnter={() => this.showCaption('captions-left-single')}
							/>
						</div>
					);
				}
			} else if (this.props.content.left_content_image == 'double') {
				if (this.props.content.double_image_caption_top_left || this.props.content.double_image_caption_bottom_left) {
					return (
						<div>
							<div className={this.props.content.double_image_size_top_left}>
								<div>
									<img 
									src={this.getTopLeftImageSrc()}
									//onMouseEnter={() => this.showCaption('captions-left-double-top')}
									/>
									<div id='captions-left-double-top' className="captions-left" dangerouslySetInnerHTML={{__html: this.getDoubleTopLeftCaptions()}}></div>
								</div>
							</div>
							<div className={this.props.content.double_image_size_bottom_left}>
								<div>
									<img
									src={this.getBottomLeftImageSrc()}
									//onMouseEnter={() => this.showCaption('captions-left-double-bottom')}
									/>
									<div id='captions-left-double-bottom' className="captions-left" dangerouslySetInnerHTML={{__html: this.getDoubleBottomLeftCaptions()}}></div>
								</div>
							</div>
						</div>
					);
				} else {
					return (
						<div>
							<div className={this.props.content.double_image_size_top_left}>
								<div>
									<img 
									src={this.getTopLeftImageSrc()}
									//onMouseEnter={() => this.showCaption('captions-left-double-top')}
									/>
								</div>
							</div>
							<div className={this.props.content.double_image_size_bottom_left}>
								<div>
									<img
									src={this.getBottomLeftImageSrc()}
									//onMouseEnter={() => this.showCaption('captions-left-double-bottom')}
									/>
								</div>
							</div>
						</div>
					);
				}
			}
		} else if (this.props.content.page_type == 'spread') {
			if (this.props.content.full_sized_image_caption) {
				return (
					<div>
						<img
						src={this.props.content.full_sized_image.sizes.fullsize}
						//onMouseEnter={() => this.showCaption('captions-full-image')}
						/>
						<div id='captions-full-image' className={'captions-' + this.props.content.full_sized_image_caption_position} dangerouslySetInnerHTML={{__html: this.getFullSizedCaptions()}}></div>
					</div>
				);
			} else {
				return (
					<div>
						<img
						src={this.props.content.full_sized_image.sizes.fullsize}
						//onMouseEnter={() => this.showCaption('captions-full-image')}
						/>
					</div>
				);
			}
		}
	}

	getPageType() {
		if (this.props.content.page_type == 'text') {
			if (this.props.content.left_content_text == 'text') {
				return 'text'
			} else if (this.props.content.left_content_text == 'quote') {
				return 'quote'
			} else if (this.props.content.left_content_text == 'blank') {
				return 'blank'
			}
		} else if (this.props.content.page_type == 'images') {
			if (this.props.content.left_content_image == 'single') {
				return 'single'
			} else if (this.props.content.left_content_image == 'double') {
				return 'double'
			} else if (this.props.content.left_content_image == 'blank') {
				return 'blank'
			}
		} else if (this.props.content.page_type == 'spread') {
			return 'fullimage'
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
