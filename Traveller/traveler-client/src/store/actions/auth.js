import { SET_CURRENT_USER } from "../actionTypes";
import { apiCall } from '../../services/api';
import { addError, removeError } from "./errors";
import { setTokenHeader } from "../../services/api";

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    }
}

export function setAuthToken(token){
    setTokenHeader(token)
}

export function logOut(){
    return dispatch => {
        localStorage.clear();
        setAuthToken(false);
        dispatch(setCurrentUser({}));
    }
}

export function authUser(type, data){
    return dispatch =>{
        return new Promise((resolve, reject)=>{
            return apiCall('post', `/api/auth/${type}`, data).then(({token, ...user}) =>{
                localStorage.setItem('jwtToken', token);
                setAuthToken(token);
                dispatch(setCurrentUser(user));
                dispatch(removeError());
                resolve();
            }).catch(err =>{
                dispatch(addError(err.message));
                reject(err);
            })
        })
    }
}