import request from '../request';
// 获取友情链接列表
export const linkList = (params) => request.get('/link/list', { params });

// 修改友情链接信息
export const editLink = (data) => request.post('/link/edit', data);

// 新增友情链接
export const addLink = (data) => request.post('/link/add', data);

// 删除友情链接
export const deleteLink = (data) => request.post('/link/delete', data);
