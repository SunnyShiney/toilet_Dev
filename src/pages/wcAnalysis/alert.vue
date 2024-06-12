<template >
    <div>
        警报统计
    </div>

      <el-table
    :data="tableData.slice((currentPage - 1) * 10, currentPage * 10)"
    style="width: 100%"
    :row-class-name="tableRowClassName"
  >
    <el-table-column prop="dev_eui" label="设备号" width="200" />
    <el-table-column prop="type" label="传感器类型" width="150" />
     <el-table-column prop="time" label="最新时间"  width="250"/>
    <el-table-column prop="status" label="报警详情" width="500" />
    <el-table-column prop="toilet_name" label="厕所名称" width="200" />
    <el-table-column prop="gender" label="厕所性别"  />
   
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

const getAllSensor = async (pageNum) => {
  tableData.splice(0, tableData.length);
  axios({
    url: "/api/sensor-warning-history/getAllRecords",
    data: {
      toilet_location: "all",
    },
    method: "post",
  }).then((response) => {
      var res = response.data;
      console.log(res);

      for (var sensor in res) {
          var currentCar = {
            
            dev_eui: res[sensor].dev_eui,
            toilet_name: res[sensor].toilet_name,
            time: res[sensor].time,
            type: res[sensor].type,
              status: res[sensor].status,
            gender:res[sensor].gender
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

getAllSensor(1);
</script>


<style>


.el-table .warning-row {
    /*设置背景颜色*/
  /* --el-table-tr-bg-color: var(--el-color-warning-light-9); */
  color: red; /* 将字体颜色设置为红色 */
}

</style>
