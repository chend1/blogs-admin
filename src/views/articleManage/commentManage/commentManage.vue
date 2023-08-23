<script setup>
import { reactive, ref, computed } from 'vue';
import { useMainStore } from '@/store';
import useCommentData from './useCommentData';

const mainStore = useMainStore();
const userInfo = computed(() => mainStore.userInfo);
const {
  commentData,
  getCommentList,
  addCommentClick,
  editCommentClick,
  deleteCommentClick,
} = useCommentData();
// 搜索信息
const searchInfo = reactive({
  user_id: userInfo.value.id,
});
getCommentList(searchInfo);
// 评论信息
const commentInfo = ref({
  status: 1,
});
// 弹窗信息
const dialogVisible = ref(false);
const isAdd = ref(false);
// // 新增评论
// const handleAddComment = (row) => {
//   commentInfo.value.parent_id = row.id || 0;
//   isAdd.value = true;
//   dialogVisible.value = true;
// };

// // 修改评论
// const handleEditComment = (row) => {
//   isAdd.value = false;
//   dialogVisible.value = true;
//   commentInfo.value = { ...row };
// };

// 删除评论
const handleDeleteComment = (row) => {
  deleteCommentClick({ id: row.id });
};
// 弹窗确认事件
const formRef = ref();
const confirmClick = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      if (isAdd.value) {
        addCommentClick(commentInfo.value);
      } else {
        editCommentClick(commentInfo.value);
      }
      dialogVisible.value = false;
    }
  });
};
// 弹窗关闭事件
const handleClose = () => {
  commentInfo.value = { status: 1 };
  formRef.value && formRef.value.resetFields();
};

const rules = {
  content: [
    {
      required: true,
      message: '请输入评论内容',
      trigger: 'blur',
    },
  ],
};
</script>

<template>
  <div class="comment-manage">
    <div class="table">
      <el-table
        :data="commentData"
        border
        :header-cell-style="{ 'background-color': '#DDE2EE' }"
        align="center"
        height="100%"
        row-key="id"
        :tree-props="{ children: 'children' }"
      >
        <el-table-column
          prop="content"
          label="评论内容"
          show-overflow-tooltip
        />
        <el-table-column
          prop="article_id"
          label="评论文章id"
          align="center"
        />
        <el-table-column
          prop="user_name"
          label="发起用户"
          align="center"
        />
        <el-table-column
          prop="reply_user_name"
          label="接收用户"
          align="center"
        />

        <el-table-column
          prop="create_time"
          label="评论时间"
          align="center"
        />
        <el-table-column
          prop=""
          label="操作"
          width="120"
          align="center"
        >
          <template #default="scope">
            <!-- <el-button
              type="success"
              color="#28C69F"
              style="color: #fff"
              size="small"
              @click="handleAddComment(scope.row)"
            >
              新增
            </el-button>
            <el-button
              type="primary"
              size="small"
              :disabled="userInfo.id !== scope.row.user_id"
              @click="handleEditComment(scope.row)"
            >
              编辑
            </el-button> -->
            <el-button
              type="danger"
              size="small"
              :disabled="userInfo.id !== scope.row.user_id"
              @click="handleDeleteComment(scope.row)"
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
    :title="isAdd ? '添加评论' : '修改评论'"
    width="650px"
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <div class="form">
      <el-form
        ref="formRef"
        :model="commentInfo"
        label-width="120px"
        :rules="rules"
      >
        <el-form-item label="上级评论">
          <el-input
            v-model="commentInfo.parent_name"
            placeholder="请输入内容"
            disabled
          />
        </el-form-item>
        <el-form-item label="用户名">
          <el-input
            v-if="!isAdd"
            v-model="commentInfo.user_name"
            placeholder="请输入内容"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="评论内容"
          prop="content"
        >
          <el-input
            v-model="commentInfo.content"
            placeholder="请输入内容"
          />
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
.comment-manage {
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-sizing: border-box;
  padding: 10px;
  .add-comment {
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
