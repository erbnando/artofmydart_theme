import React, {Component} from 'react';
import { Link } from 'react-router-dom'

export default class Title extends Component {
    extractPath(link) {
        const url = document.createElement('a');
        url.href = link;

        return link.replace(`${url.protocol}//${url.host}`, '');
    }

    render() {
        return (
            <Link to={this.extractPath(this.props.link)}>
            <h3 dangerouslySetInnerHTML={ {__html: this.props.children} }/>
            </Link>
        );
    }
}