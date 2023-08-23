<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import useArticleData from './useArticleData';
import useClassificationData from '../classManage/useClassificationData';

const { getClassificationName, getClassificationList } = useClassificationData();
getClassificationList();
const {
  articleData,
  total,
  getArticleList,
  deleteArticleClick,
  issueArticleClick,
} = useArticleData();
// 搜索信息
const searchInfo = reactive({
  page: 1,
  size: 10,
  keyword: '',
});
getArticleList(searchInfo);
// 添加文章
const router = useRouter();
const handleAddArticle = () => {
  router.push({
    path: '/writeArticle',
    query: {
      isAdd: true,
    },
  });
};

// 修改文章
const handleEditArticle = (row) => {
  router.push({
    path: '/writeArticle',
    query: {
      isAdd: false,
      id: row.id,
    },
  });
};
const handleLookArticle = (row) => {
  router.push({
    path: '/articleInfo',
    query: {
      id: row.id,
    },
  });
};

// 删除文章
const handleDeleteArticle = (row) => {
  deleteArticleClick({ id: row.id });
};
</script>

<template>
  <div class="article-manage">
    <div class="add-article">
      <el-button
        type="primary"
        @click="handleAddArticle"
      >
        添加文章
      </el-button>
    </div>
    <div class="table">
      <el-table
        :data="articleData"
        border
        :header-cell-style="{ 'background-color': '#DDE2EE' }"
        align="center"
        height="100%"
      >
        <el-table-column
          prop="title"
          label="标题"
          min-width="80"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          prop="class_id"
          label="所属分类"
          align="center"
        >
          <template #default="scope">
            {{ getClassificationName(scope.row.class_id) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="view"
          label="浏览量"
          align="center"
        />
        <el-table-column
          prop="type"
          label="状态"
          align="center"
        >
          <template #default="scope">
            {{ scope.row.type === 1 ? '已发布' : '草稿' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          align="center"
          width="170"
        />
        <el-table-column
          prop=""
          label="操作"
          :min-width="140"
          align="center"
          fixed="right"
        >
          <template #default="scope">
            <el-button
              v-if="scope.row.type === 2"
              type="success"
              size="small"
              @click="issueArticleClick({ id: scope.row.id, type: 1 })"
            >
              发布
            </el-button>
            <el-button
              type="primary"
              size="small"
              plain
              @click="handleLookArticle(scope.row)"
            >
              查看
            </el-button>

            <el-button
              type="primary"
              size="small"
              @click="handleEditArticle(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click="handleDeleteArticle(scope.row)"
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
        @size-change="getArticleList(searchInfo)"
        @current-change="getArticleList(searchInfo)"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
.article-manage {
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-sizing: border-box;
  padding: 10px;
  .add-article {
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
