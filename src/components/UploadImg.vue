<script setup>
import { ref, watch } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import 'vue-cropper/dist/index.css';
import { VueCropper } from 'vue-cropper';
import { uploadFile } from '@/api';

const props = defineProps({
  imgUrl: {
    type: String,
    default: '',
  },
});
const option = ref({});
const isCropper = ref(false);
const fileChange = (e) => {
  const file = e.target.files[0];
  option.value.name = file.name;
  console.log(file);
  option.value.img = URL.createObjectURL(file);
  option.value.outputType = file.type.split('/')[1];
  isCropper.value = true;
};
const imgSrc = ref('');

const cropperRef = ref();
const emit = defineEmits(['saveImg']);
const screenShotClick = () => {
  cropperRef.value.getCropBlob(async (data) => {
    // console.log(data);
    imgSrc.value = URL.createObjectURL(data);
    const formData = new FormData();
    formData.append('name', option.value.name);
    formData.append('file', data);
    const res = await uploadFile(formData);
    isCropper.value = false;
    emit('saveImg', res.url);
  });
};
watch(() => props.imgUrl, () => {
  imgSrc.value = props.imgUrl;
}, { immediate: true });
const handleClose = () => {
  isCropper.value = false;
  option.value = {};
};
</script>

<template>
  <div class="upload-img">
    <div
      v-if="imgSrc"
      class="img"
    >
      <img
        :src="imgSrc"
        alt=""
      />
    </div>
    <div class="upload">
      <div class="icon">
        <Plus />
      </div>
      <input
        ref="imgRef"
        type="file"
        title="点击上传"
        accept="image/*"
        class="upload-file"
        @change="fileChange"
      />
    </div>
  </div>
  <div
    v-if="isCropper"
    class="img-wrap"
  >
    <div class="cropper">
      <VueCropper
        ref="cropperRef"
        :img="option.img"
        :output-type="option.outputType"
        center-box
        auto-crop
        fixed
      ></VueCropper>
      <div class="operatioin">
        <el-button
          type="primary"
          @click="screenShotClick"
        >
          截图
        </el-button>
        <el-button @click="handleClose">
          取消
        </el-button>
      </div>
    </div>
    <div class="mask"></div>
  </div>
</template>

<style scoped lang="less">
.upload-img {
  width: 100%;
  height: 150px;
  overflow: hidden;
  display: flex;
  .img {
    width: 150px;
    height: 150px;
    border: 1px solid #d8d8d8;
    border-radius: 5px;
    margin-right: 10px;
    img {
      width: 100%;
      // border-radius: 50%;
    }
  }
  .upload {
    width: 150px;
    height: 150px;
    border: 1px solid #d8d8d8;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .icon {
      display: flex;
      width: 36px;
      height: 36px;
      color: #999;
    }
    .upload-file {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }
}
.img-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  .mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .cropper {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 500px;
    height: 500px;
    background-color: #fff;
    border: 1px solid #ddd;
    box-sizing: border-box;
    z-index: 9999;
    transform: translate(-50%, -50%);
    .operatioin {
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 100%;
      box-sizing: border-box;
      padding-right: 20px;
      background-color: #fff;
    }
  }
}
</style>
