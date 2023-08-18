export const asyncRoutes = [
  {
    path: '/home',
    component: () => import('@/views/home/home.vue'),
    name: 'home',
    meta: { title: '首页', isLayout: true },
  },
  {
    path: '/power',
    redirect: '/power/userManage',
    meta: { title: '权限管理', isLayout: true },
    name: 'power',
    children: [
      {
        path: '/power/userManage',
        component: () => import('@/views/power/userManage/userManage.vue'),
        meta: { title: '账号管理', isLayout: true },
        name: 'userManage',
      },
      {
        path: '/power/roleManage',
        component: () => import('@/views/power/roleManage/roleManage.vue'),
        meta: { title: '角色管理', isLayout: true },
        name: 'roleManage',
      },
      {
        path: '/power/menuManage',
        component: () => import('@/views/power/menuManage/menuManage.vue'),
        meta: { title: '菜单管理', isLayout: true },
        name: 'menuManage',
      },
    ],
  },
  {
    path: '/article',
    redirect: '/articleList',
    meta: { title: '文章管理', isLayout: true },
    name: 'Article',
    children: [
      {
        path: '/articleList',
        component: () => import('@/views/articleManage/articleList/articleList.vue'),
        meta: { title: '文章管理', isLayout: true },
        name: 'articleList',
      },
      {
        path: '/commentManage',
        component: () => import('@/views/articleManage/commentManage/commentManage.vue'),
        meta: { title: '评论管理', isLayout: true },
        name: 'commentManage',
      },
      {
        path: '/classificationManage',
        component: () => import('@/views/articleManage/classManage/classManage.vue'),
        meta: { title: '分类管理', isLayout: true },
        name: 'classifyManage',
      },
      {
        path: '/tagsManage',
        component: () => import('@/views/articleManage/tagsManage/tagsManage.vue'),
        meta: { title: '标签管理', isLayout: true },
        name: 'tagsManage',
      },
      {
        path: '/writeArticle',
        component: () => import('@/views/articleManage/writeArticle/writeArticle.vue'),
        meta: { title: '文章编辑', isLayout: true },
        name: 'writeArticle',
      },
      {
        path: '/articleInfo',
        component: () => import('@/views/articleManage/articleInfo/articleInfo.vue'),
        meta: { title: '文章详情', isLayout: true },
        name: 'articleInfo',
      },
    ],
  },
];
