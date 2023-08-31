import request from '../request';
// 获取账号列表
export const userList = (params) => request.get('/user/list', { params });

// 修改账号信息
export const editUser = (data) => request.post('/user/edit', data);

// 新增账号
export const addUser = (data) => request.post('/user/add', data);

// 删除账号
export const deleteUser = (data) => request.post('/user/delete', data);

// 重置密码
export const resetUserPassword = (data) => request.post('/user/password/reset', data);
