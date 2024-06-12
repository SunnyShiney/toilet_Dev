<template>
  <el-row class="login-container">
    <el-col :lg="16" :md="12" class="left">
      <div>
        <div>金牛区智慧厕所引导系统</div>
        <div class="text-gray-200 text-sm">
          此系统用于展示金牛区各厕所的相关情况
        </div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="right">
      <h2 class="title">欢迎登录</h2>
      <div>
        <span class="line"></span>
        <span>账号密码登录</span>
        <span class="line"></span>
      </div>
      <el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名">
            <template #prefix>
              <el-icon><User /></el-icon> </template
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            show-password
            placeholder="请输入密码"
          >
            <template #prefix>
              <el-icon><Lock /></el-icon> </template
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            round
            color="#626aef"
            class="w-[250px]"
            type="primary"
            :loading="loading"
            @click="onSubmit"
            >登 录</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { toast } from "~/composables/util";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
// do not use same name with ref
const form = reactive({
  username: "",
  password: "",
});

const rules = {
  username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
  password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
};

//拿到表单这个节点,变成响应式的
const formRef = ref(null);
const loading = ref(false);

const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false;
    }
    loading.value = true;

    store
      .dispatch("login", form)
      .then((res) => {
        toast("登录成功");
        router.push("/");
      })
      .finally(() => {
        loading.value = false;
      });
    // login(form.username, form.password)
    //   .then((res) => {
    //     console.log(res);
    //     //提示成功
    //     toast("登录成功！")

    //     //存储token
    //     setToken(res.token)

    //     //获取用户相关信息
    //     // getInfo().then(res2 => {
    //     //   store.commit("SET_USERINFO",res2)
    //     //   console.log(res2)
    //     // })

    //     //跳转到后台首页
    //     router.push("/")
    //   }).finally(() => {
    //     loading.value = false;
    //   })

    console.log(valid);
  });
};

//监听回车事件
function onKeyUp(e) {
  console.log(e.key);
  if (e.key == "Enter") onSubmit();
}

//添加键盘监听
onMounted(() => {
  document.addEventListener("keyup", onKeyUp);
});

//移除键盘监听
onBeforeUnmount(() => {
  document.removeEventListener("keyup", onKeyUp);
});
</script>

<style scoped>
.login-container {
  @apply min-h-screen bg-indigo-500;
}
.login-container .left,
.login-container .right {
  @apply flex justify-center items-center;
}
.login-container .right {
  @apply bg-light-50 flex-col;
}
.left > div > div:first-child {
  @apply font-bold lg:text-5xl md:text-3xl sm:text-2xl text-2xl text-light-50 mb-4;
}
.right > div {
  @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}

.right .title {
  @apply font-bold text-3xl text-gray-800;
}
.right .line {
  @apply h-[1px] w-16 bg-gray-200;
}
</style>
