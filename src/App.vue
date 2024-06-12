<script setup>
// console.log(import.meta.env)
</script>

<template>
  <!-- <button class="btn">按钮</button> -->
  <!-- 项目根组件App.vue中引入router,默认会先进入主页-->
  <router-view></router-view>
</template>

<style scoped>
#nprogress .bar{
  background-color: #f4f4f4 !important;
  height:3px !important;

}


</style>
