import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
  commentList, editComment, addComment, deleteComment,
} from '@/api';

export default function useCommentData() {
  const commentData = ref([]);
  let searchInfo = {};
  // 获取评论列表
  const getCommentList = async (params, callback) => {
    searchInfo = params;
    const res = await commentList(params);
    commentData.value = res.list;
    callback && callback();
  };

  // 新增评论
  const addCommentClick = async (params) => {
    try {
      await addComment(params);
      getCommentList(searchInfo);
      ElMessage({
        type: 'success',
        message: '新增成功',
      });
    } catch (err) {
      console.error(err);
    }
  };
  // 修改评论
  const editCommentClick = async (params) => {
    try {
      await editComment(params);
      getCommentList(searchInfo);
      ElMessage({
        type: 'success',
        message: '修改成功',
      });
    } catch (err) {
      console.error(err);
    }
  };
  // 删除评论
  const deleteCommentClick = (params) => {
    ElMessageBox.confirm('确认删除该评论吗？', '警告', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(async () => {
        try {
          await deleteComment(params);
          getCommentList(searchInfo);
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
  return {
    commentData,
    getCommentList,
    addCommentClick,
    editCommentClick,
    deleteCommentClick,
  };
}
