import { actionType } from './actions';

let initialState = {
  initPageFinish: false, // loading login by token on first load
  isLoggedIn: false,
  userInfo: {},
};

function auth(state = initialState, action) {
  switch (action.type) {
    case actionType.LOGIN:
      return {
        ...state,
        initPageFinish: true,
        isLoggedIn: true,
        userInfo: action.user,
      };
    case actionType.INIT_PAGE_FINISH:
      return {
        ...state,
        initPageFinish: true,
      };
    case actionType.LOGOUT:
      return { ...state, isLoggedIn: false, initPageFinish: true };
    default:
      return state;
  }
}

export default auth;
