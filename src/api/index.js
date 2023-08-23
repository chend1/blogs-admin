// 登录
export { login, getUserInfo } from './login/index';
// 账号
export {
  userList, editUser, addUser, deleteUser,
} from './user/index';
// 角色
export {
  roleList, editRole, addRole, deleteRole, authRole,
} from './role/index';
// 菜单
export {
  menuList, editMenu, addMenu, deleteMenu,
} from './menu/index';
// 文章
export {
  articleList, editArticle, addArticle, deleteArticle, articleInfo, issueArticle,
} from './article/index';

// 评论
export {
  commentList, editComment, addComment, deleteComment,
} from './comment/index';

// 标签
export {
  tagsList, editTags, addTags, deleteTags,
} from './tags/index';

// 文章分类
export {
  classificationList, addClassification, editClassification, deleteClassification,
} from './classification/index';

// 文件上传
export { uploadFile } from './upload/index';

// 友情链接
export {
  linkList, editLink, addLink, deleteLink,
} from './link/index';
