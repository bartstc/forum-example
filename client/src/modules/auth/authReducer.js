import isEmpty from '../../utils/isEmpty';

import { SET_CURRENT_USER } from './authTypes';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(payload),
        user: payload
      };
    default:
      return state;
  };
};