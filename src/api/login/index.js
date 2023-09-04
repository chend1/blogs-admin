import request from '../request';
// 登录
export const login = (data) => request.post('/login', data);
// 获取用户信息
export const getUserInfo = (params) => request.get('/login/info', { params });

// 修改用户信息
export const editUserInfo = (data) => request.post('/user/edit/info', data);

// 修改密码
export const editUserPassword = (data) => request.post('/user/edit/password', data);
