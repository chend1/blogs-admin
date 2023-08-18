<script setup>
import { reactive, ref } from 'vue';
import useTagsData from './useTagsData';

const {
  total,
  tagsData,
  getTagsList,
  addTagsClick,
  editTagsClick,
  deleteTagsClick,
} = useTagsData();
// 搜索信息
const searchInfo = reactive({
  page: 1,
  size: 10,
  keyword: '',
});
getTagsList(searchInfo);
// 标签信息
const tagsInfo = ref({ status: 1 });
// 弹窗信息
const dialogVisible = ref(false);
const isAdd = ref(false);
// 新增标签
const handleAddTags = () => {
  isAdd.value = true;
  dialogVisible.value = true;
};

// 修改标签
const handleEditTags = (row) => {
  isAdd.value = false;
  dialogVisible.value = true;
  tagsInfo.value = { ...row };
};

// 删除标签
const handleDeleteTags = (row) => {
  deleteTagsClick({ id: row.id });
};
// 弹窗确认事件
const formRef = ref();
const confirmClick = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      if (isAdd.value) {
        addTagsClick(tagsInfo.value);
      } else {
        editTagsClick(tagsInfo.value);
      }
      dialogVisible.value = false;
    }
  });
};
// 弹窗关闭事件
const handleClose = () => {
  tagsInfo.value = { status: 1 };
  formRef.value && formRef.value.resetFields();
};

const rules = {
  name: [
    {
      required: true,
      message: '请输入标签名称',
      trigger: 'blur',
    },
  ],
};
</script>

<template>
  <div class="tags-manage">
    <div class="add-tags">
      <el-button
        type="primary"
        @click="handleAddTags"
      >
        添加标签
      </el-button>
    </div>
    <div class="table">
      <el-table
        :data="tagsData"
        border
        :header-cell-style="{ 'background-color': '#DDE2EE' }"
        align="center"
        height="100%"
      >
        <el-table-column
          prop="name"
          label="标签名称"
          align="center"
        />
        <el-table-column
          prop="sort"
          label="排序"
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
              @click="handleEditTags(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              size="small"
              :disabled="scope.row.children && scope.row.children.length > 0"
              @click="handleDeleteTags(scope.row)"
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
    :title="isAdd ? '添加标签' : '修改标签'"
    width="650px"
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <div class="form">
      <el-form
        ref="formRef"
        :model="tagsInfo"
        label-width="120px"
        :rules="rules"
      >
        <el-form-item
          label="标签名称"
          prop="name"
        >
          <el-input
            v-model="tagsInfo.name"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="排序">
          <el-input
            v-model="tagsInfo.sort"
            placeholder="请输入内容"
            type="number"
          />
        </el-form-item>
        <el-form-item label="是否启用">
          <el-radio-group v-model="tagsInfo.status">
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
.tags-manage {
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-sizing: border-box;
  padding: 10px;
  .add-tags {
    margin: 10px 0;
    box-sizing: border-box;
    padding: 0 10px;
    width: 100%;
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
