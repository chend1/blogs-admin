import { createApp, createVNode } from 'vue';
import { createPinia } from 'pinia';
// 样式初始化
import 'normalize.css/normalize.css'; // CSS重置
import './styles/reset.less';
// element导入
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// import 'element-plus/theme-chalk/dark/css-vars.css';
// icon图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
// 路由
import svgIcon from '@/assets/svg/index.vue';
import router from './router';
// 自定义svg
// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register';

// 路由守卫
import './router/guard';
import App from './App.vue';

// mock拦截请求
// import { mockXHR } from '../mock/index';

// if (import.meta.env.MODE === 'development') {
//   mockXHR();
// }

// 状态管理
const pinia = createPinia();
const app = createApp(App);

// 饿了么图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
const Icon = (props) => {
  const { icon } = props;
  return createVNode(ElementPlusIconsVue[icon]);
};
app.component('Icon', Icon);

// 自定义svg
app.component('SvgIcon', svgIcon);

app.use(pinia).use(ElementPlus).use(router)
  .mount('#app');
