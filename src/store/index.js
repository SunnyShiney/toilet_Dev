import { createStore } from "vuex";
import { login,getInfo } from "~/api/manager";
import { setToken,removeToken } from "~/composables/auth";
// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      //用户信息
      user: {},
    };
  },
  mutations: {
    //记录用户信息
    SET_USERINFO(state, user) {
      state.user = user;
    },
  },
  actions: {
    //登录
    //第一个 "login" 是一个 Vuex action，用于组织和触发登录逻辑，以及处理响应和状态管理。
    //第二个 "login" 是~/api/manager文件中定义的方法，执行实际的登录请求，将用户名和密码发送到服务器。
    login({ commit }, { username, password }) {
      return new Promise((resolve, reject) => {
        login(username, password)
          .then((res) => {
            //存储token
            setToken(res.token);
            resolve(res);
          })
          .catch((err) => reject(err));
      });
    },
    //获取当前登录用户信息
    //commit用于提交mutation
    getInfo({ commit }) {
      //Promise对象，用于异步处理用户信息的获取
      return new Promise((resolve, reject) => {
        getInfo()
          .then((res) => {
            commit("SET_USERINFO", res);
            resolve(res);
          })
          .catch((err) => reject(err));
      });
    },
    //退出登录
    logout({ commit}) {
      //移除cookie里的token  这个封装在auth.js中
      removeToken();
      //清除当前用户的状态
      commit("SET_USERINFO", {});
    }
  },
});
export default store