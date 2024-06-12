<template>
  <el-container>
    <el-header>
      <!-- 引入头部组件 -->
      <f-header />
    </el-header>
    <el-container>
      <el-aside>
        <!-- 引入侧边组件 -->
        <f-menu></f-menu>
      </el-aside>
      <el-main>
        <!-- 引入标签导航组件 -->
        <f-tag-list />
        <!-- 主体部分：路由导航的页面 -->

        <!-- Component 是动态组件 -->
        <router-view v-slot="{ Component }">
            <!-- keep-alive用于缓存其他标签的内容，max表示最多缓存10个 -->
            <keep-alive :max="10">
                <component :is="Component"></component>
            </keep-alive>
          </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup>
import FHeader from "./components/FHeader.vue";
import FMenu from "./components/FMenu.vue";
import FTagList from "./components/FTagList.vue";

(function flexible(window, document) {
  var docEl = document.documentElement;
  var dpr = window.devicePixelRatio || 1;

  // adjust body font size
  function setBodyFontSize() {
    if (document.body) {
      document.body.style.fontSize = 12 * dpr + "px";
    } else {
      document.addEventListener("DOMContentLoaded", setBodyFontSize);
    }
  }
  setBodyFontSize();

  // set 1rem = viewWidth / 24  其实1920/24=80px，即1rem=80px
  function setRemUnit() {
    var rem = docEl.clientWidth / 24;
    docEl.style.fontSize = rem + "px";
  }

  setRemUnit();

  // reset rem unit on page resize
  window.addEventListener("resize", setRemUnit);
  window.addEventListener("pageshow", function (e) {
    if (e.persisted) {
      setRemUnit();
    }
  });

  // detect 0.5px supports
  if (dpr >= 2) {
    var fakeBody = document.createElement("body");
    var testElement = document.createElement("div");
    testElement.style.border = ".5px solid transparent";
    fakeBody.appendChild(testElement);
    docEl.appendChild(fakeBody);
    if (testElement.offsetHeight === 1) {
      docEl.classList.add("hairlines");
    }
    docEl.removeChild(fakeBody);
  }
})(window, document);
</script>


<style scoped>
:deep(.el-main) {
  @apply fixed  bg-gray-100;
  top: 12vh;
  right: 0;
  height: 88vh;
  left: 17vw;
  font-size:0.3rem;

}


</style>
