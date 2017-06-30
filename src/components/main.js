import React, {Component} from 'react';
import Article from './article';

export default class Main extends Component {
    componentWillUpdate() {
        //window.scrollTo(0, 0);
    }

    isSingle() {
        return 1 === this.props.posts.length;
    }

    getContentOrExcerpt(post) {
        return this.isSingle() ? post.content.rendered : post.excerpt.rendered;
    }

    getCategories(cat_ids) {
        if ('undefined' !== typeof cat_ids) {
            return cat_ids.map(cat_id => {
                return RT_API['categories'].filter(cat => {
                    return cat.term_id === cat_id
                })[0];
            });
        }
    }

    renderPosts(posts) {
        return posts.items.map(post => {
            return <Article key={post.id}
                            type={post.type}
                            pId={post.id}
                            title={post.title.rendered}
                            author={post.acf.author}
                            date={post.acf.date}
                            content={this.getContentOrExcerpt(post)}
                            formattedDate={post.formatted_date}
                            link={post.link}
                            isSingle={this.isSingle()}
                            featuredImage={post.better_featured_image}
                            categories={this.getCategories(post.categories)}
                            commentStatus={post.comment_status}
                            tags={post.tags || []}/>;
        });
    }

    render() {
        //console.log(this.props);
        return (
            <div>
                <main className="posts">
                    {this.renderPosts(this.props.posts)}
                </main>
            </div>
        );
    }
}