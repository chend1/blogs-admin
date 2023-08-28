import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
  classificationList,
  addClassification,
  editClassification,
  deleteClassification,
} from '@/api';
import { flatArray } from '@/utils';

export default function useClassificationData() {
  const classificationData = ref([]);
  const classificationOptions = ref([]);
  let searchInfo = {};
  // 获取分类列表
  const getClassificationList = async (params, callback) => {
    searchInfo = params;
    const res = await classificationList(params);
    classificationData.value = res.list;
    classificationOptions.value = flatArray(res.list);
    callback && callback();
  };
  // 新增分类
  const addClassificationClick = async (params) => {
    try {
      await addClassification(params);
      getClassificationList(searchInfo);
      ElMessage({
        type: 'success',
        message: '新增成功',
      });
    } catch (err) {
      console.error(err);
    }
  };
  // 修改分类
  const editClassificationClick = async (params) => {
    try {
      await editClassification(params);
      getClassificationList(searchInfo);
      ElMessage({
        type: 'success',
        message: '修改成功',
      });
    } catch (err) {
      console.error(err);
    }
  };
  // 删除分类
  const deleteClassificationClick = (params) => {
    ElMessageBox.confirm('确认删除该分类吗？', '警告', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(async () => {
        try {
          await deleteClassification(params);
          getClassificationList(searchInfo);
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
  // 获取分类名称
  const getClassificationName = (id) => {
    const list = classificationOptions.value.filter((item) => item.id === id);
    return (list[0] && list[0].name);
  };

  return {
    classificationData,
    classificationOptions,
    getClassificationList,
    addClassificationClick,
    editClassificationClick,
    deleteClassificationClick,
    getClassificationName,
  };
}
