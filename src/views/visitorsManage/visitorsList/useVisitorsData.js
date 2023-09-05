import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
  visitorsList,
  editVisitors,
  deleteVisitors,
  editVisitorsPassword,
} from '@/api';

export default function useVisitorsData() {
  const visitorsData = ref([]);
  const total = ref(0);
  let searchInfo = {};
  // 获取游客列表
  const getVisitorsList = async (params, callback) => {
    searchInfo = params;
    const res = await visitorsList(params);
    visitorsData.value = res.list;
    total.value = res.total;
    callback && callback();
  };
  // 修改游客
  const editVisitorsClick = async (params) => {
    try {
      await editVisitors(params);
      getVisitorsList(searchInfo);
      ElMessage({
        type: 'success',
        message: '修改成功',
      });
    } catch (err) {
      console.error(err);
    }
  };
  // 删除游客
  const deleteVisitorsClick = (params) => {
    ElMessageBox.confirm('确认删除该游客吗？', '警告', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(async () => {
        try {
          await deleteVisitors(params);
          getVisitorsList(searchInfo);
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
  // 重置游客密码
  const editVisitorsPasswordClick = async (params) => {
    ElMessageBox.confirm('确认重置该游客密码？', '警告', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(async () => {
        try {
          await editVisitorsPassword(params);
          getVisitorsList(searchInfo);
          ElMessage({
            type: 'success',
            message: '重置密码成功',
          });
        } catch (err) {
          console.error(err);
        }
      })
      .catch(() => {});
  };
  return {
    total,
    visitorsData,
    getVisitorsList,
    editVisitorsClick,
    deleteVisitorsClick,
    editVisitorsPasswordClick,
  };
}
