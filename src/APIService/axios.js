import i18n from 'i18next';
import axios from 'axios';
import get from 'lodash/get';
import { notification } from 'antd';

import { HOST } from './APILinks';
import reduxStore from 'reduxStore';
import actions from '../reduxStore/auth/actions';

const Axios = axios.create({
  baseURL: HOST,
  headers: {
    Accept: 'application/json,application/x-www-form-urlencoded,text/plain,*/*',
    'Content-Type': 'application/json;charset=utf-8',
  },
});

Axios.interceptors.request.use((config) => {
  let { headers } = config;
  let token = localStorage.getItem('JWT');
  config.headers = {
    Authorization: `Bearer ${token}`,
    ...headers,
  };
  return config;
});

// Add a response interceptor
Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const stateCode = get(error, 'response.status');
    if (stateCode === 401) {
      let message =
        get(error, 'response.data.message') ||
        get(error, 'response.data.error') ||
        'haveBeenLoggedOut';
      message = 'error:' + message;

      notification.error({
        message: i18n.t(message),
        placement: 'bottomRight',
      });
      reduxStore.dispatch(actions.logOutWithoutAPI());
    }
    return Promise.reject(error);
  },
);

export default Axios;
