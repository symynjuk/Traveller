import { GET_COMMENTS, ADD_COMMENT, REMOVE_COMMENT } from "../actionTypes";
import { apiCall } from "../../services/api";

export const getComments = comments => {
    return {
        type: GET_COMMENTS,
        comments
    }
};
export const addComment = comment => {
    return{
        type: ADD_COMMENT,
        comment
    }
};
export const removeComment = comment => {
    return{
        type: REMOVE_COMMENT,
        comment
    }
};
export const removeCommentAction = (path) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall('delete', path).then(res => {
                dispatch(removeComment(res));
                resolve();
            }).catch(err => {
                reject(err.message)
            })
        })
    }
};
export const addCommentAction = (path, data) =>{
    return dispatch => {
        return new Promise((resolve, reject)=>{
            return apiCall('post', path, data).then(res => {
                dispatch(addComment(res));
                resolve();
            }).catch(err => {
                reject(err.message)
            })
        })
    }
};
export const fetchComments = (path) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall('get', path).then(res => {
                dispatch(getComments(res));
                resolve();
            }).catch(err =>{
                reject(err.message)
            })
        })
    }
};
