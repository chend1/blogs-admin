import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import {
  webInfo, editWebInfo,
} from '@/api';

export default function useWebData() {
  let searchInfo = {};
  const webData = ref([]);
  // 获取网站信息
  const getWebInfo = async (params, callback) => {
    searchInfo = params;
    const res = await webInfo(params);
    console.log(res);
    webData.value = res;
    callback && callback();
  };
  // 修改网站信息
  const editWebInfoClick = async (params) => {
    try {
      await editWebInfo(params);
      getWebInfo(searchInfo);
      ElMessage({
        type: 'success',
        message: '修改成功',
      });
    } catch (err) {
      console.error(err);
    }
  };

  return {
    webData,
    getWebInfo,
    editWebInfoClick,
  };
}
