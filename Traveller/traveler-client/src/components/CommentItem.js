import React from 'react';
import Moment from "react-moment";

const CommentItem = ({comment, removeCommentAction, currentUser}) => {
   function onClickDeleteHandler (event){
        event.preventDefault();
        const path = `/api/users/${comment.user._id}/posts/${comment.post}/comments/${comment._id}`;
        removeCommentAction(path);
    };
    function onClickEditHandler(event){
        event.preventDefault();
        alert("Sory this function is not ready yet :(")
    }
    return(
        <div className="comment">
            <div className="comment__profile-image">
                <img className="comment__profile-image" src={comment.user.profileImageUrl || '/images/default-avatar.jpg'} alt=""/>
            </div>
            <div className="comment__content">
                <div className="comment__header">
                    <h3 className="comment__header__username">{comment.user.username}</h3>
                    <Moment format="Do MMM YYYY" className="comment__header__date">{comment.createdAt}</Moment>
                </div>
                <div className="comment__text">
                    <p className="paragraph">{comment.text}</p>
                </div>
                {comment.user._id === currentUser.user.id &&
                <div className="comment__buttons">
                    <a className="btn-text btn-text-small" onClick={onClickDeleteHandler} href="#">Delete</a>
                    <a className="btn-text btn-text-small" href="#" onClick={onClickEditHandler}>Edit</a>
                </div>
                }
            </div>
        </div>
    )
};
export default CommentItem;