<template>
  <div class="home">
    <el-row :gutter="20">
  <!-- <template v-if="panels.length ==0">
        <el-col :span="6" v-for="i in 4" key="i">
        <el-skeleton style="width: 100%" animated loading>
          <template #template>
            <el-card shadow="hover" class="border-0">
              <template #header>
                <div class="flex justify-between">
                  <el-skeleton-item variant="text" style="width: 50%" />
                  <el-skeleton-item variant="text" style="width: 10%" />
                </div>
              </template>
              <el-skeleton-item variant="h3" style="width: 80%" />
              <el-divider />
              <div class="flex justify-between text-sm text-gray-500">
                <el-skeleton-item variant="text" style="width: 50%" />
                <el-skeleton-item variant="text" style="width: 10%" />
              </div>
            </el-card>
            <el-skeleton-item variant="text" style="margin-right: 16px" />
          </template> </el-skeleton
      ></el-col>
  </template> -->
      <el-col
        :span="6"
        :offset="0"
        v-for="(item, index) in panels"
        :key="index"
      >
        <el-card shadow="hover" class="border-0">
          <!-- card title -->
          <template #header>
            <div class="flex justify-between">
              <span class="text-sm">{{ item.title }}</span>
              <el-tag effect="plain" :type="item.unitColor">
                {{ item.unit }}
              </el-tag>
            </div>
          </template>
          <!-- card body -->
          <span class="text-3xl font-bold text-gray-500">{{ item.value }}</span>
          <el-divider />
          <div class="flex justify-between text-sm text-gray-500">
            <span>{{ item.subTitle }}</span
            ><span>{{ item.subValue }}{{ item.subUnit }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import { getStatistics1 } from "~/api/index.js";
import axios from "axios"
import { ref } from "vue";

var panels = ref([]);
//后台首页展示的数据
  axios({
      url: "/api/toilet-sensor/getHomeStatistics",

      method: "get",
    })
    .then((response) => {
      // 处理成功响应
      panels.value = response.data;
    })

</script>
<style scoped>
.home {
  margin: 0 1vw;
}
.text-sm {
  font-size: 0.25rem;
  line-height: 3vh;
}
.text-3xl {
  font-size: 0.5rem;
  line-height: 6vh;
}
</style>
