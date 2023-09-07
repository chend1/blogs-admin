import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
  editConsult,
  deleteConsult,
  consultList,
  replyList,
  addReply,
} from '@/api';

export default function useConsultData() {
  const consultData = ref([]);
  const total = ref(0);
  let searchInfo = {};
  // 获取咨询列表
  const getConsultList = async (params, callback) => {
    searchInfo = params;
    const res = await consultList(params);
    consultData.value = res.list;
    total.value = res.total;
    callback && callback();
  };
  // 修改咨询
  const editConsultClick = async (params) => {
    try {
      await editConsult(params);
      getConsultList(searchInfo);
      ElMessage({
        type: 'success',
        message: '修改成功',
      });
    } catch (err) {
      console.error(err);
    }
  };
  // 删除咨询
  const deleteConsultClick = (params) => {
    ElMessageBox.confirm('确认删除该咨询信息吗？', '警告', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(async () => {
        try {
          await deleteConsult(params);
          getConsultList(searchInfo);
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
  // 获取回复列表
  const getReplyList = async (params) => {
    const res = await replyList(params);
    return res.list;
  };
  // 新增回复
  const addReplyClick = async (params, callback) => {
    try {
      await addReply(params);
      callback && callback();
      ElMessage({
        type: 'success',
        message: '回复成功',
      });
    } catch (err) {
      console.error(err);
    }
  };
  return {
    total,
    consultData,
    getConsultList,
    editConsultClick,
    deleteConsultClick,
    getReplyList,
    addReplyClick,
  };
}
