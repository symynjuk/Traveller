import { GET_POSTS, ADD_POST, GET_POST, REMOVE_POST, EDIT_POST } from "../actionTypes";

export default (state=[], action) => {
    switch (action.type) {
        case GET_POST:
            return [action.post]
        case GET_POSTS:
            return [...action.posts];
        case ADD_POST:
            return [...state, action.post];
        case REMOVE_POST:
            return [...state.filter(post => post._id !== action.post._id)];
        case EDIT_POST:
            return [...state.filter(post => post._id !== action.post._id), action.post];
        default:
            return state;
    }
}
//...state.filter(post=>post._id === action.post._id)