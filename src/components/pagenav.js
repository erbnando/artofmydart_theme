import React, {Component} from 'react';
import { Link } from 'react-router-dom'

export default class PageNav extends Component {

    getPrevPage() {
        if (parseInt(this.props.pageNum) > 2) {
            return `/page/${parseInt(this.props.pageNum) - 1}`;
        } else {
            return `/`;
        }

    }

    getNextPage() {
        return `/${this.getArchiveType()}${this.getArchiveSlug()}/${parseInt(this.props.pageNum) + 1}`;
    }

    getArchiveType() {
        return 'page';
    }

    getArchiveSlug() {
        return "" !== this.props.slug ? `/${this.props.slug}` : '';
    }

    render() {
        //console.log(this);

        if (!this.props.shouldRender) {
            return <span />;
        }

        /*
        var previousButton = '';
        if (1 < this.props.pageNum) {
            previousButton = <Link to={this.getPrevPage()} className="nav-link">Previous</Link>;
        }
        */

        var nextButton = '';
        //if (((4 + (this.props.pageNum - 1)*8) || 1) <= this.props.total) {
        nextButton = <Link to={this.getNextPage()} className="nav-link more">More</Link>;
        //}

        return (
            <div className="nav">
                <div className="nav-item">
                    {nextButton}
                </div>
            </div>
        );
    }
}
