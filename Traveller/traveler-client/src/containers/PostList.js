import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from "../store/actions/posts";
import PostItem from '../components/PostItem';
import { getPostAction } from "../store/actions/posts";

class PostList extends Component{
    componentDidMount(){
            const postsPath = '/api/posts';
            const ownPostsPath = `/api/users/${this.props.currentUser.user.id}/posts`;
            const path = this.props.postsOwner ? ownPostsPath : postsPath;
            this.props.fetchPosts(path);
    }
    render(){
        const posts = this.props.posts.map((post)=>{
            return <PostItem getPostAction={this.props.getPostAction}
                             post={post}
                             history={this.props.history}
                             postId={post._id}
                             userId={post.user._id}
                             key={post._id}
                             imageUrl={post.postImageUrl[0]}
                             postName={post.postName}
                             createdAt={post.createdAt}
                             description={post.description}
                    />
        });

        return(
            <section className="stories">
                <h4 className="secondary-heading u-text-center u-margin-bottom-large">select your next story</h4>
                    {posts}
            </section>
        )
    }
}
function mapStateToProps(state) {
    return{
        currentUser: state.currentUser,
        posts: state.posts
    }
}
export default connect(mapStateToProps, {fetchPosts, getPostAction})(PostList);

