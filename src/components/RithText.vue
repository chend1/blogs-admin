<script setup>
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import {
  onBeforeUnmount, ref, shallowRef,
} from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

const editorRef = shallowRef();
// 内容 HTML
const valueHtml = ref('');
const toolbarConfig = {};
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      server: '/api/upload',
      base64LimitSize: 500 * 1024, // 5kb
    },
  },
};

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
const handleSave = () => ({
  html: valueHtml.value,
  text: editorRef.value.getText(),
});
defineExpose({
  handleSave,
});
</script>

<template>
  <div class="rith-text">
    <Toolbar
      ref="editor"
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :default-config="toolbarConfig"
      mode="default"
    />
    <Editor
      v-model="valueHtml"
      style="height: 500px; overflow-y: hidden;"
      :default-config="editorConfig"
      mode="default"
      @on-created="handleCreated"
    />
    <!-- <div class="operation">
      <div
        class="btn"
        @click="handleSave"
      >
        保存
      </div>
    </div> -->
  </div>
</template>

<style scoped lang="less">
.rith-text {
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-sizing: border-box;

  .title {
    width: 100%;
    line-height: 50px;
    box-sizing: border-box;
    padding: 0 10px;
    border-bottom: 1px solid #aaa;
    display: flex;

    .value {
      margin-left: 20px;
      a {
        display: inline-block;
        color: #6c9bf1;
      }
    }
  }

  .operation {
    width: 100%;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: flex-end;

    .btn {
      width: 100px;
      line-height: 35px;
      text-align: center;
      border: 1px solid #eee;
      border-radius: 5px;
      margin: 10px 10px 0 0;
      cursor: pointer;

      &:hover {
        background-color: #eee;
      }
    }
  }
}
</style>
