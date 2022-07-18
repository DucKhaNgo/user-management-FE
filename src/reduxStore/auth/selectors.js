import get from 'lodash/get';

export const authSelector = (state) => state.auth;

export const isLoggedInSelector = (state) => get(state, 'auth.isLoggedIn');

export const initPageFinishSelector = (state) =>
  get(state, 'auth.initPageFinish');

export const userInfoSelector = (state) => get(state, 'auth.userInfo');
export const userInfoEmailSelector = (state) =>
  get(state, 'auth.userInfo.email');
