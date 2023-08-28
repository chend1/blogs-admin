<script setup>
import { reactive, ref } from 'vue';
import useLinkData from './useLinkData';

const {
  total,
  linkData,
  getLinkList,
  addLinkClick,
  editLinkClick,
  deleteLinkClick,
} = useLinkData();
// 搜索信息
const searchInfo = reactive({
  page: 1,
  size: 10,
  keyword: '',
});
getLinkList(searchInfo);
// 友情链接信息
const linkInfo = ref({ status: 1 });
// 弹窗信息
const dialogVisible = ref(false);
const isAdd = ref(false);
// 新增友情链接
const handleAddLink = () => {
  isAdd.value = true;
  dialogVisible.value = true;
};

// 修改友情链接
const handleEditLink = (row) => {
  isAdd.value = false;
  dialogVisible.value = true;
  linkInfo.value = { ...row };
};

// 删除友情链接
const handleDeleteLink = (row) => {
  deleteLinkClick({ id: row.id });
};
// 弹窗确认事件
const formRef = ref();
const confirmClick = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      if (isAdd.value) {
        addLinkClick(linkInfo.value);
      } else {
        editLinkClick(linkInfo.value);
      }
      dialogVisible.value = false;
    }
  });
};
// 弹窗关闭事件
const handleClose = () => {
  linkInfo.value = { status: 1 };
  formRef.value && formRef.value.resetFields();
};

const rules = {
  title: [
    {
      required: true,
      message: '请输入友情链接名称',
      trigger: 'blur',
    },
  ],
  link: [
    {
      required: true,
      message: '请输入友情链接',
      trigger: 'blur',
    },
  ],
};
</script>

<template>
  <div class="link-manage">
    <div class="head">
      <div class="title">
        {{ $route.meta.title }}
      </div>
    </div>
    <div class="search-wrap">
      <div class="add-link">
        <el-button
          type="primary"
          @click="handleAddLink"
        >
          添加友情链接
        </el-button>
      </div>
      <div class="search">
        <el-input
          v-model="searchInfo.keyword"
          placeholder="请输入关键字"
          clearable
        />
        <el-button
          type="primary"
          style="margin-left: 15px;"
          @click="getLinkList(searchInfo)"
        >
          查询
        </el-button>
      </div>
    </div>
    <div class="table">
      <el-table
        :data="linkData"
        border
        :header-cell-style="{ 'background-color': '#DDE2EE' }"
        align="center"
        height="100%"
      >
        <el-table-column
          prop="title"
          label="名称"
          align="center"
        />
        <el-table-column
          prop="link"
          label="链接"
          align="center"
        />
        <el-table-column
          prop="sort"
          label="排序"
          width="100px"
          align="center"
        />
        <el-table-column
          prop="create_time"
          label="创建时间"
          align="center"
        />
        <el-table-column
          prop="status"
          label="状态"
          align="center"
        >
          <template #default="scope">
            {{ scope.row.status === 1 ? '启用' : '禁用' }}
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="操作"
          width="160"
          align="center"
        >
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click="handleEditLink(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              size="small"
              :disabled="scope.row.children && scope.row.children.length > 0"
              @click="handleDeleteLink(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div
      v-if="total > 0"
      class="paging"
    >
      <el-pagination
        v-model:current-page="searchInfo.page"
        v-model:page-size="searchInfo.size"
        background
        layout="total, sizes, prev, pager, next"
        :page-sizes="[5, 10, 15, 20]"
        :total="total"
        @size-change="getUserList(searchInfo)"
        @current-change="getUserList(searchInfo)"
      />
    </div>
  </div>
  <el-dialog
    v-model="dialogVisible"
    :title="isAdd ? '添加友情链接' : '修改友情链接'"
    width="650px"
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <div class="form">
      <el-form
        ref="formRef"
        :model="linkInfo"
        label-width="120px"
        :rules="rules"
      >
        <el-form-item
          label="友情链接"
          prop="link"
        >
          <el-input
            v-model="linkInfo.link"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item
          label="名称"
          prop="title"
        >
          <el-input
            v-model="linkInfo.title"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="排序">
          <el-input
            v-model="linkInfo.sort"
            placeholder="请输入内容"
            type="number"
          />
        </el-form-item>
        <el-form-item label="是否启用">
          <el-radio-group v-model="linkInfo.status">
            <el-radio :label="1">
              启用
            </el-radio>
            <el-radio :label="0">
              禁用
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="confirmClick"
        > 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="less">
.link-manage {
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-sizing: border-box;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .head {
    box-sizing: border-box;
    padding: 0 10px;
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    color: #333;
  }
  .search-wrap {
    margin: 10px 0;
    box-sizing: border-box;
    padding: 0 10px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .search{
      display: flex;
      align-items: center;
    }
  }
  .table {
    width: 100%;
    flex: 1;
    box-sizing: border-box;
    padding: 0 10px;
  }
  .paging {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 20px 0;
  }
}
</style>
