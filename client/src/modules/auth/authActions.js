import axios from 'axios';
import setToken from '../../utils/setToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS } from '../error/errorTypes';
import { SET_CURRENT_USER } from './authTypes';

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/users/signup', userData)
    .then(() => history.push('/signin'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post('/users/signin', userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

// Delete account
export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    axios.delete('/users/delete')
      .then(res => dispatch({
        type: SET_CURRENT_USER, // log out after sending empty object
        payload: {}
      }))
      .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }))
  };
};