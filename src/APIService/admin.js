import axios from './axios';
import { ADMIN_URL } from './APILinks';

export const fetchAdmins = (params) =>
  axios.get(ADMIN_URL, {
    params,
  });

export const createAdmin = (admin) => {
  return axios.post(ADMIN_URL, admin);
};
export const deleteUser = (id) => {
  return axios.delete(ADMIN_URL + id);
}

/**
 * @param {string} id
 * @returns {Promise<{
 *  id: number,
 *  fullName: string,
 *  isActive: boolean,
 *  email: string,
 *  role: "admin" ||"super_admin"
 * }>}
 */
export const fetchAdminById = (id) => {
  return axios.get(ADMIN_URL + '/' + id).then((response) => ({
    ...response,
    data: formatDataAdminAccount(response.data),
  }));
};

export const updateAdmin = (id, admin) => {
  return axios.put(ADMIN_URL + '/' + id, admin);
};

const formatDataAdminAccount = (data = {}) => {
  const {
    id,
    fullName,
    full_name,
    isActive,
    is_active,
    email,
    role = 'admin',
    ...others
  } = data;

  return {
    id,
    fullName: fullName || full_name,
    isActive: !!(isActive || is_active),
    email,
    role,
    ...others,
  };
};
