<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Close } from '@element-plus/icons-vue';
import RithText from '@/components/RithText.vue';
import UploadImg from '@/components/UploadImg.vue';
import useArticleData from '../articleList/useArticleData';
import useClassificationData from '../classManage/useClassificationData';

const route = useRoute();
const router = useRouter();
const { addArticleClick, editArticleClick, getArticleInfo } = useArticleData();
const { classificationOptions, getClassificationList } = useClassificationData();
getClassificationList();
// 文章信息
const articleInfo = ref({});
const isAdd = ref(false);
onMounted(async () => {
  console.log(route.query);
  isAdd.value = route.query.isAdd === 'true';
  if (route.query.id) {
    const res = await getArticleInfo({ id: route.query.id });
    articleInfo.value = {
      ...res,
      keyword: res.keyword ? res.keyword.split(',') : [],
      tags: res.tags ? res.tags.split(',') : [],
    };
    console.log(res);
  }
});
// 返回
const closeClick = () => {
  router.back();
};
// 表单规则
const rules = {
  title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
  class_id: [{ required: true, message: '请选择分类', trigger: 'blur' }],
  thumbnail: [{ required: true, message: '请选择缩略图', trigger: 'blur' }],
  content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }],
};

const editorRef = ref();
const formRef = ref();
// 保存图片
const saveImgClick = (src) => {
  articleInfo.value.thumbnail = src;
};
// 保存文章
const handleSave = (type) => {
  const res = editorRef.value.handleSave();
  articleInfo.value.content = res.text ? res.html : '';
  formRef.value.validate((valid) => {
    if (valid) {
      const params = { ...articleInfo.value };
      params.keyword = params.keyword.length ? params.keyword.join(',') : '';
      params.tags = params.tags.length ? params.tags.join(',') : '';
      params.type = type;
      // console.log(params);
      if (isAdd.value) {
        addArticleClick(params, closeClick);
      } else {
        params.type = articleInfo.value.type;
        editArticleClick(params, closeClick);
      }
    }
  });
};
</script>

<template>
  <div class="article-manage">
    <div class="head">
      <span>{{ isAdd ? '添加文章' : '修改文章' }}</span>
      <div
        class="close"
        @click="closeClick"
      >
        <el-icon><Close /></el-icon>
      </div>
    </div>
    <div class="form">
      <el-form
        ref="formRef"
        :model="articleInfo"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item
          label="所属分类"
          prop="class_id"
        >
          <el-select v-model="articleInfo.class_id">
            <el-option
              v-for="item in classificationOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="文章标题"
          prop="title"
        >
          <el-input
            v-model="articleInfo.title"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            resize="none"
          />
        </el-form-item>
        <el-form-item label="文章作者">
          <el-input v-model="articleInfo.author" />
        </el-form-item>
        <el-form-item label="关键词">
          <el-select
            v-model="articleInfo.keyword"
            multiple
            filterable
            allow-create
            style="width: 90%"
          >
          </el-select>
        </el-form-item>
        <el-form-item label="摘要">
          <el-input
            v-model="articleInfo.abstract"
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            resize="none"
          />
        </el-form-item>
        <el-form-item label="标签">
          <el-select
            v-model="articleInfo.tags"
            multiple
            filterable
            allow-create
            style="width: 90%"
          >
          </el-select>
        </el-form-item>
        <el-form-item
          label="缩略图"
          prop="thumbnail"
        >
          <UploadImg
            :img-url="articleInfo.thumbnail"
            @save-img="saveImgClick"
          />
        </el-form-item>
        <el-form-item
          label="内容"
          prop="content"
        >
          <div class="content">
            <RithText
              ref="editorRef"
              :content="articleInfo.content"
            />
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="operation">
      <el-button @click="closeClick">
        取消
      </el-button>
      <el-button
        v-if="isAdd"
        type="primary"
        @click="handleSave(2)"
      >
        保存草稿
      </el-button>
      <el-button
        v-if="isAdd"
        type="primary"
        @click="handleSave(1)"
      >
        文章发布
      </el-button>
      <el-button
        v-if="!isAdd"
        type="primary"
        @click="handleSave"
      >
        确认修改
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="less">
.article-manage {
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .head {
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    padding: 0 15px;
    justify-content: space-between;
    .close {
      width: 26px;
      height: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background-color: #ccc;
      color: #fff;
      cursor: pointer;
      &:hover {
        background-color: #d8d8d8;
        color: #ff0000;
      }
    }
  }

  .form {
    width: 100%;
    flex: 1;
    box-sizing: border-box;
    padding: 15px 15px 10px;
    overflow-y: auto;
    .content {
      border: 1px solid #dcdfe6;
    }
  }
  .operation {
    width: 100%;
    height: 70px;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    box-sizing: border-box;
    padding: 0 15px;
  }
}
</style>
