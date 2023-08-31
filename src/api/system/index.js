import request from '../request';
// 获取网站信息
export const webInfo = (params) => request.get('/web/info', { params });

// 修改网站信息
export const editWebInfo = (data) => request.post('/web/info/edit', data);
