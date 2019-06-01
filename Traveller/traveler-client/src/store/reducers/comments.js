import { GET_COMMENTS, ADD_COMMENT, REMOVE_COMMENT } from "../actionTypes";

export default (state=[], action) => {
    switch (action.type) {
        case GET_COMMENTS:
            return [...action.comments];
        case ADD_COMMENT:
            return[...state, action.comment];
        case REMOVE_COMMENT:
            return [...state.filter(comment=>comment._id !== action.comment._id)]
        default:
            return state;
    }
}