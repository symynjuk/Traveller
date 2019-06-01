import { combineReducers } from 'redux';
import errors from './errors';
import currentUser from './currentUser';
import posts from './posts';
import comments from './comments';

const rootReducer = combineReducers({
    errors,
    currentUser,
    posts,
    comments
});

export default rootReducer;