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
		//console.log(this.props);
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
		//console.log(this.props.content.small_double_image_top_left.sizes.double_small);
		if (this.props.content.double_image_size_top_left == "small") {
			return this.props.content.small_double_image_top_left.sizes.doublesmall
		}
		else if (this.props.content.double_image_size_top_left == "medium") {
			return this.props.content.medium_double_image_top_left.sizes.doublemedium
		}
		else if (this.props.content.double_image_size_top_left == "full") {
			return this.props.content.full_double_image_top_left.sizes.doublefull
		}
	}

	getBottomLeftImageSrc() {
		//console.log(this.props);
		if (this.props.content.double_image_size_bottom_left == "small") {
			return this.props.content.small_double_image_bottom_left.sizes.doublesmall
		}
		else if (this.props.content.double_image_size_bottom_left == "medium") {
			return this.props.content.medium_double_image_bottom_left.sizes.doublemedium
		}
		else if (this.props.content.double_image_size_bottom_left == "full") {
			return this.props.content.full_double_image_bottom_left.sizes.doublefull
		}
	}

	getContent() {
		if (this.props.content.left_content == 'text') {
			return (
				<div dangerouslySetInnerHTML={{__html: this.props.content.text_content_left}} />
			);
		} else if (this.props.content.left_content == 'single') {
			return (
				<div>
					<img src={this.getLeftImageSrc()} />
				</div>
			);
		} else if (this.props.content.left_content == 'double') {
			return (
				<div>
					<div className={this.props.content.double_image_size_top_left}>
						<div>
							<img src={this.getTopLeftImageSrc()} />
						</div>
					</div>
					<div className={this.props.content.double_image_size_bottom_left}>
						<div>
							<img src={this.getBottomLeftImageSrc()} />
						</div>
					</div>
				</div>
			);
		} else if (this.props.content.left_content == 'quote') {
			return (
				<div>
					<div className="quote-text" dangerouslySetInnerHTML={{__html: this.props.content.quote_text_left}} />					
					<span className="quote-author" dangerouslySetInnerHTML={{__html: this.props.content.quote_author_left}} />,
					<span>&nbsp;</span>
					<span className="quote-source" dangerouslySetInnerHTML={{__html: this.props.content.quote_source_left}} />
				</div>
			);
		}
	}

	getClasses() {
		if (this.props.content.left_content == 'single') {
			return ' content-image'
		} else {
			return ''
		}
	}

	getPosition() {
		if (this.props.content.left_content == 'single') {
			if (this.props.content.left_image_placement == "top") {
				return ' top'
			} else if (this.props.content.left_image_placement == "bottom") {
				return ' bottom'
			} else if (this.props.content.left_image_placement == "left") {
				return ' left'
			} else if (this.props.content.left_image_placement == "right") {
				return ' right'
			} else if (this.props.content.left_image_placement == "topleft") {
				return ' top-left'
			} else if (this.props.content.left_image_placement == "topright") {
				return ' top-right'
			} else if (this.props.content.left_image_placement == "bottomleft") {
				return ' bottom-left'
			} else if (this.props.content.left_image_placement == "bottomright") {
				return ' bottom-right'
			} else if (this.props.content.left_image_placement == "center") {
				return ''
			}
		} else {
			return ''
		}
	}

	render() {
		//console.log(this.props.content);
		return (
			<div className={"book-grid-two" + this.getPosition() + ' ' + this.props.content.left_content}>
				<div className={"content-left" + this.getClasses() + ' ' + this.props.content.single_image_size_left}>
					{this.getContent()}
				</div>
			</div>
		);
	}
}

module.exports = ContentLeft;
