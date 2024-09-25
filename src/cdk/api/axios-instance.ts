import axios from 'axios';
import Cookies from 'js-cookie';

import { baseUrl } from './constants';

const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  timeout: 1000,
});

axiosInstance.interceptors.request.use(
  async function (config) {
    const token = Cookies.get('access-token');

    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = token;
    }

    return config;
  },

  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
