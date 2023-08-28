<script setup>
import { reactive } from 'vue';
import useResourceData from './useResourceData';

const {
  total, resourceData, getResourceList, deleteResourceClick,
} = useResourceData();
// 搜索信息
const searchInfo = reactive({
  page: 1,
  size: 10,
  keyword: '',
});
getResourceList(searchInfo);

// 删除友情链接
const handleDeleteResource = (row) => {
  deleteResourceClick({ id: row.id, path: row.path });
};
</script>

<template>
  <div class="resource-manage">
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
          style="margin-left: 15px;"
          @click="getResourceList(searchInfo)"
        >
          查询
        </el-button>
      </div>
    </div>
    <div class="table">
      <el-table
        :data="resourceData"
        border
        :header-cell-style="{ 'background-color': '#DDE2EE' }"
        align="center"
        height="100%"
      >
        <el-table-column
          prop="name"
          label="名称"
          align="center"
          min-width="250"
        />
        <el-table-column
          prop="url"
          label="图片"
          width="150"
          align="center"
        >
          <template #default="scope">
            <el-image
              style="width: 80px; height: 80px"
              :src="scope.row.url"
              :zoom-rate="1.2"
              :preview-src-list="[scope.row.url]"
              :initial-index="4"
              fit="cover"
              preview-teleported
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="path"
          label="文件路径"
          align="center"
          min-width="300"
        />
        <el-table-column
          prop="create_time"
          label="创建时间"
          align="center"
          width="180"
        />
        <el-table-column
          prop=""
          label="操作"
          width="100"
          align="center"
        >
          <template #default="scope">
            <el-button
              type="danger"
              size="small"
              :disabled="scope.row.children && scope.row.children.length > 0"
              @click="handleDeleteResource(scope.row)"
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
        @size-change="getResourceList(searchInfo)"
        @current-change="getResourceList(searchInfo)"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
.resource-manage {
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-bottom: 10px;
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
