import { defineStore } from 'pinia';
import { getUserInfo } from '@/api';
import { getStorage, setStorage, removeStorage } from '@/utils/storage';
import { asyncRoutes } from '@/router/asyncRoutes';
import router, { resetRouter } from '@/router';
import { generateRoutes } from './permission';

export const useMainStore = defineStore('main', {
  state: () => ({
    token: getStorage('token') || '',
    userInfo: {},
    menuList: [],
    linkList: [],
  }),
  actions: {
    setToken(token) {
      setStorage('token', token);
      this.token = token;
    },
    async setUserInfo() {
      const res = await getUserInfo();
      this.userInfo = res.info;
      const { accessibleRoutes, menuList } = await generateRoutes(
        asyncRoutes,
        res.menu,
      );
      // console.log('accessibleRoutes, menuList', accessibleRoutes, menuList);
      this.menuList = menuList;
      accessibleRoutes.forEach((route) => {
        router.addRoute(route);
      });
      // 必须最后加上404跳转路由，不然刷新会直接跳转404
      router.addRoute({ path: '/:pathMatch(.*)', redirect: '/404' });
    },
    setLinkList(link) {
      let url = `${link.path}?`;
      Object.keys(link.query).forEach((key) => {
        url += `${key}=${link.query[key]}&`;
      });
      url = url.slice(0, -1);
      const item = {
        path: url,
        name: link.name,
      };
      const list = this.linkList.filter(
        (i) => i.path === url,
      );
      if (list.length <= 0) {
        this.linkList.push(item);
      }
      // list.push(link);
      // this.linkList = list;
    },
    deleteLink(path, type) {
      const idx = this.linkList.findIndex((item) => item.path === path);
      this.linkList.splice(idx, 1);
      if (type) {
        const url = this.linkList[this.linkList.length - 1].path;
        router.push(url);
      }
    },
    logOut() {
      removeStorage('token');
      this.token = '';
      this.userInfo = {};
      this.menuList = [];
      resetRouter();
      router.push('/login');
    },
  },
  getters: {},
});
