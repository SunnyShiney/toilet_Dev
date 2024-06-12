<template>
  <div class="f-header">
    <span class="logo">
      <el-icon class="icon_margin"><Eleme /></el-icon>
      金牛区智慧厕所引导系统
    </span>
    <!-- <el-tooltip effect="dark" content="折叠" placement="bottom">
      <el-icon class="icon-btn"><Fold /></el-icon>
    </el-tooltip> -->
    <el-tooltip effect="dark" content="刷新" placement="bottom">
      <el-icon class="icon-btn" @click="handleRefresh"><Refresh /></el-icon>
    </el-tooltip>
    <div class="f-header-right">
      <!-- 头部下拉菜单 -->
      <el-button class="map-btn" @click="toMap">前往地图主页</el-button>
      <el-dropdown class="dropdown" @command="handleCommand">
        <span class="el-dropdown-link">
          <!-- {{ $store.state.user.username }} -->
          张三
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

  <!-- <el-drawer
    v-model="showDrawer"
    title="修改密码"
    size="45%"
    :close-on-click-modal="false"
  >
    <el-form
      ref="formRef"
      :rules="rules"
      :model="form"
      label-width="80"
      size="small"
    >
      <el-form-item prop="oldpassword" label="旧密码">
        <el-input v-model="form.oldpassword" placeholder="请输入旧密码">
        </el-input>
      </el-form-item>
      <el-form-item prop="Password" label="新密码">
        <el-input
          v-model="form.password"
          type="password"
          show-password
          placeholder="请输入密码"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="repassword" label="确认密码">
        <el-input
          v-model="form.repassword"
          type="password"
          show-password
          placeholder="请输入确认密码"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="onSubmit"
          >提 交</el-button
        >
      </el-form-item>
    </el-form>
  </el-drawer> -->
  <form-drawer
    ref="formDrawerRef"
    title="修改密码"
    destroyOnClose
    @submit="onSubmit"
  >
    <el-form
      ref="formRef"
      :rules="rules"
      :model="form"
      label-width="80"
      size="small"
    >
      <el-form-item prop="oldpassword" label="旧密码">
        <el-input v-model="form.oldpassword" placeholder="请输入旧密码">
        </el-input>
      </el-form-item>
      <el-form-item prop="password" label="新密码">
        <el-input
          v-model="form.password"
          type="password"
          show-password
          placeholder="请输入密码"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="repassword" label="确认密码">
        <el-input
          v-model="form.repassword"
          type="password"
          show-password
          placeholder="请输入确认密码"
        >
        </el-input>
      </el-form-item>
    </el-form>
  </form-drawer>
</template>
<script setup>
import { showModal, toast } from "~/composables/util";
import { logout, updatePassword } from "~/api/manager";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref, reactive } from "vue";
import FormDrawer from "../../components/FormDrawer.vue";

//修改密码
const formDrawerRef = ref(null);
const form = reactive({
  oldpassword: "",
  password: "",
  repassword: "",
});

const rules = {
  oldpassword: [{ required: true, message: "旧密码不能为空", trigger: "blur" }],
  password: [{ required: true, message: "新密码不能为空", trigger: "blur" }],
  repassword: [
    { required: true, message: "确认密码不能为空", trigger: "blur" },
  ],
};

//拿到表单这个节点,变成响应式的
const formRef = ref(null);


const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false;
    }
    
    formDrawerRef.value.showLoading()
    updatePassword(form)
      .then((res) => {
        toast("修改密码成功，请重新登录！");
        //清除缓存
        store.dispatch("logout");
        //跳转回登录页
        router.push("/login");
      })
      .finally(() => {
       formDrawerRef.value.hideLoading()
      });
  });
};

//刷新
const handleRefresh = () => location.reload();

//下拉菜单事件，回调，触发退出登录和修改密码
const handleCommand = (c) => {
  console.log(c);
  switch (c) {
    case "logout":
      handleLogout();
      break;
    case "rePassword":
      // showDrawer.value = true;
      formDrawerRef.value.open();
      break;
  }
};
//跳转页面需要router
const router = useRouter();

const store = useStore();
function handleLogout() {
  //.then和.catch都是拿到返回的Promise来处理后续响应的，成功是then，失败则是catch
  showModal("是否要退出登录？").then((res) => {
    //不管是否退出成功都要清除缓存
    logout().finally(() => {
      //移除cookie里的token,清除当前用户的状态 这两个逻辑统一写在store下的index.js里面
      store.dispatch("logout");
      //跳转回登录页
      router.push("/login");
      //提示退出登录成功
      toast("退出登录成功！");
    });
  });
}

function toMap() {
  router.push("/")
}
</script>

<style scoped>
.f-header {
  @apply items-center;
  display: flex;
  background-color: rgb(67, 66, 209);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 7vh;
  color: white;
}
.f-header-right {
  @apply flex items-center;
  margin-left: auto;
  /* margin-right:0.6rem; */
}
.logo {
  /* 垂直居中和水平居中 */
  @apply items-center justify-center;
  width: 27vw;
  display: flex;
  /* font-weight:100; */
  font-size: 0.4rem;
}
.icon_margin {
  margin-right: 0.5vw;
  font-size: 0.5rem;
}
.icon-btn {
  @apply flex items-center justify-center;
  width: 3vw;
  height: 7vh;
  font-size:0.3rem;
  cursor: pointer;
}
.icon-btn:hover {
  background-color: rgb(100, 100, 236);
}
.f-header-right .dropdown {
  height: 3vh;
  cursor: pointer;
  @apply flex justify-center items-center;
  color: white;
  font-size: 0.25rem;
  width: 7vw;
  line-height:3vh;
}
.map-btn{
  background-color: rgb(67, 66, 209);
  border:0;
  color:white;
  font-size:0.25rem;
}
</style>
