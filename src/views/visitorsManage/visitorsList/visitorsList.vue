<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import useVisitorsData from './useVisitorsData';

const {
  total,
  visitorsData,
  getVisitorsList,
  editVisitorsClick,
  deleteVisitorsClick,
  editVisitorsPasswordClick,
} = useVisitorsData();
// 搜索信息
const searchInfo = reactive({
  page: 1,
  size: 10,
  keyword: '',
});
getVisitorsList(searchInfo);

// 修改游客
const handleEditVisitors = (row) => {
  const status = row.status === 1 ? 0 : 1;
  editVisitorsClick({ id: row.id, status });
};

// 删除游客
const handleDeleteVisitors = (row) => {
  deleteVisitorsClick({ id: row.id });
};

// 重置密码
const handleResetPassword = (row) => {
  editVisitorsPasswordClick({ id: row.id });
};

// 查看游客详情
const router = useRouter();
const lookVisitorsInfo = (row) => {
  router.push({
    path: '/visitorsManage/visitorsInfo',
    query: { id: row.id, title: row.name },
  });
};

</script>

<template>
  <div class="visitors-manage">
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
          @click="getVisitorsList(searchInfo)"
        >
          查询
        </el-button>
      </div>
    </div>
    <div class="table">
      <el-table
        :data="visitorsData"
        border
        :header-cell-style="{ 'background-color': '#DDE2EE' }"
        align="center"
        height="100%"
        @row-click="lookVisitorsInfo"
      >
        <el-table-column
          prop="name"
          label="游客名"
          min-width="80"
          align="center"
        />
        <el-table-column
          prop="account"
          label="账号"
          align="center"
        />
        <el-table-column
          prop="phone"
          label="手机号"
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
          min-width="140"
          align="center"
        >
          <template #default="scope">
            <el-button
              :type="scope.row.status === 1 ? 'warning' : 'primary'"
              size="small"
              @click="handleEditVisitors(scope.row)"
            >
              {{ scope.row.status === 1 ? '禁用' : '启用' }}
            </el-button>
            <el-button
              type="primary"
              size="small"
              plain
              @click="handleResetPassword(scope.row)"
            >
              重置密码
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click="handleDeleteVisitors(scope.row)"
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
        @size-change="getVisitorsList(searchInfo)"
        @current-change="getVisitorsList(searchInfo)"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
.visitors-manage {
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
