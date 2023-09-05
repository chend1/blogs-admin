import request from '../request';
// 获取游客列表
export const visitorsList = (params) => request.get('/visitors/list', { params });

// 编辑游客信息
export const editVisitors = (data) => request.post('/visitors/edit', data);

// 删除游客
export const deleteVisitors = (data) => request.post('/visitors/delete', data);

// 重置游客密码
export const editVisitorsPassword = (data) => request.post('/visitors/password/reset', data);

// 获取咨询列表
export const consultList = (params) => request.get('/consult/list', { params });

// 修改咨询
export const editConsult = (data) => request.post('/consult/edit', data);

// 删除咨询
export const deleteConsult = (data) => request.post('/consult/delete', data);
