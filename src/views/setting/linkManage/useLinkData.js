import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
  linkList, editLink, addLink, deleteLink,
} from '@/api';

export default function uselinkData() {
  const total = ref(0);
  const linkData = ref([]);
  let searchInfo = {};
  // 获取友情链接列表
  const getLinkList = async (params, callback) => {
    searchInfo = params;
    const res = await linkList(params);
    // console.log(res);
    linkData.value = res.list;
    total.value = res.total;
    callback && callback();
  };
  // 新增友情链接
  const addLinkClick = async (params) => {
    try {
      await addLink(params);
      getLinkList(searchInfo);
      ElMessage({
        type: 'success',
        message: '新增成功',
      });
    } catch (err) {
      console.error(err);
    }
  };
  // 修改友情链接
  const editLinkClick = async (params) => {
    try {
      await editLink(params);
      getLinkList(searchInfo);
      ElMessage({
        type: 'success',
        message: '修改成功',
      });
    } catch (err) {
      console.error(err);
    }
  };
  // 删除友情链接
  const deleteLinkClick = (params) => {
    ElMessageBox.confirm('确认删除该友情链接吗？', '警告', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(async () => {
        try {
          await deleteLink(params);
          getLinkList(searchInfo);
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
    linkData,
    getLinkList,
    addLinkClick,
    editLinkClick,
    deleteLinkClick,
  };
}
