import Vue from 'vue';
import Vuex from 'vuex';
import { setCookie, getUserCookie, removeUserCookie } from '../utils/userCookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 用于切换菜单的状态，false表示打开，true表示闭合
    collapsed: false,
    // 存储用户信息
    user: getUserCookie(),
    menuRoutes: [],
  },
  mutations: {
    changeCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    setUserInfo(state, userInfo) {
      state.user = userInfo;
    },
    logout(state) {
      state.user = {
        username: '',
        appkey: '',
        email: '',
        role: '',
      };
    },
    setMenuRoutes(state, routes) {
      const noHiddenRoutes = routes.filter((r) => {
        const obj = r;
        if (!obj.meta.hidden) {
          obj.children = obj.children.filter((c) => !c.meta.hidden);
          return true;
        }
        return false;
      });
      state.menuRoutes = noHiddenRoutes;
    },
  },
  actions: {
    changeCollapsed({ commit }) {
      commit('changeCollapsed');
    },
    setUserInfo({ commit }, userInfo) {
      commit('setUserInfo', userInfo);
      setCookie(userInfo);
    },
    logout({ commit }) {
      commit('logout');
      removeUserCookie();
    },
    setMenuRoutes({ commit }, routes) {
      commit('setMenuRoutes', routes);
    },
  },
  modules: {
  },
});
