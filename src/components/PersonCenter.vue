<script setup>
import { Close } from '@element-plus/icons-vue';
import UploadImg from '@/components/UploadImg.vue';
import { ref } from 'vue';
import { editUserInfo, editUserPassword } from '@/api';
import { useMainStore } from '@/store';

const emit = defineEmits(['close', 'confirmClick']);
const activeName = ref('first');
const baseStore = useMainStore();
const userInfo = ref({});
userInfo.value = { ...baseStore.userInfo, password: '' };
// 确认修改
const formRef = ref();
const userFormRef = ref();
const passwordRule = {
  old_password: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
  password: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
  again_password: [{ required: true, message: '请确认新密码', trigger: 'blur' }],
};
const userRules = {
  name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  avatar: [{ required: true, message: '请选择头像', trigger: 'blur' }],
};
const confirmClick = () => {
  if (activeName.value === 'first') {
    userFormRef.value.validate(async (valid) => {
      if (valid) {
        await editUserInfo(userInfo.value);
        emit('confirmClick', userInfo.value);
      }
    });
  } else {
    formRef.value.validate(async (valid) => {
      if (valid) {
        await editUserPassword(userInfo.value);
        emit('confirmClick', userInfo.value);
      }
    });
  }
};
// 保存图片
const saveImgClick = (src) => {
  userInfo.value.avatar = src;
};
</script>

<template>
  <div class="person-center">
    <div class="head">
      <div class="title">
        个人中心
      </div>
      <div
        class="close"
        @click="emit('close')"
      >
        <el-icon>
          <Close />
        </el-icon>
      </div>
    </div>
    <div class="list">
      <el-tabs
        v-model="activeName"
        class="demo-tabs"
      >
        <el-tab-pane
          label="个人信息"
          name="first"
        >
          <el-form
            ref="userFormRef"
            label-width="80px"
            :rules="userRules"
            :model="userInfo"
          >
            <el-form-item
              label="用户名"
              prop="name"
            >
              <el-input v-model="userInfo.name"></el-input>
            </el-form-item>
            <el-form-item
              label="手机号"
              prop="phone"
            >
              <el-input v-model="userInfo.phone"></el-input>
            </el-form-item>
            <el-form-item
              label="头像"
              prop="avatar"
            >
              <UploadImg
                :img-url="userInfo.avatar"
                :style-obj="{ width: '100px', height: '100px' }"
                @save-img="saveImgClick"
              />
            </el-form-item>
            <el-form-item
              label="邮箱"
              prop="email"
            >
              <el-input v-model="userInfo.email"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane
          label="密码修改"
          name="second"
        >
          <el-form
            ref="formRef"
            label-width="80px"
            :rules="passwordRule"
            :model="userInfo"
          >
            <el-form-item
              label="原密码"
              prop="old_password"
            >
              <el-input
                v-model="userInfo.old_password"
                type="password"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item
              label="新密码"
              prop="password"
            >
              <el-input
                v-model="userInfo.password"
                type="password"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item
              label="确认密码"
              prop="again_password"
            >
              <el-input
                v-model="userInfo.again_password"
                type="password"
                show-password
              ></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="bottom">
      <el-button @click="emit('close')">
        取 消
      </el-button>
      <el-button
        type="primary"
        @click="confirmClick"
      >
        确 定
      </el-button>
    </div>
  </div>
  <div class="mask"></div>
</template>

<style lang="less" scoped>
.mask {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9;
}
.person-center {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  z-index: 2000;
  background-color: #fff;
  border-radius: 3px;
  box-sizing: border-box;
  width: 700px;
  height: 600px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .head {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    padding: 0 10px;
    .title {
      font-size: 16px;
      font-weight: bold;
    }
    .close {
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;
      color: #333;
      &:hover {
        color: #f03918;
      }
    }
  }
  .list {
    flex: 1;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 0 20px;
    ul {
      width: 100%;
      li {
        line-height: 35px;
        background-color: #eee;
        text-align: center;
        margin: 5px 0;
        cursor: pointer;
        user-select: none;
      }
    }
  }
  .bottom {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-top: 1px solid #eee;
    box-sizing: border-box;
    padding: 0 10px;
  }
}
</style>
