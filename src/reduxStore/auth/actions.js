import { loginByToken, logout } from 'APIService/authorization';

export const actionType = {
  LOGIN: 'AUTH.LOGIN',
  LOGOUT: 'AUTH.LOGOUT',
  INIT_PAGE_FINISH: 'AUTH.INIT_PAGE_FINISH',
};

const actions = {
  login: (user, token) => (dispatch) => {
    localStorage.setItem('JWT', token);
    localStorage.setItem('userInfo', JSON.stringify(user));
    dispatch({
      type: actionType.LOGIN,
      user,
    });
  },
  loginByToken: () => (dispatch) => {
    const token = localStorage.getItem('JWT');
    if (token) {
      loginByToken(token)
        .then((res) => {
          const { data = {} } = res;
          const { adminInfo } = data;
          if (adminInfo) {
            dispatch({
              type: actionType.LOGIN,
              user: adminInfo,
            });
          } else {
            throw Error('token expired');
          }
        })
        .catch(() => {
          //token expired
          localStorage.removeItem('JWT');
          dispatch({ type: actionType.INIT_PAGE_FINISH });
        });
    } else {
      dispatch({ type: actionType.INIT_PAGE_FINISH });
    }
  },
  logOutWithoutAPI: () => {
    localStorage.removeItem('JWT');
    return {
      type: actionType.LOGOUT,
    };
  },
  logout: () => (dispatch) => {
    logout()
      .then(() => localStorage.removeItem('JWT'))
      .catch(() => localStorage.removeItem('JWT'));
    dispatch({
      type: actionType.LOGOUT,
    });
  },
};

export default actions;
