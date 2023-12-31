<script setup>
import { computed, reactive, ref } from 'vue';
import { useMainStore } from '@/store';
import useConsultData from './useConsultData';

const mainStore = useMainStore();
const userInfo = computed(() => mainStore.userInfo);
const {
  total,
  consultData,
  getConsultList,
  // editConsultClick,
  deleteConsultClick,
  getReplyList,
  addReplyClick,
} = useConsultData();
// 搜索信息
const searchInfo = reactive({
  page: 1,
  size: 10,
  keyword: '',
});
getConsultList(searchInfo);

// 删除游客留言
const handleDeleteConsult = (row) => {
  deleteConsultClick({ id: row.id });
};

// 弹窗信息
const drawerVisible = ref(false);
// 游客留言信息
const consultInfo = ref({
  status: 1,
});
// 留言列表
const consultList = ref([]);
// 修改游客留言
const handleEditConsult = async (row) => {
  drawerVisible.value = true;
  consultInfo.value = { ...row };
  const res = await getReplyList({ id: row.id });
  consultList.value = res;
};
// 关闭弹窗
const handleClose = () => {
  drawerVisible.value = false;
  console.log(123);
};
// 回复消息
const replyMessage = ref('');
const replyClick = async () => {
  addReplyClick({
    consult_id: consultInfo.value.id,
    consult_content: replyMessage.value,
    reply_name: userInfo.value.name,
    reply_avatar: userInfo.value.avatar,
    reply_user_id: userInfo.value.id,
  }, async () => {
    const res = await getReplyList({ id: consultInfo.value.id });
    consultList.value = res;
    replyMessage.value = '';
  });
};
</script>

<template>
  <div class="consult-manage">
    <div class="head">
      <div class="title">
        {{ $route.meta.title }}
      </div>
    </div>
    <div class="search-wrap">
      <div class="search">
        <el-input
          v-model="searchInfo.keyword"
          placeholder="请输入关键字"
          clearable
        />
        <el-button
          type="primary"
          style="margin-left: 15px"
          @click="getConsultList(searchInfo)"
        >
          查询
        </el-button>
      </div>
    </div>
    <div class="table">
      <el-table
        :data="consultData"
        border
        :header-cell-style="{ 'background-color': '#DDE2EE' }"
        align="center"
        height="100%"
      >
        <el-table-column
          prop="name"
          label="用户名"
          min-width="80"
          align="center"
        />
        <el-table-column
          prop="phone"
          label="手机号"
          align="center"
        />
        <el-table-column
          prop="email"
          label="邮箱"
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
            {{ scope.row.status === 1 ? '已回复' : '未回复' }}
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="操作"
          min-width="140"
          align="center"
        >
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click="handleEditConsult(scope.row)"
            >
              查看
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click="handleDeleteConsult(scope.row)"
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
  <el-drawer
    v-model="drawerVisible"
    title="留言列表"
    direction="rtl"
    :before-close="handleClose"
  >
    <div class="replay-list">
      <ul>
        <li
          v-for="item in consultList"
          :key="item.id"
          :class="{ own: item.reply_user_id === userInfo.id }"
        >
          <div class="avatar">
            <img
              v-if="item.reply_avatar || item.avatar"
              :src="item.reply_avatar || item.avatar"
              alt=""
            />
            <span v-else>{{
              (item.reply_name || item.name).substr(0, 1)
            }}</span>
          </div>
          <div class="content">
            <div class="name">
              {{ item.reply_name || item.name }}
            </div>
            <div class="message">
              {{
                item.consult_content
              }}
            </div>
          </div>
        </li>
      </ul>
      <div class="operation">
        <div class="send-message">
          <el-input
            v-model="replyMessage"
            type="textarea"
            :rows="3"
            resize="none"
            placeholder="请输入内容"
          />
        </div>
        <div class="btn">
          <el-button
            type="primary"
            plain
            @click="drawerVisible = false"
          >
            取消
          </el-button>
          <el-button
            type="primary"
            @click="replyClick"
          >
            回复
          </el-button>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<style scoped lang="less">
.consult-manage {
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
    .search {
      display: flex;
      align-items: center;
    }
  }
  .table {
    width: 100%;
    flex: 1;
    box-sizing: border-box;
    padding: 0 10px;
    overflow: hidden;
  }
  .paging {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 20px 0;
  }
}
.replay-list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 5px 0;
  ul {
    flex: 1;
    box-sizing: border-box;
    padding: 0 20px;
    overflow-y: auto;
    li {
      display: flex;
      align-items: flex-start;
      margin-bottom: 25px;
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 3px;
        overflow: hidden;
        background-color: #409eff;
        text-align: center;
        line-height: 50px;
        color: #fff;
        img {
          width: 100%;
        }
      }
      .content {
        flex: 1;
        padding: 0 10px;
        .name {
          font-size: 14px;
          color: #666;
          margin-top: -5px;
          width: 100%;
        }
        .message {
          margin-top: 3px;
          display: inline-block;
          background-color: #f7f7f7;
          line-height: 28px;
          padding: 4px 10px;
          color: #333;
          font-size: 14px;
          user-select: text;
          border-radius: 3px;
        }
      }
    }
    .own {
      flex-direction: row-reverse;
      .content {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        .name {
          text-align: right;
        }
        .message {
          background-color: #409eff;
          color: #fff;
        }
      }
    }
  }
  .operation {
    width: 100%;
    height: 120px;
    position: relative;
    border-top: 1px solid #eee;
    box-sizing: border-box;
    padding: 10px 20px 0;
    .send-message {
      width: 100%;
    }
    .btn {
      margin-top: 6px;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
