import request from '../request';
// 获取分类列表
export const classificationList = (params) => request.get('/class/list', { params });

// 新增分类
export const addClassification = (data) => request.post('/class/add', data);

// 修改分类
export const editClassification = (data) => request.post('/class/edit', data);

// 删除分类
export const deleteClassification = (data) => request.post('/class/delete', data);
