<script setup>
import { ref } from 'vue';
import SendComment from '@/components/SendComment.vue';
import { CaretRight } from '@element-plus/icons-vue';

defineProps({
  commentData: {
    type: Array,
    default: () => [],
  },
  articleInfo: {
    type: Object,
    default: () => ({}),
  },
});
// 回复信息
const replyInfo = ref({});
// 点击回复
const replyClick = (row) => {
  replyInfo.value = { ...row };
  row.is_reply = !row.is_reply;
};
// 回复评论
const emit = defineEmits(['replyComment']);
const replyComment = async (val) => {
  emit('replyComment', val);
};
</script>

<template>
  <ul
    v-if="commentData.length"
  >
    <li
      v-for="(item, index) in commentData"
      :key="index"
    >
      <div class="img">
        <img :src="item.user_avatar" />
      </div>
      <div class="content-info">
        <div class="name">
          {{ item.user_name }}
          <span
            v-if="articleInfo && item.user_id === articleInfo.user_id"
            class="author"
          >作者</span>
          <div
            v-if="item.reply_user_name"
            class="other"
          >
            <el-icon><CaretRight /></el-icon>
            <span>{{ item.reply_user_name }}</span>
          </div>
        </div>
        <div class="content">
          {{ item.content }}
        </div>
        <div class="comment-bottom">
          <div class="time">
            {{ item.create_time }}
          </div>
          <div class="operation">
            <div
              class="btn"
              @click.stop="replyClick(item)"
            >
              <el-icon class="icon">
                <ChatRound />
              </el-icon>
              <span>回复</span>
            </div>
            <div class="btn">
              <el-icon class="icon">
                <Position />
              </el-icon>
              <span>置顶</span>
            </div>
          </div>
        </div>
        <SendComment
          v-if="item.is_reply"
          :is-reply="true"
          :reply-info="replyInfo"
          @reply-comment="replyComment"
        />
        <CommentList
          :comment-data="item.children"
          :article-info="articleInfo"
          @reply-comment="replyComment"
        ></CommentList>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="less">
ul {
  width: 100%;
  li {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    overflow: hidden;
    padding: 10px 0;
    .img {
      width: 50px;
      height: 50px;
      background-color: #eee;
      border-radius: 3px;
      overflow: hidden;
      margin: 0 10px 0 0;
      img {
        width: 100%;
      }
    }
    .content-info {
      flex: 1;
      color: #333;
      .name {
        font-weight: 700;
        font-size: 16px;
        display: flex;
        align-items: center;
        .author {
          display: inline-block;
          padding: 0 10px;
          background-color: #eee;
          font-size: 12px;
          line-height: 20px;
          color: #666;
          border-radius: 3px;
          margin-left: 5px;
        }
        .other{
          display: flex;
          align-items: center;
          margin: 0 5px;
          span{
            margin-left: 5px;
          }
        }
      }
      .content {
        line-height: 26px;
        margin: 5px 0 10px;
      }
      .comment-bottom {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .time {
          font-size: 14px;
          color: #666;
        }
        .operation {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          .btn {
            display: flex;
            align-items: center;
            cursor: pointer;
            margin-left: 10px;
            color: #555;
            font-size: 14px;
            .icon {
              margin: 2px 3px 0 0;
            }
            &:hover {
              color: #5884fa;
            }
          }
        }
      }
    }
  }
}
</style>
