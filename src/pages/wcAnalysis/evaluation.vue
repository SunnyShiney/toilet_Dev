<template >
    <div>
        满意度评价统计
    </div>

      <el-table
    :data="tableData.slice((currentPage - 1) * 10, currentPage * 10)"
    style="width: 100%"
    :row-class-name="tableRowClassName"
  >
    <el-table-column prop="id" label="编号" width="100" />
    <el-table-column prop="time" label="问卷提交时间"  width="250"/>
    <el-table-column prop="locationName" label="厕所名称" width="200" />
    <el-table-column prop="gender" label="厕所性别" width="200" />
    <el-table-column prop="evaluationLevel" label="评价等级" width="200" />
    <el-table-column prop="suggestion" label="改善建议"  />
    
  </el-table>

  <div class="float-end" style="margin-top: 10px">
    <el-pagination
      background
      layout="total, prev, pager, next, jumper"
      :total="totalRecords"
      :current-page="currentPage"
      @current-change="getTransport"
    />
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";

// ==========================================================================================================sunny
import {
  ref,
  reactive,
  computed,
  onBeforeMount,
  onMounted,
  onBeforeUnmount,
} from "vue";
//===============================================================================================================
import axios from "axios";
// ==========================================================================================================sunny

import moment from "moment";
let totalRecords = ref(1000);
let currentPage = ref(1);
let pageCount = 0;

//当电池量小于10%的时候，将该行字体颜色设置为红色
const tableRowClassName = ({
  row,
  rowIndex,
}) => {
  if (row.battery <= 10) {
    return 'warning-row'
  } 
  return ''
}


const tableData = reactive([]);

const getEvaluationList = async (pageNum) => {
  tableData.splice(0, tableData.length);
  axios({
    url: "/api/evaluation/getEvaluationList",
    data: {
      location_name: "all",
    },
    method: "post",
  }).then((response) => {
      var res = response.data;
      console.log(res);

      for (var sensor in res) {
          var currentCar = {
            
            id: res[sensor].id,
            locationName: res[sensor].locationName,
            gender: res[sensor].gender,
            time: res[sensor].time,
              evaluationLevel: res[sensor].evaluationLevel,
            suggestion:res[sensor].suggestion
          };
          tableData.push(currentCar);
     
        }
    // 处理成功响应
    tableData.value = res.data;
    totalRecords.value = tableData.length;
    pageCount = parseInt(tableData.length) % 10;
    currentPage.value = pageNum;
  });
};

const getTransport = (pageNum) => {
  // 当前页
  currentPage.value = pageNum;
};

getEvaluationList(1);
</script>


<style>


.el-table .warning-row {
    /*设置背景颜色*/
  /* --el-table-tr-bg-color: var(--el-color-warning-light-9); */
  color: red; /* 将字体颜色设置为红色 */
}

</style>
