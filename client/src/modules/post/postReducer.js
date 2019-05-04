import * as types from './postTypes';

const initialState = {
  posts: [],
  post: {},
  loading: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case types.GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };

    case types.GET_POST:
      return {
        ...state,
        post: payload,
        loading: false
      };

    case types.ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts]
      };

    case types.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload)
      };

    default:
      return state;
  }
};