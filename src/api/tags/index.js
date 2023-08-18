import request from '../request';
// 获取tags列表
export const tagsList = (params) => request.get('/tags/list', { params });

// 修改tags信息
export const editTags = (data) => request.post('/tags/edit', data);

// 新增tags
export const addTags = (data) => request.post('/tags/add', data);

// 删除tags
export const deleteTags = (data) => request.post('/tags/delete', data);
