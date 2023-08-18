import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
  tagsList, editTags, addTags, deleteTags,
} from '@/api';

export default function useTagsData() {
  const total = ref(0);
  const tagsData = ref([]);
  let searchInfo = {};
  // 获取标签列表
  const getTagsList = async (params, callback) => {
    searchInfo = params;
    const res = await tagsList(params);
    // console.log(res);
    tagsData.value = res.list;
    total.value = res.total;
    callback && callback();
  };
  // 新增标签
  const addTagsClick = async (params) => {
    try {
      await addTags(params);
      getTagsList(searchInfo);
      ElMessage({
        type: 'success',
        message: '新增成功',
      });
    } catch (err) {
      console.error(err);
    }
  };
  // 修改标签
  const editTagsClick = async (params) => {
    try {
      await editTags(params);
      getTagsList(searchInfo);
      ElMessage({
        type: 'success',
        message: '修改成功',
      });
    } catch (err) {
      console.error(err);
    }
  };
  // 删除标签
  const deleteTagsClick = (params) => {
    ElMessageBox.confirm('确认删除该标签吗？', '警告', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(async () => {
        try {
          await deleteTags(params);
          getTagsList(searchInfo);
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
    total,
    tagsData,
    getTagsList,
    addTagsClick,
    editTagsClick,
    deleteTagsClick,
  };
}
