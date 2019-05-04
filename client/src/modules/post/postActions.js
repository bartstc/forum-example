import axios from 'axios';
import * as types from './postTypes';
import { GET_ERRORS, CLEAR_ERRORS } from '../error/errorTypes';

// Add Post
export const addPost = postData => dispatch => {
  dispatch(clearErrors());
  axios.post('/posts', postData)
    .then(res => dispatch({
      type: types.ADD_POST,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

// Get Posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios.get('/posts')
    .then(res => dispatch({
      type: types.GET_POSTS,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: types.GET_POSTS,
      payload: null
    }));
};

// Get Post
export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios.get(`/posts/${id}`)
    .then(res => dispatch({
      type: types.GET_POST,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: types.GET_POSTS,
      payload: null
    }));
};

// Delete Post
export const deletePost = id => dispatch => {
  axios.delete(`/posts/${id}`)
    .then(res => dispatch({
      type: types.DELETE_POST,
      payload: id
    }))
    .catch(err => dispatch({
      type: GET_ERRORS, // we return geterrors when we submit any form
      payload: err.response.data
    }));
};

// Add Comment
export const addComment = (postId, commentData) => dispatch => {
  dispatch(clearErrors());
  axios.put(`/posts/comment/${postId}`, commentData)
    .then(res => dispatch({
      type: types.GET_POST, // update post
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS, // we return geterrors when we submit any form
      payload: err.response.data
    }));
};

// Delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
  axios.delete(`/posts/comment/${postId}/${commentId}`)
    .then(res => dispatch({
      type: types.GET_POST, // update post
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS, // we return geterrors when we submit any form
      payload: err.response.data
    }));
};

// Set loading state
export const setPostLoading = () => {
  return {
    type: types.POST_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};