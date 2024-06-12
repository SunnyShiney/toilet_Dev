import { ref } from "vue";
import { useRoute, onBeforeRouteUpdate, useRouter } from "vue-router";
import { useCookies } from "@vueuse/integrations/useCookies";

export default function useTabList() {
    const route = useRoute();
    const cookie = useCookies();
    const router = useRouter();

    const activeTab = ref(route.path);
    const editableTabsValue = ref("2");
    const tabList = ref([
      {
        title: "后台首页",
        path: "/home",
      },
    ]);

    //添加标签导航
    function addTab(tab) {
      //通过findIndex方法的回调拿到每个对象，然后将每个对象的路径与传过来的是否有一样的
      //如果没有，则说明该页面还未打开过
      let noTab = tabList.value.findIndex((t) => t.path == tab.path) == -1;
      if (noTab) {
        tabList.value.push(tab);
      }
      // 使用cookie缓存标签导航
      cookie.set("tabList", tabList.value);
    }
    //初始化标签导航列表,防止刷新后标签栏标签消失
    function initTabList() {
      let tbs = cookie.get("tabList");
      if (tbs) {
        tabList.value = tbs;
      }
    }
    initTabList();
    onBeforeRouteUpdate((to, from) => {
      //   console.log({
      //     title: to.meta.title,
      //     path: to.path,
      //   });

      // 激活的标签导航应该是当前路径
      activeTab.value = to.path;
      //添加路由
      addTab({
        title: to.meta.title,
        path: to.path,
      });
    });

    //点击顶部标签，可以切换到对应的页面
    const changeTab = (t) => {
      console.log(11, t);
      activeTab.value = t;
      router.push(t);
    };

    const removeTab = (t) => {
      // t是激活的标签路径
      //获取标签导航列表
      console.log(111, t);
      let tabs = tabList.value;
      //激活的标签
      let a = activeTab.value;
      if (a == t) {
        // 将标签导航列表中的对象挨个和激活的标签做对比
        tabs.forEach((tab, index) => {
          if (tab.path == t) {
            //将激活标签的后一个或前一个作为新的激活标签
            const nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              console.log(22, nextTab.path);
              a = nextTab.path;
            }
          }
        });
      }
      // activeTab.value = a
      //触发激活标签更换页面
      changeTab(a);
      console.log(333, activeTab.value);

      //过滤，将要删除的标签踢出数组
      tabList.value = tabList.value.filter((tab) => tab.path != t);
      cookie.set("tabList", tabList.value);
    };

    const handleClose = (c) => {
      if (c == "clearAll") {
        //切换回首页  不能写成activeTab.value = '/home' 没用
        changeTab('/home')
        tabList.value = [
          {
            title: "后台首页",
            path: '/home',
          },
        ];
      } else if (c == "clearOther") {
        //过滤只剩下首页和当前激活标签
        tabList.value = tabList.value.filter(
          (tab) => tab.path == "/home" || tab.path == activeTab.value
        );
      }
      cookie.set("tabList", tabList.value);
    };

    return {
      activeTab,
      tabList,
      changeTab,
      removeTab,
      handleClose,
    };
}