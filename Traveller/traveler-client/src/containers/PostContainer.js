import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostPage from '../components/PostPage'
import CommentList from '../components/CommentList';
import { getPostAction, removePostAction } from "../store/actions/posts";
import { fetchComments, addCommentAction, removeCommentAction } from "../store/actions/comments";

class PostContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoaded : true,
            text: '',
            isLoadedPost: true,
            stopFetch: true
        }
    }
    componentDidMount(){
        const path = `/api${window.location.pathname}`;
        this.props.getPostAction(path);
        const commentsPath = `/api${window.location.pathname}/comments`;
        this.props.fetchComments(commentsPath);
    }
    componentWillUpdate(){
        if( this.state.stopFetch && this.props.posts.length>0){
            this.setState({isLoadedPost: false, stopFetch: false})
        }
    }
    onSubmitHandler = event =>{
        event.preventDefault();
        const path = `/api/users/${this.props.currentUser.user.id}/posts/${this.props.posts[0]._id}/comments`;
        const data = this.state.text;
        this.props.addCommentAction(path, {text: data});
        this.setState({text: '', showCommentForm: false})

    };
    onChangeHandler = event => {
        event.preventDefault();
        this.setState({text: event.target.value})
    };
    render() {
        const {posts, currentUser, history, comments} = this.props;
        if (this.state.isLoadedPost) {
            return (
                <div>
                    Loading
                </div>
            )
        } else {
            return (
                <div className="story-page">
                    <PostPage posts={posts}
                              currentUser={currentUser}
                              removePostAction={this.props.removePostAction}
                              history={history}
                    />
                    <div className="comments-section">
                        {currentUser.isAuthenticated &&
                            <div className="comment-input">
                                <img className="comment-input__profile-image"
                                     src={currentUser.user.profileImageUrl || "/images/default-avatar.jpg"}
                                     alt={currentUser.user.profileImageUrl}
                                />
                                <form onSubmit={this.onSubmitHandler} className="comment-input__form">
                                    <textarea className="comment-input__form-area"
                                              onChange={this.onChangeHandler}
                                              value={this.state.text}
                                              placeholder="Write your comment"
                                    />
                                    <button className="btn-text btn-text-small">Submit</button>
                                </form>
                            </div>
                    }
                            <CommentList comments={comments}
                                         currentUser={currentUser}
                                         removeCommentAction={this.props.removeCommentAction}
                             />

                    </div>
                </div>
            )
        }
    }
}
function mapStateToProps(state) {
    return{
        currentUser: state.currentUser,
        posts: state.posts,
        comments: state.comments
    }
}

export default connect(mapStateToProps, {getPostAction, fetchComments, addCommentAction, removeCommentAction, removePostAction})(PostContainer)