<template>
  <div>
    客流量统计
    <div class="demo-date-picker">
      <el-select
        v-model="value"
        placeholder="Select"
        style="width: 240px"
        class="toilet_block"
        @change="toiletChange"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <div class="date_block">
        <el-date-picker
          v-model="value2"
          type="daterange"
          unlink-panels
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
          :shortcuts="shortcuts"
          :size="size"
          @change="dateChange"
        />
      </div>
      <el-button
        class="export_block"
        type="primary"
        style="margin-left: 10px"
        @click="junk_exportExcel"
        >打印报表</el-button
      >
    </div>
    <div class="psgflow_panel">
      <div
        id="weekly_chart"
        style="width: 90%; height: 45vh; margin: 0 auto"
      ></div>
      <div class="psgflow_panel_footer"></div>
    </div>
  </div>
</template>
<script setup>
import moment from "moment";
import "moment/locale/zh-cn"; // 导入中文语言包

import { ref, onMounted, reactive, onBeforeUnmount } from "vue";
import axios from "axios";
import { TdtMap } from "vue-tianditu";
import iconUrl from "~/assets/images/location.png";
import ToiletsData from "~/pages/toiletsData.vue";
import { useRouter } from "vue-router";
import * as echarts from "echarts";
const router = useRouter();

//下拉框选择器 默认值为全部
const value = ref("all");

const options = [
  {
    value: "all",
    label: "全部",
  },
  {
    value: "枣子巷",
    label: "枣子巷",
  },
  {
    value: "抚琴文化站",
    label: "抚琴文化站",
  },
];

//日期选择器 默认值为过去一周
const end = new Date();
const start = new Date();
start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
const value2 = ref([start, end]);

console.log( 33, moment(value2.value[1]).add(1,"days").format("YYYY-MM-DD"));
const shortcuts = [
  {
    text: "过去一周",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    },
  },
  {
    text: "过去一个月",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  },
  {
    text: "过去三个月",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      return [start, end];
    },
  },
];

//选择器 改变时触发
const toiletChange = (val) => {
  console.log(val);
  showWeeklyChart();
};
const dateChange = (val) => {
  console.log(val);
  showWeeklyChart();
};

// 导出报表
const junk_exportExcel = () => {
  var junk_export_start = moment(value2.value[0]).format("YYYY-MM-DD");
  var junk_export_end = moment(value2.value[1]).add(1,"days").format("YYYY-MM-DD");
  getJunkForm(junk_export_start, junk_export_end);
};

const getJunkForm = (start, end) => {
  axios({
    url: "/api/crowd/getCrowdByToiletExcel/" + start + "/" + end+"/"+value.value,

    method: "get",

    // 下载后台文件：请求头部一定要加上responseType:'blob'
    responseType: "blob",
  }).then(function (res) {
    if (res.status == 200) {
      console.log("成功了！");
      // 生成blob对象 定义下载格式
      let blob = new Blob([res.data], { type: res.type });
      console.log(222, res);
      // 获取文件名
      let filename = res.headers["content-disposition"];
      filename = decodeURIComponent(filename.split("filename=")[1]);
      // 创建 a标签 执行下载
      let downloadElement = document.createElement("a");
      let href = window.URL.createObjectURL(blob); //创建下载的链接
      downloadElement.href = href;
      downloadElement.download = filename; //下载后文件名
      document.body.appendChild(downloadElement); // 项目插入a元素
      downloadElement.click(); //点击下载
      document.body.removeChild(downloadElement); //下载完成移除元素
      window.URL.revokeObjectURL(href); //释放blob对象
    }
  });
};
//客流量趋势
var weeklyChart = null;
onMounted(() => {
  showWeeklyChart();
  //每30秒更新一次
  // setInterval(() => {
  //   showWeeklyChart();
  // }, 60000);
});

//让图表随着屏幕自适应
window.addEventListener("resize", function () {
  weeklyChart.resize();
});

//页面跳转之前销毁图表
onBeforeUnmount(() => {
  if (weeklyChart) {
    window.removeEventListener("resize", weeklyChart);
    weeklyChart.dispose();
    weeklyChart = null;
  }
});
function showWeeklyChart() {
  document.getElementById("weekly_chart").removeAttribute("_echarts_instance_");
  var chartDom = document.getElementById("weekly_chart");
  weeklyChart = echarts.init(chartDom);

  axios({
    url:
      "/api/toilet-flashlight/getSumByDuration/" +
      value.value +
      "/" +
      moment(value2.value[0]).format("YYYY-MM-DD") +
      "/" +
      moment(value2.value[1]).add(1,"days").format("YYYY-MM-DD") +
      "/threeType",
    method: "get",
  }).then((dataTable) => {
    console.log(222, dataTable);
    dataTable = dataTable.data;
    const filteredData1 = dataTable.filter(
      (item) => item.gender === "男卫生间"
    );
    const flowValues1 = filteredData1.map((item) => item.flowValue);
    const DateValues1 = filteredData1.map((item) => item.startDate);
    const filteredData2 = dataTable.filter(
      (item) => item.gender === "女卫生间"
    );
    const flowValues2 = filteredData2.map((item) => item.flowValue);

    const filteredData3 = dataTable.filter(
      (item) => item.gender === "第三卫生间"
    );
    const flowValues3 = filteredData3.map((item) => item.flowValue);

    // 处理成功响应
    var option;

    option = {
      title: {
        text: "客流量统计",
        textStyle: {
          color: "black",
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        formatter: function (params) {
          // 获取横坐标的内容
          let xAxisLabel = params[0].axisValue;

          // 获取数据项的数值
          let dataValue = params[0].value;
          let dataValue1 = params[1].value;
          let dataValue2 = params[2].value;

          // 构建 tooltip 内容并换行显示
          return (
            xAxisLabel +
            "<br>第三卫生间 " +
            dataValue2 +
            "人" +
            "<br>女卫生间 " +
            dataValue1 +
            "人" +
            "<br>男卫生间 " +
            dataValue +
            "人"
          );
        },
      },
      legend: {
        textStyle: {
          color: "black",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
        textStyle: {
          color: "black",
        },
      },
      xAxis: [
        {
          type: "category",
          data: DateValues1,
        },
      ],
      yAxis: [
        {
          type: "value",
          axisLabel: {
            formatter: "{value} 人",
          },
        },
      ],
      series: [
        {
          name: "男卫生间",
          type: "bar",
          stack: "Ad",
          label: {
            show: true,
          },
          emphasis: {
            focus: "series",
          },
          textStyle: {
            color: "white",
          },
          data: flowValues1,
        },
        {
          name: "女卫生间",
          type: "bar",
          stack: "Ad",
          label: {
            show: true,
          },
          emphasis: {
            focus: "series",
          },
          textStyle: {
            color: "white",
          },
          data: flowValues2,
        },
        {
          name: "第三卫生间",
          type: "bar",
          stack: "Ad",
          label: {
            show: true,
          },
          emphasis: {
            focus: "series",
          },
          textStyle: {
            color: "white",
          },
          data: flowValues3,
        },
      ],
    };

    option && weeklyChart.setOption(option);
  });
}
</script>
<style setup>
.psgflow_panel {
  margin-top: 4vh;
}

.toilet_block,
.toilet_block {
  margin-right: 1vw;
}
.date_block,
.toilet_block,
.export_block {
  display: inline-block;
}
</style>
