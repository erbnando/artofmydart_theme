import React, {Component} from 'react';
import Title from './title';

export default class Article extends Component {
    static get defaultProps() {
        return {
            title: "Hello, world!",
            content: "Welcome to WordPress. This is your first post. Edit or delete it, then start writing!"
        }
    }

    getFeaturedImageSrc() {
        if (this.props.featuredImage) {
            return this.props.isSingle ? this.props.featuredImage.large : this.props.featuredImage.full;
        } else {
            return '';
        }
    }

    render() {
        return (
            <div className='post'>
                <div>
                    <Title link={this.props.link} isSingle={this.props.isSingle}>
                        {this.props.title}
                    </Title>
                    <p className="author">
                        {this.props.author}
                    </p>
                    <p className="date">
                        {this.props.date}
                    </p>
                </div>
            </div>
        );
    }
}