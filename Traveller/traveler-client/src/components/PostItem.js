import React from 'react';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';

const PostItem = ({postName, imageUrl, description, userId, getPostAction, post, history, createdAt}) => {
    const onClickHandler = event =>{
        event.preventDefault();
        getPostAction(`/api/users/${userId}/posts/${post._id}`);
        history.push(`/users/${userId}/posts/${post._id}`);
    };
    return(
        <div className="story">
            <div className="story__image">
                <img className="story__image-item" src={imageUrl} alt={postName}/>
            </div>

            <div className="story__info">
                <h4 className="secondary-heading u-margin-bottom-medium">{postName.substring(0, 40)}...</h4>
                <p className="story__info__description u-margin-bottom-medium paragraph">{description.substring(0, 50)}...</p>
                <Link className="btn-text" onClick={onClickHandler} to={`/users/${userId}/posts/${post._id}`}>read more &rarr;</Link>
                <Moment format="Do MMM YYYY" className="story__createdAt">{createdAt}</Moment>
            </div>

        </div>
    )
};
export default PostItem;