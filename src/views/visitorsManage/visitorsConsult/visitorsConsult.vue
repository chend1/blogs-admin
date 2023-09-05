<script setup>
import { reactive, ref } from 'vue';
import useConsultData from './useConsultData';

const {
  consultData,
  getConsultList,
  // editConsultClick,
  deleteConsultClick,
} = useConsultData();
// 搜索信息
const searchInfo = reactive({
  page: 1,
  size: 10,
  keyword: '',
});
getConsultList(searchInfo);
// 游客留言信息
const consultInfo = ref({
  status: 1,
});
// 弹窗信息
const dialogVisible = ref(false);

// 修改游客留言
const handleEditConsult = (row) => {
  dialogVisible.value = true;
  consultInfo.value = { ...row };
};

// 删除游客留言
const handleDeleteConsult = (row) => {
  deleteConsultClick({ id: row.id });
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
              编辑
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
    overflow: hidden;
  }
  .paging {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 20px 0;
  }
}
</style>
