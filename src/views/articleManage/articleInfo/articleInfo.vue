<script setup>
import {
  ref, onMounted, computed, watch,
} from 'vue';
import { useRoute } from 'vue-router';
import {
  Pointer, ChatRound, Position, Star,
} from '@element-plus/icons-vue';
import { useMainStore } from '@/store';
import SendComment from '@/components/SendComment.vue';
import CommentList from '@/components/CommentList.vue';
import useArticleData from '../articleList/useArticleData';
import useCommentData from '../commentManage/useCommentData';

const { getArticleInfo } = useArticleData();
const {
  commentData,
  getCommentList,
  addCommentClick,
  // editCommentClick,
  // deleteCommentClick
} = useCommentData();

const articleInfo = ref({});
const route = useRoute();
watch((() => route.query), () => {
  if (route.query.id) {
    getArticleDetail();
  }
});
onMounted(async () => {
  if (route.query.id) {
    getArticleDetail();
  }
});
// 获取文章详情
const getArticleDetail = async () => {
  const res = await getArticleInfo({ id: route.query.id });
  articleInfo.value = res;
  getCommentList({
    id: route.query.id,
  });
};

const mainStore = useMainStore();
const userInfo = computed(() => mainStore.userInfo);
// 发布评论
const issueComment = async (val) => {
  await addCommentClick({
    content: val,
    user_id: userInfo.value.id,
    article_id: parseInt(route.query.id),
    user_name: userInfo.value.name,
    user_avatar: userInfo.value.avatar,
    parent_id: 0,
  });
};

// 回复评论
const replyComment = async (params) => {
  await addCommentClick(params);
};

</script>

<template>
  <div class="article-wrap">
    <div class="article-info">
      <div class="title">
        <h1>
          {{ articleInfo.title }}
        </h1>
      </div>
      <div class="info">
        <div class="author">
          作者：{{ articleInfo.author }}
        </div>
        <div class="time">
          发布时间：{{ articleInfo.create_time }}
        </div>
      </div>
      <div class="content editor-content-view">
        <div v-html="articleInfo.content"></div>
      </div>
      <div class="bottom">
        <ul>
          <li>
            <div class="icon">
              <el-icon><Pointer /></el-icon>
            </div>
            <div class="cnt">
              {{ articleInfo.view }}
              <span>赞同</span>
            </div>
          </li>
          <li>
            <div class="icon">
              <el-icon><ChatRound /></el-icon>
            </div>
            <div class="cnt">
              {{ articleInfo.comment }}
              <span>评论</span>
            </div>
          </li>
          <li>
            <div class="icon">
              <el-icon><Position /></el-icon>
            </div>
            <div class="cnt">
              <span>分享</span>
            </div>
          </li>
          <li>
            <div class="icon">
              <el-icon><Star /></el-icon>
            </div>
            <div class="cnt">
              {{ articleInfo.star }}
              <span>收藏</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="comment-send">
        <SendComment
          @issue-comment="issueComment"
        />
      </div>
      <div class="comment">
        <div class="list">
          <CommentList
            v-if="commentData.length"
            :comment-data="commentData"
            :article-info="articleInfo"
            @reply-comment="replyComment"
          />
          <div
            v-if="!commentData.length"
            class="none"
          >
            暂无评论
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.article-wrap {
  width: 100%;
  height: 100%;
  background-color: #f7f7f7;
  box-sizing: border-box;
  padding: 10px;
}
.article-info {
  width: 100%;
  max-width: 1000px;
  height: 100%;
  background-color: #fff;
  box-sizing: border-box;
  padding: 10px;
  margin: 0 auto;
  overflow-y: auto;
  user-select: text;
  .title {
    width: 100%;
    line-height: 40px;
    h1 {
      font-size: 32px;
      text-align: center;
    }
  }
  .info {
    width: 100%;
    display: flex;
    justify-content: center;
    .author {
      margin-right: 20px;
      font-size: 14px;
      color: #072b8f;
      font-weight: bold;
    }
    .time {
      font-size: 14px;
      color: #999;
    }
  }
  .bottom {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    user-select: none;
    ul {
      display: flex;
      align-items: center;
      font-size: 14px;
      li {
        margin-right: 25px;
        display: flex;
        align-items: center;

        .icon {
          margin-right: 2px;
          font-size: 16px;
          padding-top: 2px;
        }
        .cnt {
          span {
            color: #666;
          }
        }
      }
    }
  }
  .comment-send {
    width: 100%;
    box-sizing: border-box;
    padding: 0 10px;
  }
  .comment {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    .list {
      width: 100%;
      border: 1px solid #eee;
      box-sizing: border-box;
      padding: 5px 15px;

      .none {
        text-align: center;
        font-size: 14px;
        color: #999;
        line-height: 120px;
      }
    }
  }
}
</style>
