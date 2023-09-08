import request from '../request';
// 获取文章数据信息
export const articleData = (params) => request.get('/article/data', { params });
// 获取评论数据信息
export const commentData = (params) => request.get('/comment/data', { params });
// 获取用户注册数据信息
export const registerData = (params) => request.get('/register/person/data', { params });

// 获取文章每月数据信息
export const articleMonthData = (params) => request.get('/article/month/data', { params });

// 获取评论每月数据信息
export const commentMonthData = (params) => request.get('/comment/month/data', { params });

// 获取收藏每月数据信息
export const starMonthData = (params) => request.get('/star/month/data', { params });

// 获取浏览每月数据信息
export const viewMonthData = (params) => request.get('/view/month/data', { params });
