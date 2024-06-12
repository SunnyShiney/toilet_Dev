<template>
  <div class="f-tag-list">
    <el-tabs
      v-model="activeTab"
      type="card"
      class="demo-tabs"
      @tab-remove="removeTab"
      @tab-change="changeTab"
      style="min-width: 100px;"
    >
      <el-tab-pane
        v-for="item in tabList"
        :key="item.path"
        :label="item.title"
        :name="item.path"
        :closable="item.path != '/home'"
      >
      </el-tab-pane>
    </el-tabs>
    <span class="tag-btn">
      <el-dropdown @command="handleClose">
        <span class="el-dropdown-link">
          <el-icon>
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="clearOther">关闭其他标签</el-dropdown-item>
            <el-dropdown-item command="clearAll">关闭全部标签</el-dropdown-item>


          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>
  <!-- <div style="height:7vh;">

  </div> -->
</template>
<script setup>
import useTabList from '~/composables/useTabList'
const {  activeTab,
      tabList,
      changeTab,
      removeTab,
      handleClose,} = useTabList()
</script>
<style scoped>
.f-tag-list {
  @apply fixed bg-gray-100 items-center flex;
  top: 7vh;
  right: 0;
  height: 5vh;
  left: 17vw;
  z-index: 100;
  padding: 0 0.5vw;
}


.tag-btn {
  @apply bg-white flex items-center justify-center;
  height: 4vh;
  width: 4vh;
  /* 放在最左边 */
  margin-left: auto;
  margin-right: 0.2vw;
  border-radius: 0.05rem;
}
::v-deep .el-tabs__item{
  font-size:0.2rem !important;
 }

/* 修改默认样式需要添加:deep */
:deep(.el-tabs__header) {
  margin-bottom: 0;
}
:deep(.el-tabs__nav) {
  border: 0 !important;
}

/* 每个标签页 */
:deep(.el-tabs__item) {
  border-radius: 0.05rem;
  border: 0 !important;
  background-color: #fff;
  margin: 0 0.5vw;
  height: 4vh;
  line-height: 4vh;
}
:deep(.el-tabs__nav-next),
:deep(el-tabs__nav-prev) {
  line-height: 4vh;
  height: 4vh;
}
:deep(.is-disabled) {
  cursor: not-allowed;
  @apply text-gray-300;
}

:deep(.el-tabs) {
  --el-tabs-header-height: 4vh;
}

:deep(.el-tabs__header) {
  border: 0px;
}
</style>
