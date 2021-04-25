import Vue from 'vue';
import VueRouter from 'vue-router';
import getMeueRoute from '@/utils/permission';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';
import store from '../store/index';

Vue.use(VueRouter);
const asyncRouterMap = [{
  path: '/product',
  name: 'Product',
  meta: {
    title: '商品',
    hidden: false,
  },
  component: Home,
  children: [{
    path: 'list',
    name: 'ProductList',
    meta: {
      title: '商品列表',
      hidden: false,
    },
    component: () => import('../views/page/ProductList.vue'),
  },
  {
    path: 'add',
    name: 'ProductAdd',
    meta: {
      title: '新增商品',
      hidden: false,
    },
    component: () => import('../views/page/ProductAdd.vue'),
  },
  {
    path: 'edit/:id',
    name: 'ProductEdit',
    meta: {
      title: '编辑商品',
      hidden: false,
    },
    component: () => import('../views/page/ProductAdd.vue'),
  },
  {
    path: 'category',
    name: 'category',
    meta: {
      title: '类目管理',
      hidden: false,
    },
    component: () => import('../views/page/category.vue'),
  },
  ],
}];

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/index',
    component: Home,
    meta: {
      title: '首页',
      hidden: false,
    },
    children: [{
      path: 'index',
      name: 'Index',
      meta: {
        title: '统计',
        hidden: false,
      },
      // 懒加载
      component: () => import('../views/page/index.vue'),
    }],
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      hidden: true,
    },
    component: Login,
  },
];

const router = new VueRouter({
  routes,
});

let isAddroutes = false;
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.user.appkey && store.state.user.username && store.state.user.role) {
      if (!isAddroutes) {
        const allowRoute = getMeueRoute(store.state.user.role, asyncRouterMap);
        store.dispatch('setMenuRoutes', routes.concat(allowRoute)).then(() => {
          // 因为dispatch是异步的，可能还没执行完就调到后面的next了
          router.addRoutes(allowRoute);
          next();
        });
        isAddroutes = !isAddroutes;
      }
      return next();
    }
    return next('/login');
  }
  return next();
});
export default router;
