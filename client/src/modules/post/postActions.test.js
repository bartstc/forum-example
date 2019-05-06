import * as actions from './postActions';
import { POST_LOADING } from './postTypes';
import configureMockStore from 'redux-mock-store'; // allows to create fake store
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);
const store = mockStore();

describe('Post Actions', () => {

  beforeEach(() => {
    store.clearActions();
  });

  it('handle get post request', () => {
    store.dispatch(actions.getPost());
    const action = store.getActions();
    // console.log('action', action);

    const expectedAction = {
      type: POST_LOADING
    };

    expect(action[0]).toEqual(expectedAction);
  });

});