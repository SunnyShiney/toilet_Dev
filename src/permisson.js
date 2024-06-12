import router from '~/router'
import { getToken } from "~/composables/auth"
import { toast,showFullLoading,hideFullLoading } from '~/composables/util'
import store from './store'

//hasGetInfo是为了只请求一次getInfo,优化点击菜单加载速度
let hasGetInfo = false
//全局前置守卫 每次路径变化都会触发这个方法
//to.path是要到达的路径，from.path是从哪里来
router.beforeEach(async (to, from, next) => {
    //显示loading
    showFullLoading()
    const token = getToken()
    //没有登录时，强制跳转回登录页
    if (
      !token &&
      to.path != "/login" &&
      to.path != "/tvMap" &&
      to.path != "/mobileTvMap" &&
      to.path != "/evlForm" &&
      to.path != "/submitSuccess" &&
      to.path != "/" &&
      to.path != "/map" &&
      to.path != "/wcAnalysis/alert" &&
      to.path != "/wcAnalysis/elcflow" &&
      to.path != "/wcAnalysis/evaluation" &&
      to.path != "/wcAnalysis/parflow" &&
      to.path != "/wcAnalysis/wtrflow" &&
      to.path != "/wcAnalysis/psgflow" &&
      to.path != "/lcnMir" &&
      to.path != "/wcManage" &&
      to.path != "/home" &&
      to.path != "/toiletsData" &&
      to.path != "/*" &&
      to.path != "/wcQuery" &&
      to.path != "/wcAnalysis/zzxFlow" &&
      to.path != "/wcAnalysis/fqFlow" &&
      to.path != "/wcAnalysis/allFlow"
    ) {
      toast("请先登录！", "error");
      return next({ path: "/login" });
    }

    //防止重复登录
    if (token && to.path == "/login") {
        toast("请勿重复登录！","error")
        return next({path:from.path ? from.path :"/"})
    }

    //如果用户登录了，自动获取用户信息，并存储在vuex当中
    //store.dispatch 是 Vuex 中用于触发一个 action 的方法。在 Vuex 中，actions 是用于处理异步操作和提交 mutations 的地方。通过 store.dispatch，你可以触发一个指定的 action，以执行一些异步操作，如数据获取、API 请求等，然后在 action 中提交 mutations 来修改应用程序的状态。
    if (token && !hasGetInfo) {
        //axios是异步操作，所以要加上async和await
        await store.dispatch("getInfo")
        hasGetInfo=true
    }


    //设置页面标题
    let title = (to.meta.title ? to.meta.title : "") + "-金牛区智慧厕所引导系统"
    document.title = title


    //放行
    next()
});

//全局后置钩子 页面渲染完之后会触发
router.afterEach((to, from) => {
  hideFullLoading();
});