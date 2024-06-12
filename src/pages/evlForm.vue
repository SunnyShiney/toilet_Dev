<template>
  <div class="header_">
    <p class="title_">公厕评价调查问卷</p>
  </div>
  <div class="container_">
    <p class="location_name">您所在的公厕位置：{{ location_name }}</p>

    <el-form
      ref="ruleFormRef"
      style="max-width: 100%"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <el-form-item label="厕所区域" prop="region">
        <el-select v-model="ruleForm.region" placeholder="男卫生间">
          <el-option label="男卫生间" value="男卫生间" />
          <el-option label="女卫生间" value="女卫生间" />
          <el-option label="第三卫生间" value="第三卫生间" />
          <el-option label="移动厕所" value="移动厕所" />
        </el-select>
      </el-form-item>

      <el-form-item label="您的体验感" prop="evaluation">
        <el-radio-group v-model="ruleForm.evaluation">
          <el-radio label="非常满意" value="nice"></el-radio>
          <el-radio label="一般" value="just_so_so"></el-radio>
          <el-radio label="不满意" value="bad"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="您的建议" prop="desc">
        <el-input v-model="ruleForm.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm(ruleFormRef)"
          class="button_"
        >
          提交
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import moment from "moment";
import "moment/locale/zh-cn"; // 导入中文语言包

import { ref, onMounted, onUnmounted, computed, reactive } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
// 获取传递的参数
const location_name = router.currentRoute.value.query.param;
console.log(11, location_name);

import type { ComponentSize, FormInstance, FormRules } from "element-plus";

interface RuleForm {
  region: string;
  evaluation: string;
  desc: string;
}

const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  region: "",
  evaluation: "",
  desc: "",
});

const rules = reactive<FormRules<RuleForm>>({
  region: [
    {
      required: true,
      message: "请选择厕所区域",
      trigger: "change",
    },
  ],

  evaluation: [
    {
      required: true,
      message: "请对该公厕进行评价",
      trigger: "change",
    },
  ],
  desc: [{ required: true, message: "请写下您的建议", trigger: "blur" }],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
      console.log(ruleForm.region);
      console.log(ruleForm.evaluation);
      console.log(ruleForm.desc);

      axios
        .post("/api/evaluation/getEvaluationForm", {
          location_name: location_name,
          gender: ruleForm.region,
          evaluation_level: ruleForm.evaluation,
          suggestion: ruleForm.desc,
        })
        .then(function (response) {
          console.log("请求成功:", response);
        })
        .catch(function (error) {
          console.error("请求失败:", error);
        });
        router.push({ path: "/submitSuccess" });
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<style scoped>
.header_ {
  height: 10vh;
  background-color: #409eff;
}
.title_ {
  height: 10vh;
  line-height: 10vh;
  font-size: 2rem;
  color: white;
  font-weight: bold;
  vertical-align: center;
  text-align: center;
}
.container_ {
  width: 90%;
  margin: 0 auto;
}
.location_name {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 4vh;
  margin-top: 3vh;
}

.el-form-item--default {
  margin-bottom: 4vh;
}
.button_ {
  margin: 0 auto;
  margin-top: 2vh;
  width: 40%;
}
</style>

