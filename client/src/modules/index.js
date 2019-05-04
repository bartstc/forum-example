import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import errorReducer from './error/errorReducer';
import postReducer from './post/postReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  post: postReducer
});