import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
  editConsult, deleteConsult, consultList,
} from '@/api';

export default function useConsultData() {
  const consultData = ref([]);
  let searchInfo = {};
  // 获取咨询列表
  const getConsultList = async (params, callback) => {
    searchInfo = params;
    const res = await consultList(params);
    consultData.value = res.list;
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
  return {
    consultData,
    getConsultList,
    editConsultClick,
    deleteConsultClick,
  };
}
