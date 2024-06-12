<template>
  <div class="f-menu">
    <el-menu
      class="el-menu-vertical-demo"
      @select="handleSelect"
      :default-active="defaultActive"
      unique-opened
    >
      <!-- 遍历主菜单 -->
      <template v-for="(item, index) in asideMenus" :key="index">
        <el-sub-menu
          v-if="item.child && item.child.length > 0"
          :index="item.name"
        >
          <template #title>
            <!-- 图标 -->
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <!-- 标题内容 -->
            <span>{{ item.name }}</span>
          </template>
          <!-- 遍历二级菜单 -->
          <template v-for="(item2, index2) in item.child" :key="index2">
            <!-- 判断是否有三级菜单 -->
            <el-sub-menu
              v-if="item2.child && item2.child.length > 0"
              :index="item2.name"
            >
              <template #title>
                <el-icon>
                  <component :is="item2.icon"></component>
                </el-icon>
                <span>{{ item2.name }}</span>
              </template>
              <!-- 遍历三级菜单 -->
              <el-menu-item
                v-for="(item3, index3) in item2.child"
                :key="index3"
                :index="item3.frontpath"
              >
                <el-icon>
                  <component :is="item3.icon"></component>
                </el-icon>
                {{ item3.name }}
              </el-menu-item>
            </el-sub-menu>
            <!-- 没有三级菜单的情况 -->
            <el-menu-item v-else :index="item2.frontpath">
              <el-icon>
                <component :is="item2.icon"></component>
              </el-icon>
              {{ item2.name }}
            </el-menu-item>
          </template>
        </el-sub-menu>
        

        <!-- 没有二级菜单的情况 -->
        <el-menu-item v-else :index="item.frontpath">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import useStore from "vuex";
const router = useRouter();
const route = useRoute();

//默认选中当前路由路径
const defaultActive = ref(route.path);
// frontpath是菜单对应的路径
const asideMenus = [
  {
    name: "后台面板",
    icon: "help",
    child: [
      {
        name: "主控台",
        icon: "home-filled",
        frontpath: "/home",
      },
    ],
  },
  
  {
    name: "位置监控",
    icon: "map-location",
    frontpath: "/lcnMir",
  },
  {
    name: "厕所传感设备查询",
    icon: "zoom-out",
    frontpath: "/wcQuery",
  },
  {
    name: "厕所传感设备管理",
    icon: "set-up",
    frontpath: "/wcManage",
  },
  {
    name: "厕所数据统计",
    icon: "data-analysis",
    child: [
      {
        name: "客流量统计",
        icon: "trend-charts",
        frontpath: "/wcAnalysis/psgflow",
      },
      {
        name: "用水量统计",
        icon: "trend-charts",
        frontpath: "/wcAnalysis/wtrflow",
      },
      {
        name: "用电量统计",
        icon: "trend-charts",
        frontpath: "/wcAnalysis/elcflow",
      },
      {
        name: "用纸量统计",
        icon: "trend-charts",
        frontpath: "/wcAnalysis/parflow",
      },
      {
        name: "警报统计",
        icon: "trend-charts",
        frontpath: "/wcAnalysis/alert",
      },
      {
        name: "满意度评价统计",
        icon: "trend-charts",
        frontpath: "/wcAnalysis/evaluation",
      },
    ],
  },
];

//点击菜单，跳转路径
const handleSelect = (e) => {
  router.push(e);
};
</script>

<style scoped>
.el-menu-vertical-demo {
  border: 0;
}
.el-sub-menu .el-icon {
  font-size: 0.25rem;
}
.el-menu-item {
  font-size: 0.2rem;
}
::v-deep .el-sub-menu__title {
  font-size: 0.2rem;
}

::v-deep .el-sub-menu .el-sub-menu__icon-arrow {
  font-size: 0.18rem !important;
}

.el-menu-item [class^="el-icon"] {
  font-size: 0.25rem;
}
.f-menu {
  width: 17vw;
  top: 7vh;
  bottom: 0;
  left: 0;

  overflow: auto;
  @apply shadow-md fixed;
}
.f-menu::-webkit-scrollbar {
  width: 0px;
}
</style>
