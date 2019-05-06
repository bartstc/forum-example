import authReducer from './authReducer';
import { SET_CURRENT_USER } from './authTypes';

describe('Auth Reducer', () => {

  const initialState = {
    isAuthenticated: false,
    user: {}
  };

  it('should return initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it('handles action of type SET_CURRENT_USER', () => {
    const action = {
      type: SET_CURRENT_USER,
      payload: {
        id: '5ccc31787fa9ed09c0d0ea4f',
        nickname: 'JohnDoe',
        iat: 1557141893,
        exp: 1557145493
      }
    };

    const expectedState = {
      isAuthenticated: true,
      user: {
        id: '5ccc31787fa9ed09c0d0ea4f',
        nickname: 'JohnDoe',
        iat: 1557141893,
        exp: 1557145493
      }
    };

    const newState = authReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

});