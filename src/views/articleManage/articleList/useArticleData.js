import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
  articleList, editArticle, addArticle, deleteArticle, articleInfo, issueArticle,
} from '@/api';

export default function useArticleData() {
  const articleData = ref([]);
  const total = ref(0);
  let searchInfo = {};
  // 获取文章列表
  const getArticleList = async (params, callback) => {
    searchInfo = params;
    const res = await articleList(params);
    console.log(res);
    articleData.value = res.list;
    total.value = res.total;
    callback && callback();
  };
  // 新增文章
  const addArticleClick = async (params, callback) => {
    try {
      await addArticle(params);
      getArticleList(searchInfo);
      ElMessage({
        type: 'success',
        message: '新增成功',
      });
      callback && callback();
    } catch (err) {
      console.error(err);
    }
  };
  // 修改文章
  const editArticleClick = async (params, callback) => {
    try {
      await editArticle(params);
      getArticleList(searchInfo);
      ElMessage({
        type: 'success',
        message: '修改成功',
      });
      callback && callback();
    } catch (err) {
      console.error(err);
    }
  };
  // 删除文章
  const deleteArticleClick = (params) => {
    ElMessageBox.confirm('确认删除该文章吗？', '警告', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(async () => {
        try {
          await deleteArticle(params);
          getArticleList(searchInfo);
          ElMessage({
            type: 'success',
            message: '删除成功',
          });
        } catch (err) {
          console.error(err);
        }
      })
      .catch(() => {});
  };
  // 获取文章详情
  const getArticleInfo = async (params) => {
    const info = await articleInfo(params);
    return info;
  };
  // 发布文章
  const issueArticleClick = async (params) => {
    ElMessageBox.confirm('确认发布该文章吗？', '警告', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(async () => {
        try {
          await issueArticle(params);
          getArticleList(searchInfo);
          ElMessage({
            type: 'success',
            message: '发布成功',
          });
        } catch (err) {
          console.error(err);
        }
      })
      .catch(() => {});
  };
  return {
    articleData,
    total,
    getArticleList,
    addArticleClick,
    editArticleClick,
    deleteArticleClick,
    getArticleInfo,
    issueArticleClick,
  };
}
