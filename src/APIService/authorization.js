import axios from './axios';
import {
  LOGIN,
  VERIFY_EMAIL_CODE,
  LOGIN_BY_TOKEN,
  RESET_PASSWORD,
  CHANGE_PASSWORD,
  LOGOUT,
} from './APILinks';

export const login = (email, password) =>
  axios.post(LOGIN, { email: email, password });

export const verifyEmailCode = (email, admin_email_verify_code) =>
  axios.post(VERIFY_EMAIL_CODE, {
    email,
    admin_email_verify_code,
  });

export const loginByToken = (token) => axios.post(LOGIN_BY_TOKEN);

export const forgetPassword = (email) => axios.post(RESET_PASSWORD, { email });
export const resetPassword = (token, newPassword) =>
  axios.put(
    RESET_PASSWORD,
    { newPassword },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
export const changePassword = ({ newPassword, currentPassword } = {}) =>
  axios.put(CHANGE_PASSWORD, { newPassword, currentPassword });

export const logout = () => axios.post(LOGOUT);
