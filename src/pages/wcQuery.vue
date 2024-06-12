<template>
  <div>厕所传感设备查询</div>

  <el-cascader
    v-model="value"
    :options="options"
    :props="props"
    @change="handleChange"
    style="width: 500px"
    clearable
  />

  <el-table
    :data="tableData.slice((currentPage - 1) * 10, currentPage * 10)"
    style="width: 100%"
  >
    <el-table-column prop="dev_eui" label="设备号" width="250" />
    <el-table-column prop="toilet_name" label="厕所名称" width="200" />
    <el-table-column prop="type" label="传感器类型" width="200" />
    <el-table-column prop="gender" label="厕所性别" width="200" />
    <el-table-column prop="toilet_type" label="厕位类型" />
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

const tableData = reactive([]);

const getSensors = async (pageNum,location,type,gender) => {
  tableData.splice(0, tableData.length);
  axios({
    url: "/api/toilet-sensor/querySensor",
    data: {
        toilet_location: location,
        type: type,
        gender:gender
    },
    method: "post",
  }).then((response) => {
    var res = response.data;
    console.log(res);

    for (var sensor in res) {
      var currentCar = {
        dev_eui: res[sensor].dev_eui,
        toilet_name: res[sensor].toilet_name,
        gender: res[sensor].gender,
        type: res[sensor].type,
        toilet_type: res[sensor].toilet_type,
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

getSensors(1,"所有","所有","所有");

const value = ref([]);

const props = {
  expandTrigger: "hover",
};

//选项框的结果
const handleChange = (value) => {
  console.log(value[0]);
    getSensors(1,value[0],value[1],value[2]);
};
var options = ref([]);
options = [
      {
    value: "所有",
    label: "所有",
    children: [
      {
        value: "所有",
        label: "所有",
        children: [
          {
            value: "所有",
            label: "所有",
          },
        ],
      },
      {
        value: "占位传感器",
        label: "占位传感器",
        children: [
          {
            value: "所有",
            label: "所有",
          },
          {
            value: "男卫生间",
            label: "男卫生间",
          },
          {
            value: "女卫生间",
            label: "女卫生间",
          },
          {
            value: "第三卫生间",
            label: "第三卫生间",
          },
        ],
      },
      {
        value: "水浸传感器",
        label: "水浸传感器",
        children: [
          {
            value: "所有",
            label: "所有",
          }
        ],
      },
      {
        value: "PM10",
        label: "PM10",
        children: [
          {
            value: "所有",
            label: "所有",
          }
        ],
      },
      {
        value: "纸量传感器",
        label: "纸量传感器",
        children: [
          {
            value: "所有",
            label: "所有",
          }
        ],
      },
      {
        value: "环境参数传感器",
        label: "环境参数传感器",
        children: [
          {
            value: "所有",
            label: "所有",
          },
          {
            value: "男卫生间",
            label: "男卫生间",
          },
          {
            value: "女卫生间",
            label: "女卫生间",
          }
         
        ],
        },
      {
        value: "气味传感器",
        label: "气味传感器",
        children: [
          {
            value: "所有",
            label: "所有",
          },
          {
            value: "男卫生间",
            label: "男卫生间",
          },
          {
            value: "女卫生间",
            label: "女卫生间",
          },
        
        ],
      },
    ],
  },
  {
    value: "枣子巷",
    label: "枣子巷",
    children: [
      {
        value: "所有",
        label: "所有",
        children: [
          {
            value: "所有",
            label: "所有",
          },
        ],
      },
      {
        value: "占位传感器",
        label: "占位传感器",
        children: [
          {
            value: "所有",
            label: "所有",
          },
          {
            value: "男卫生间",
            label: "男卫生间",
          },
          {
            value: "女卫生间",
            label: "女卫生间",
          },
          {
            value: "第三卫生间",
            label: "第三卫生间",
          },
        ],
      },
      {
        value: "水浸传感器",
        label: "水浸传感器",
        children: [
          {
            value: "所有",
            label: "所有",
          }
        ],
      },
      {
        value: "PM10",
        label: "PM10",
        children: [
          {
            value: "所有",
            label: "所有",
          }
        ],
      },
      {
        value: "纸量传感器",
        label: "纸量传感器",
        children: [
          {
            value: "所有",
            label: "所有",
          }
        ],
      },
      {
        value: "环境参数传感器",
        label: "环境参数传感器",
        children: [
          {
            value: "所有",
            label: "所有",
          },
          {
            value: "男卫生间",
            label: "男卫生间",
          },
          {
            value: "女卫生间",
            label: "女卫生间",
          }
         
        ],
      },
    ],
  },
  {
    value: "抚琴文化站",
    label: "抚琴文化站",
    children: [
      {
        value: "所有",
        label: "所有",
        children: [
          {
            value: "所有",
            label: "所有",
          },
        ],
      },
      {
        value: "占位传感器",
        label: "占位传感器",
        children: [
          {
            value: "所有",
            label: "所有",
          },
          {
            value: "男卫生间",
            label: "男卫生间",
          },
          {
            value: "女卫生间",
            label: "女卫生间",
          },
          {
            value: "第三卫生间",
            label: "第三卫生间",
          },
        ],
      },
      {
        value: "水浸传感器",
        label: "水浸传感器",
        children: [
          {
            value: "所有",
            label: "所有",
          }
        ],
      },
      {
        value: "PM10",
        label: "PM10",
        children: [
          {
            value: "所有",
            label: "所有",
          }
         
        ],
      },
      {
        value: "纸量传感器",
        label: "纸量传感器",
        children: [
          {
            value: "所有",
            label: "所有",
          }
          
        ],
      },
      {
        value: "气味传感器",
        label: "气味传感器",
        children: [
          {
            value: "所有",
            label: "所有",
          },
          {
            value: "男卫生间",
            label: "男卫生间",
          },
          {
            value: "女卫生间",
            label: "女卫生间",
          },
        
        ],
      },
    ],
  },
];
</script>

<style scoped>
::v-deep .el-tabs__item {
  font-size: 0.3rem;
}

.custom-cascader {
  width: 500px; /* 设置宽度为 300px */
}
</style>
