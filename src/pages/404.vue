<template>
  <div>

      <el-result
        icon="warning"
        title="404"
        sub-title="页面丢失了~"
      >
        <template #extra>
          <el-button type="primary" @click="$router.push('/')">返回主页</el-button>
        </template>
      </el-result>

  </div>
</template>
<script setup>

</script>