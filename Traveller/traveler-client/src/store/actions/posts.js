import {apiCall} from "../../services/api";
import {GET_POSTS, ADD_POST, GET_POST, REMOVE_POST, EDIT_POST} from "../actionTypes";
import { addError } from "./errors";

export const getPosts = posts => {
    return {
        type: GET_POSTS,
        posts
    }
};
export const addPost = post => {
    return {
        type: ADD_POST,
        post
    }
};
export const getPost = post => {
    return{
        type: GET_POST,
        post
    }
};
export const removePost = post => {
    return {
        type: REMOVE_POST,
        post
    }
};
export const editPost = post => {
    return {
        type: EDIT_POST,
        post
    }
};
export const editPostAction = (path, data) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall('put', path, data).then(res =>{
                dispatch(editPost(res));
                resolve();
            }).catch(err => {
                dispatch(addError(err.message));
                reject();
            })
        })
    }
};
export const removePostAction = (path) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall('delete', path).then(res=>{
                dispatch(removePost(res));
                resolve()
            }).catch(err => {
                dispatch(addError(err.message));
                reject()
            })
        })
    }
};

export const getPostAction = path => {
    return dispatch => {
        return new Promise((resolve, reject) =>{
            return apiCall('get', path).then(res => {
                dispatch(getPost(res));
                resolve()
            }).catch(err => {
                addError(err.message);
                reject()
            })
        })
    }
};
export const addPostAction = (path, data) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall('post', path, data).then(res =>{
                dispatch(addPost(res));
                resolve()
            }).catch(err => {
                dispatch(addError(err.message));
                reject()
            })
        })
    }
};

export const fetchPosts = (path) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall('get',path).then(res => {
                dispatch(getPosts(res));
                resolve();
            }).catch(err =>{
                console.log('this from post action ', err)
                dispatch(addError(err));
                reject();
            })
        })
    }
};