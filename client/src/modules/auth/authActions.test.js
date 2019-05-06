import * as actions from './authActions';
import { SET_CURRENT_USER } from './authTypes';
import configureMockStore from 'redux-mock-store'; // allows to create fake store
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);
const store = mockStore();

describe('Auth Actions', () => {

  beforeEach(() => {
    store.clearActions();
  });

  it('should create an action to set current user', () => {
    const payload = {
      id: '5ccc31787fa9ed09c0d0ea4f',
      nickname: 'JohnDoe',
      iat: 1557141893,
      exp: 1557145493
    };

    const expectedAction = {
      type: SET_CURRENT_USER,
      payload
    };

    expect(actions.setCurrentUser(payload)).toEqual(expectedAction);
  });

  it('handle loginout request', () => {
    store.dispatch(actions.logoutUser());
    const action = store.getActions();
    // console.log('action', action);

    const expectedAction = {
      type: SET_CURRENT_USER,
      payload: {}
    };

    expect(action[0]).toEqual(expectedAction);
  });

});