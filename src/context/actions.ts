import { UserInfo } from './types';

export const setUserInfo = (userInfo: UserInfo) => ({
  type: 'SET_USER_INFO',
  payload: userInfo,
});
