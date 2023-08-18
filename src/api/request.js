import axios from 'axios';
import { ElMessage } from 'element-plus';
import { getStorage } from '@/utils/storage';
// eslint-disable-next-line import/no-cycle
import { useMainStore } from '@/store';

const baseUrl = import.meta.env.MODE === 'development'
  ? '/api'
  : import.meta.env.VITE_BASE_URL;

const request = axios.create({
  baseURL: baseUrl,
  timeout: 35000,
});
// 请求前拦截
request.interceptors.request.use((config) => {
  const token = getStorage('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
// 请求成功拦截
const successCallback = (response) => {
  // console.log(response);
  const {
    message, code, data, status,
  } = response.data;
  if (status === 1) {
    return data;
  }
  if (code === 401) {
    const store = useMainStore();
    store.logOut();
    return Promise.reject(response);
  }

  ElMessage.error(`错误码${code}，${message}`);
  return Promise.reject(response);
};

// 请求失败拦截
const errorCallback = (error) => {
  ElMessage.error(error.message);
};
request.interceptors.response.use(successCallback, errorCallback);
export default request;
