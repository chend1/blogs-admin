import request from '../request';
// 登录
export const login = (data) => request.post('/login', data);
// 获取用户信息
export const getUserInfo = (params) => request.get('/login/info', { params });
