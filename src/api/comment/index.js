import request from '../request';
// 获取评论列表
export const commentList = (params) => request.get('/comment/list', { params });

// 修改评论信息
export const editComment = (data) => request.post('/comment/edit', data);

// 新增评论
export const addComment = (data) => request.post('/comment/add', data);

// 删除评论
export const deleteComment = (data) => request.post('/comment/delete', data);
