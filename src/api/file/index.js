import request from '../request';
// 获取文件列表
export const resourceList = (params) => request.get('/file/list', { params });

// 删除文件信息
export const deleteResource = (data) => request.post('/file/delete', data);
