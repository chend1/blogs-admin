import request from '../request';
// 获取文章列表
export const articleList = (params) => request.get('/article/list', { params });

// 新增文章
export const addArticle = (data) => request.post('/article/add', data);

// 修改文章
export const editArticle = (data) => request.post('/article/edit', data);

// 删除文章
export const deleteArticle = (data) => request.post('/article/delete', data);

// 获取文章详情
export const articleInfo = (params) => request.get('/article/info', { params });
