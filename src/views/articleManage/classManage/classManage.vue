<script setup>
import { reactive, ref } from 'vue';
import useClassificationData from './useClassificationData';

const {
  classificationData,
  classificationOptions,
  getClassificationList,
  addClassificationClick,
  editClassificationClick,
  deleteClassificationClick,
} = useClassificationData();
// 搜索信息
const searchInfo = reactive({
  keyword: '',
});
getClassificationList(searchInfo);
// 分类信息
const classificationInfo = ref({
  status: 1,
});
// 弹窗信息
const dialogVisible = ref(false);
const isAdd = ref(false);
// 新增分类
const handleAddClassification = (row) => {
  classificationInfo.value.parent_id = row.id || 0;
  isAdd.value = true;
  dialogVisible.value = true;
};

// 修改分类
const handleEditClassification = (row) => {
  isAdd.value = false;
  dialogVisible.value = true;
  classificationInfo.value = { ...row };
};

// 删除分类
const handleDeleteClassification = (row) => {
  deleteClassificationClick({ id: row.id });
};
// 弹窗确认事件
const formRef = ref();
const confirmClick = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      if (isAdd.value) {
        addClassificationClick(classificationInfo.value);
      } else {
        editClassificationClick(classificationInfo.value);
      }
      dialogVisible.value = false;
    }
  });
};
// 弹窗关闭事件
const handleClose = () => {
  classificationInfo.value = { status: 1 };
  formRef.value && formRef.value.resetFields();
};

const rules = {
  name: [
    {
      required: true,
      message: '请输入分类名称',
      trigger: 'blur',
    },
  ],
};
</script>

<template>
  <div class="classification-manage">
    <div class="head">
      <div class="title">
        {{ $route.meta.title }}
      </div>
    </div>
    <div class="add-classification">
      <el-button
        type="primary"
        @click="handleAddClassification"
      >
        添加分类
      </el-button>
    </div>
    <div class="table">
      <el-table
        :data="classificationData"
        border
        :header-cell-style="{ 'background-color': '#DDE2EE' }"
        align="center"
        height="100%"
        row-key="id"
        :tree-props="{ children: 'children' }"
      >
        <el-table-column
          prop="name"
          label="分类名称"
        />
        <el-table-column
          prop="description"
          label="描述"
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
          width="220"
          align="center"
        >
          <template #default="scope">
            <el-button
              type="success"
              color="#28C69F"
              style="color: #fff"
              size="small"
              @click="handleAddClassification(scope.row)"
            >
              新增
            </el-button>
            <el-button
              type="primary"
              size="small"
              @click="handleEditClassification(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              size="small"
              :disabled="scope.row.children && scope.row.children.length > 0"
              @click="handleDeleteClassification(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <el-dialog
    v-model="dialogVisible"
    :title="isAdd ? '添加分类' : '修改分类'"
    width="650px"
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <div class="form">
      <el-form
        ref="formRef"
        :model="classificationInfo"
        label-width="120px"
        :rules="rules"
      >
        <el-form-item label="上级分类">
          <el-select
            v-model="classificationInfo.parent_id"
            placeholder="请选择"
            filterable
          >
            <el-option
              label="暂无"
              :value="0"
            />
            <el-option
              v-for="item in classificationOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="分类名称"
          prop="name"
        >
          <el-input
            v-model="classificationInfo.name"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item
          label="描述"
          prop="description"
        >
          <el-input
            v-model="classificationInfo.description"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="排序">
          <el-input
            v-model="classificationInfo.sort"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="是否启用">
          <el-radio-group v-model="classificationInfo.status">
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
.classification-manage {
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
  .add-classification {
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
