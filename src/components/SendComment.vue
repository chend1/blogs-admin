<script setup>
import { ref, computed } from 'vue';
import { useMainStore } from '@/store';
import { useRoute } from 'vue-router';

const mainStore = useMainStore();
const userInfo = computed(() => mainStore.userInfo);
const route = useRoute();
const props = defineProps({
  isReply: {
    type: Boolean,
    default: false,
  },
  replyInfo: {
    type: Object,
    default: () => ({}),
  },
});

const comment = ref('');
const isStart = ref(false);
const memeList = ['😀', '😁', '😂', '😳', '🤣', '😙', '🤑', '😝', '😜', '😠'];
const memeClick = (item) => {
  comment.value += item;
};
const emit = defineEmits(['issueComment', 'replyComment']);
const issueComment = () => {
  if (props.isReply) {
    const params = {
      content: comment.value,
      user_id: userInfo.value.id,
      article_id: parseInt(route.query.id),
      user_name: userInfo.value.name,
      user_avatar: userInfo.value.avatar,
      parent_id: props.replyInfo.parent_id || props.replyInfo.id,
      reply_user_id: props.replyInfo.user_id,
      reply_user_name: props.replyInfo.user_name,
      reply_user_avatar: props.replyInfo.user_avatar,
    };
    emit('replyComment', params);
  } else {
    emit('issueComment', comment.value);
  }
  comment.value = '';
  isStart.value = false;
};
</script>

<template>
  <div class="send-comment">
    <div
      v-if="!isReply"
      class="user"
    >
      <div class="img"></div>
    </div>
    <div class="message">
      <el-input
        v-model="comment"
        type="textarea"
        autosize
        placeholder="请输入内容"
        resize="none"
        @focus="isStart = true"
      ></el-input>
      <div
        v-if="comment || isStart || isReply"
        class="tool"
      >
        <div class="meme">
          <ul>
            <li
              v-for="(item, index) in memeList"
              :key="index"
              @click="memeClick(item)"
            >
              {{ item }}
            </li>
          </ul>
        </div>
        <div
          class="btn"
          @click="issueComment"
        >
          {{ isReply ? '回复' : '发布' }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.send-comment {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 0;
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
      border-radius: 3px;
      overflow: hidden;
      img {
        width: 100%;
      }
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
        user-select: none;
        ul {
          display: flex;
          li {
            font-size: 16px;
            padding-top: 2px;
            cursor: pointer;
            padding: 5px;
            &:hover {
              background-color: #f0efef;
            }
          }
        }
      }
      .btn {
        width: 80px;
        line-height: 30px;
        text-align: center;
        border-radius: 3px;
        cursor: pointer;
        background-color: #4e7dfd;
        color: #fff;
        font-size: 14px;
        &:hover {
          background-color: #5884fa;
        }
      }
    }
  }
}
</style>
