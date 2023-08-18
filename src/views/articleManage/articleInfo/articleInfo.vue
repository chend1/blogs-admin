<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import {
  Pointer, ChatRound, Position, Star,
} from '@element-plus/icons-vue';
import useArticleData from '../articleList/useArticleData';

const { getArticleInfo } = useArticleData();
const articleInfo = ref({});
const route = useRoute();

const comment = ref('');
onMounted(async () => {
  if (route.query.id) {
    const res = await getArticleInfo({ id: route.query.id });
    console.log(res);
    articleInfo.value = res;
  }
});
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
      <div class="send-comment">
        <div class="user">
          <div class="img"></div>
        </div>
        <div class="message">
          <el-input
            v-model="comment"
            type="textarea"
            autosize
            placeholder="请输入内容"
            resize="none"
          ></el-input>
          <div
            v-if="comment"
            class="tool"
          >
            <div class="meme">
              <ul>
                <li>😀</li>
                <li>😁</li>
                <li>😂</li>
                <li>😳</li>
                <li>🤣</li>
                <li>😙</li>
                <li>🤑</li>
                <li>😝</li>
                <li>😜</li>
                <li>😠</li>
              </ul>
            </div>
            <div class="btn">
              发布
            </div>
          </div>
        </div>
      </div>
      <div class="comment">
        <div class="list">
          <div class="none">
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
        .cnt{
          span{
            color: #666;
          }
        }
      }
    }
  }
  .send-comment {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    overflow: hidden;
    .user {
      width: 40px;
      height: 40px;
      margin-right: 10px;
      .img {
        width: 100%;
        height: 100%;
        background-color: #ccc;
        border-radius: 50%;
      }
    }
    .message {
      flex: 1;
      overflow: hidden;
      margin-top: 5px;
      .tool {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .meme {
          ul {
            display: flex;
            li {
              font-size: 16px;
              padding-top: 2px;
              cursor: pointer;
              padding: 5px;
              &:hover{
                background-color: #f0efef;
              }
            }
          }

        }
        .btn{
            width: 80px;
            line-height: 30px;
            text-align: center;
            border-radius: 3px;
            cursor: pointer;
            background-color: #4e7dfd;
            color: #fff;
            font-size: 14px;
            &:hover{
              background-color: #5884fa;
            }
          }
      }
    }
  }
  .comment {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    .list {
      width: 100%;
      border: 1px solid #eee;
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
