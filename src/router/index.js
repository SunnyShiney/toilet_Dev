import { createRouter, createWebHashHistory } from "vue-router";

//引入主页
import Home from "~/pages/home.vue";
import Map from "~/pages/map.vue";
import NotFound from "~/pages/404.vue"
import Login from "~/pages/login.vue"
import EvlForm from "~/pages/evlForm.vue";
import TvMap from "~/pages/tvMap.vue"
import MobileTvMap from "~/pages/mobileTvMap.vue";
import SubmitSuccess from "~/pages/submitSuccess.vue";

import ToiletsData from "~/pages/toiletsData.vue"
import Admin from "~/layouts/admin.vue"
import Alert from "~/pages/wcAnalysis/alert.vue"
import Elcflow from "~/pages/wcAnalysis/elcflow.vue";
import Evaluation from "~/pages/wcAnalysis/evaluation.vue";
import Parflow from "~/pages/wcAnalysis/parflow.vue";
import Wtrflow from "~/pages/wcAnalysis/wtrflow.vue";
import Psgflow from "~/pages/wcAnalysis/psgflow.vue";

import LcnMir from "~/pages/lcnMir.vue";
import WcQuery from "~/pages/wcQuery.vue";
import WcManage from "~/pages/wcManage.vue";


// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// const routes = [
//   { path: '/', component: Home },
const routes = [
  {
    path: "/home",
    component: Admin,
    children: [
      {
        path: "/home",
        component: Home,
        meta: {
          title: "首页",
        },
      },
      {
        path: "/wcAnalysis/alert",
        component: Alert,
        meta: {
          title: "警报统计",
        },
      },
      {
        path: "/wcAnalysis/elcflow",
        component: Elcflow,
        meta: {
          title: "用电量统计",
        },
      },
      {
        path: "/wcAnalysis/evaluation",
        component: Evaluation,
        meta: {
          title: "满意度评价统计",
        },
      },
      {
        path: "/wcAnalysis/parflow",
        component: Parflow,
        meta: {
          title: "用纸量统计",
        },
      },
      {
        path: "/wcAnalysis/wtrflow",
        component: Wtrflow,
        meta: {
          title: "用水量统计",
        },
      },
      {
        path: "/wcAnalysis/psgflow",
        component: Psgflow,
        meta: {
          title: "客流量统计",
        },
      },

      {
        path: "/lcnMir",
        component: LcnMir,
        meta: {
          title: "位置监控",
        },
      },
      {
        path: "/wcQuery",
        component: WcQuery,
        meta: {
          title: "厕所传感设备查询",
        },
      },
      {
        path: "/wcManage",
        component: WcManage,
        meta: {
          title: "厕所传感设备管理",
        },
      },
    ],
  },
  {
    path: "/home",
    component: Home,
    meta: {
      title: "首页",
    },
  },
  {
    path: "/",
    component: Map,
    meta: {
      title: "地图页",
    },
  },
  //在vue router官网下的动态路由匹配的捕获所有路由或404 Not found路由里面
  //这个路由设置，是当url中的页面不存在的时候会自动跳转到404页面
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    meta: { title: "404 Not Found" },
  },
  {
    path: "/login",
    component: Login,
    meta: {
      title: "登录页",
    },
  },
  {
    path: "/tvMap",
    component: TvMap,
    meta: {
      title: "公厕大屏展示",
    },
  },
  {
    path: "/mobileTvMap",
    component: MobileTvMap,
    meta: {
      title: "公厕大屏展示",
    },
  },
  {
    path: "/submitSuccess",
    component: SubmitSuccess,
    meta: {
      title: "公厕大屏展示",
    },
  },
  {
    path: "/evlForm",
    component: EvlForm,
    meta: {
      title: "二维码评价页",
    },
  },
  {
    path: "/toiletsData",
    component: ToiletsData,
    meta: {
      title: "公厕数据页",
    },
  },
];

// 3. 创建路由实例并传递 `routes` 配置
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

//导出router,全局可用
export default router;
