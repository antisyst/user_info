import { createStore } from 'redux';
import { UserInfo } from './types';

interface RootState {
  userInfo: UserInfo | null;
}

const initialState: RootState = {
  userInfo: null,
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_USER_INFO':
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
