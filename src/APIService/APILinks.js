export const HOST = process.env.REACT_APP_API_URL;
const URIAdmin = `${HOST}`;

export const LOGIN = `${URIAdmin}/login`;
export const VERIFY_EMAIL_CODE = `${URIAdmin}/verify-email-code`;
export const LOGIN_BY_TOKEN = `${URIAdmin}/login-by-token`;
export const RESET_PASSWORD = `${URIAdmin}/reset-password`;
export const CHANGE_PASSWORD = `${URIAdmin}/password`;
export const LOGOUT = `${URIAdmin}/logout`;


export const ADMIN_URL = `${URIAdmin}/users`;

export const GET_LOGS = `${URIAdmin}/logs`;
