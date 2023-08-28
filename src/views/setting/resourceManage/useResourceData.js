import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
  resourceList, deleteResource,
} from '@/api';

export default function useResourceData() {
  const total = ref(0);
  const resourceData = ref([]);
  let searchInfo = {};
  // 获取文件列表
  const getResourceList = async (params, callback) => {
    searchInfo = params;
    const res = await resourceList(searchInfo);
    // console.log(res);
    resourceData.value = res.list;
    total.value = res.total;
    callback && callback();
  };
  // 删除文件
  const deleteResourceClick = (params) => {
    ElMessageBox.confirm('确认删除该文件吗？', '警告', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(async () => {
        try {
          await deleteResource(params);
          getResourceList(searchInfo);
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
    resourceData,
    getResourceList,
    deleteResourceClick,
  };
}
