import request from '../request';

// 文件上传
export const uploadFile = (data) => request.post('/upload', data);
