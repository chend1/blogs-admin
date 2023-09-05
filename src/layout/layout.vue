<script setup>
import { Operation, ArrowDown } from '@element-plus/icons-vue';
import { useMainStore } from '@/store';
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { param2Obj } from '@/utils';
import PersonCenter from '@/components/PersonCenter.vue';
import MenuItem from './components/MenuItem.vue';
import logoImg from '../assets/images/logo.png';

const baseStore = useMainStore();
const isCollapse = ref(false);

// 面包屑
const linkList = computed(() => baseStore.linkList);

// 退出登录
const logOutClick = () => {
  baseStore.logOut();
};
// // 关于我们点击
// const aboutClick = () => {
//   console.log(123);
// };
// 移除记录
const removeTab = (path) => {
  baseStore.deleteLink(path, path === routeKey.value);
};
const router = useRouter();
const tabClick = (tab) => {
  // console.log(tab.props.name);
  const query = param2Obj(tab.props.name);
  // console.log(query);
  router.push({
    path: tab.props.name,
    query,
  });
};
const route = useRoute();
const routeKey = ref('');
let url = `${route.path}?`;
Object.keys(route.query).forEach((key) => {
  url += `${key}=${route.query[key]}&`;
});
routeKey.value = url.slice(0, -1);
// 页面级路由
router.beforeEach((to, from, next) => {
  let path = `${to.path}?`;
  Object.keys(to.query).forEach((key) => {
    path += `${key}=${to.query[key]}&`;
  });
  routeKey.value = path.slice(0, -1);
  next();
});

// 个人中心点击
const isShow = ref(false);
const personCenterClick = () => {
  isShow.value = !isShow.value;
  console.log('个人中心');
};
</script>

<template>
  <div class="layout">
    <div
      class="aside dark"
      :class="{ collapse: isCollapse }"
    >
      <div class="title">
        <div class="logo">
          <img
            :src="logoImg"
            alt="后台管理系统"
            title="后台管理系统"
          />
        </div>
        <span
          v-show="!isCollapse"
          style="white-space: nowrap"
        >后台管理系统</span>
      </div>
      <div class="menu-wrap">
        <el-menu
          :default-active="$route.path"
          class="menu-list el-menu-vertical-demo"
          :collapse="isCollapse"
          :router="true"
        >
          <template
            v-for="item in baseStore.menuList.filter(item => item.status === 1)"
            :key="item.path"
          >
            <MenuItem :menu-info="item"></MenuItem>
          </template>
        </el-menu>
      </div>
    </div>
    <div class="article">
      <div class="head">
        <div class="menu">
          <div
            class="icon"
            @click="isCollapse = !isCollapse"
          >
            <el-icon><Operation /></el-icon>
          </div>
          <div class="list">
            <el-tabs
              v-model="routeKey"
              type="card"
              class="demo-tabs"
              closable
              size="small"
              @tab-remove="removeTab"
              @tab-click="tabClick"
            >
              <el-tab-pane
                v-for="item in linkList"
                :key="item.path"
                :label="item.name"
                size="small"
                :name="item.path"
                style="background-color: red"
              >
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <div class="user-info">
          <el-dropdown>
            <div class="info">
              <div class="avatar">
                <img
                  :src="baseStore.userInfo.avatar"
                  alt=""
                />
              </div>
              <div class="name">
                {{ baseStore.userInfo.name }}
              </div>
              <el-icon><ArrowDown /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <!-- <el-dropdown-item @click="aboutClick">
                  关于我们
                </el-dropdown-item> -->
                <el-dropdown-item @click="personCenterClick">
                  个人中心
                </el-dropdown-item>
                <el-dropdown-item @click="logOutClick">
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
  <PersonCenter
    v-if="isShow"
    @close="isShow = false"
  ></PersonCenter>
</template>

<style scoped lang="less">
.layout {
  width: 100%;
  height: 100vh;
  display: flex;
  .aside {
    width: 250px;
    transition: all 0.3s;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
    background-color: #f7f9ff;
    color: #333;
    .title {
      width: 100%;
      height: 55px;
      display: flex;
      align-items: center;
      overflow: hidden;
      box-sizing: border-box;
      padding: 0 15px;
      .logo {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        background-color: #fff;
        margin-right: 8px;
        img {
          width: 100%;
        }
      }
    }
    .menu-wrap {
      .menu-list {
        border-right: none;
        --el-menu-bg-color: #f7f9ff;
        // --el-menu-text-color: #ffffff;
        --el-menu-hover-bg-color: #dae4ff;
        --el-menu-text-color: #333;
      }
      :deep(.el-menu-item.is-active) {
        // background-color: #434a50;
        // color: #2e97f8;
        background-color: #7b9eff;
        color: #fff;
      }
    }
  }
  .dark {
    background-color: #192430;
    color: #fff;
    .menu-wrap {
      .menu-list {
        border-right: none;
        --el-menu-bg-color: #192430;
        --el-menu-text-color: #ffffff;
        --el-menu-hover-bg-color: #306bff81;
      }

      :deep(.el-menu-item.is-active) {
        background-color: #306bff;
        color: #fff;
      }
      :deep(.el-popper.is-light) {
        background-color: #192430;
        color: #fff;
      }
    }
  }
  .collapse {
    width: 64px;
    .title {
      padding: 0;
      .logo {
        margin: 0 auto;
      }
    }
  }
  .article {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    // background-color: yellowgreen;
    .head {
      width: 100%;
      height: 50px;
      box-sizing: border-box;
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #fff;
      overflow: hidden;
      .menu {
        flex: 1;
        overflow: hidden;
        font-size: 20px;
        color: #333;
        cursor: pointer;
        display: flex;
        align-items: center;

        .icon {
          &:hover {
            color: #4694fa;
          }
        }
        .list {
          flex: 1;
          overflow: hidden;
          margin-left: 15px;
          :deep(.el-tabs__header) {
            margin-bottom: 0;
          }
          :deep(.el-tabs) {
            --el-tabs-header-height: 30px;
          }
          :deep(.el-tabs__nav-prev) {
            line-height: 34px;
          }
          :deep(.el-tabs__nav-next) {
            line-height: 34px;
          }
          .active {
            :deep(.is-link) {
              color: #4694fa;
            }
          }
        }
      }
      .user-info {
        .info {
          display: flex;
          align-items: center;
          cursor: pointer;
          outline: none;
          .avatar {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            overflow: hidden;
            background-color: #fff;
            margin-right: 5px;
            img {
              width: 100%;
            }
          }
          .name {
            margin-right: 8px;
          }
        }
      }
    }
    .content {
      flex: 1;
      width: 100%;
      background-color: #f8f8f8;
      box-sizing: border-box;
      padding: 10px;
      overflow: hidden;
    }
  }
}
</style>
