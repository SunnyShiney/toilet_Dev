<template>
  <div class="main_container">
    <header>
      <h1>{{ location_name }}</h1>
      <el-button class="back-map-btn" @click="backToMap"
        >返回地图主页</el-button
      >
      <ul class="nowWeather">
        <li class="city">{{ city }}</li>
        <li class="weather">{{ weather }}</li>
        <li class="temperature">{{ temperature }}</li>
      </ul>
      <ul class="nowTime">
        <li class="showTime">{{ currentTime }}</li>
        <li>
          <div class="showDate">
            <p>{{ currentDate }}{{ dayOfWeek }}</p>
          </div>
        </li>
      </ul>
    </header>
    <div class="mainbox">
      <div class="column">
 
          <div class="panel panel_top">
          <div class="module">
            <span class="iconfont line-icon">&#xe638;</span>
            <div class="title">移动厕所坑位使用情况</div>
          </div>
          <div class="remain_box nance">
            <div><span class="iconfont man_icon">&#xe607;</span></div>
            <div><span class="iconfont woman_icon">&#xe608;</span></div>
            <div >
              <li>
            
                <div class="wc_text occupancy_text">空闲</div>
                <div class="remain_total">{{unOccupancyCount}}</div>
              </li>
              <li>
       
                <div class="wc_text occupancy_text occupancy">占用</div>
                <div class="remain_total occupancy">{{occupancyCount}}</div>
              </li>

            </div>
          </div>
          <div class="module">
            <span class="iconfont line-icon">&#xe638;</span>
            <div class="title">移动厕所客流数据</div>
          </div>
          <div class="remain_box flow">
            <div>
              <div class="flow_text">今日客流</div>
              <div class="flow_value">{{todayIn}}</div>

              <div class="flow_text">累计客流</div>
              <div class="flow_value">{{ total_crowd }}</div>
            </div>
          </div>
          <div class="panel_footer"></div>
        </div>
 

        <div class="panel_bottom">
          <div class="module">
            <span class="iconfont line-icon">&#xe638;</span>
            <div class="title">环境监测</div>
          </div>
          <div class="remain_box environment">
            <div>
              <li>
                <span class="iconfont environment_icon temperature_icon"
                  >&#xe66b;</span
                >
                <div class="environment_title">温度</div>
                <div class="environment_value temperature">
                  {{temperature_value}} ℃
                </div>
              </li>
              <li>
                <span class="iconfont environment_icon humidity_icon"
                  >&#xe669;</span
                >
                <div class="environment_title">湿度</div>
                <div class="environment_value humidity">
                  {{humdity_value}} %
                </div>
              </li>
              <li>
                <span class="iconfont environment_icon NH3_icon">&#xe8d0;</span>
                <div class="environment_title">氨气</div>
                <div class="environment_value NH3">{{nh3_value}} ppm</div>
              </li>
              <li>
                <span class="iconfont environment_icon H2S_icon">&#xe7e7;</span>
                <div class="environment_title">硫化氢</div>
                <div class="environment_value H2S">{{h2s_value}} ppm</div>
              </li>
              <li>
                <span class="iconfont4 environment_icon formaldehyde_icon">&#xe67b;</span>
                <div class="environment_title">甲醛</div>
                <div class="environment_value formaldehyde">{{formaldehyde_value}} mg/m³</div>
              </li>
            </div>
          </div>
          <div class="panel_footer"></div>
        </div>
      </div>
      <div class="column">

        <div class="panel_middle">
          <img id="backgroundImg" class="toilet_plan" :src="imagePath" alt="" />
          <canvas ref="toiletCanvas"></canvas>
        </div>
        <div class="panel_middle column_middle_footer">
          <div class="box">
           <div class="right_box evaluation evaluation_box">
              <div class="panel_evaluation code">
                <div class="module">
                  <span class="iconfont line-icon">&#xe638;</span>
                  <div class="title">满意度评价</div>
                </div>
                <div class="emotion_box">
                  <div class="emotion">
                    <span class="iconfont emotion_icon">&#xe7a9;</span>
                    <span class="emotion_text">{{level_nice}}%</span>
                  </div>
                  <div class="emotion">
                    <div class="emotion">
                      <span class="iconfont emotion_icon">&#xe635;</span>
                      <span class="emotion_text">{{level_normal}}%</span>
                    </div>
                  </div>
                  <div class="emotion">
                    <div class="emotion">
                      <span class="iconfont emotion_icon">&#xe634;</span>
                      <span class="emotion_text">{{level_bad}}%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="code">
                <img
                  :src="qrcode_imagePath" alt=""
                  style="height: 12vh; margin:0 auto;"
                />
                <div class="scan">扫描二维码进行评价</div>
              </div>
            </div>
          </div>
          <div class="box box_right">
          

            <div class="right_box media_video">
  
              <video
                autoplay
                controls
                loop
                muted
                style="height: 30vh; margin-left:-1vw;"
              >
                <source src="../assets/video/jinNIU~1.mp4" type="video/mp4" />
                您的浏览器不支持播放该视频
              </video>

       
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <!-- <h1 class="wc_title"></h1> -->
        <div class="panel panel_top">
          <div class="module">
            <span class="iconfont line-icon">&#xe638;</span>
            <div class="title">警报栏</div>
          </div>
          <el-table
            :data="tableData"
            :style="{
              width: '100%',
              height: '33vh',
              margin: '0vh',
              backgroundColor: ' rgb(16, 26, 44)',
              fontSize: '0.2rem',
            }"
            :cell-style="{
              color: 'red',
              fontSize: '0.15rem',
              backgroundColor: 'rgb(16,26,44)',
            }"
            :header-cell-style="{
              color: 'rgb(0,255,255)',
              fontSize: '0.22rem',
              backgroundColor: 'rgb(16,26,44)',
            }"
          >
            <el-table-column prop="warningType" label="警报类型" />

            <el-table-column prop="detail" label="详细信息" />
          </el-table>
          <div class="remain_box environment"></div>

          <div class="panel_footer"></div>
        </div>
        

        <div class="panel_bottom">
          <div class="module">
            <span class="iconfont line-icon">&#xe638;</span>
            <div class="title">环境监测</div>
          </div>
          <div class="remain_box environment">
            <div>
              <li>
                <span class="iconfont2 environment_icon TVOC_icon"
                  >&#xe61f;</span
                >
                <div class="environment_title">TVOC</div>
                <div class="environment_value TVOC">
                  {{tvoc_value}} mg/m³
                </div>
              </li>
              <li>
                <span class="iconfont2 environment_icon PM25_icon"
                  >&#xe605;</span
                >
                <div class="environment_title">PM2.5</div>
                <div class="environment_value PM25">
                  {{pm25_value}} ug/m³
                </div>
              </li>
              <li>
                <span class="iconfont2 environment_icon PM10_icon">&#xe8aa;</span>
                <div class="environment_title">PM10</div>
                <div class="environment_value PM10">{{pm10_value}} ug/m³</div>
              </li>
              <li>
                <span class="iconfont2 environment_icon CO2_icon">&#xe613;</span>
                <div class="environment_title">二氧化碳</div>
                <div class="environment_value CO2">{{co2_value}} ppm</div>
              </li>
            </div>
          </div>
          <div class="panel_footer"></div>
        </div>
      </div>
    </div>
 
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: cover;
}
@font-face {
  font-family: "iconfont"; /* Project id  */
  src: url("~/assets/iconfont/iconfont.ttf?t=1699340007424") format("truetype");
}

@font-face {
  font-family: "iconfont1"; /* Project id  */
  src: url("~/assets/iconfont/font_8ntltc5rkhf/iconfont.ttf?t=1699340007424")
    format("truetype");
}



@font-face {
  font-family: "iconfont2"; /* Project id  */
  src: url("~/assets/iconfont/font_niivphyf32q/iconfont.ttf?t=1699340007424")
    format("truetype");
}

@font-face {
  font-family: "iconfont3"; /* Project id  */
  src: url("~/assets/iconfont/font_6xv5l8glwvp/iconfont.ttf?t=1699340007424")
    format("truetype");
}

@font-face {
  font-family: "iconfont4"; /* Project id  */
  src: url("~/assets/iconfont/font_ugpm93mudmf/iconfont.ttf?t=1699340007424")
    format("truetype");
}

.iconfont {
  font-family: "iconfont" !important;
  /* font-size: 0.4rem; */
  color: #fff;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.iconfont1 {
  font-family: "iconfont1" !important;
  color: #fff;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.iconfont2 {
  font-family: "iconfont2" !important;
  color: #fff;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.iconfont3 {
  font-family: "iconfont3" !important;
  color: #fff;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.iconfont4 {
  font-family: "iconfont4" !important;
  color: #fff;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.scan {
  color: white;
  font-size: 0.2rem;
  text-align: center;
}
.emotion_box {
  margin: 0 0.2rem;
  display: flex;
}
.emotion {
  flex: 2;
}
.emotion_icon {
  color: yellow;
  font-size: 0.45rem;
}
.emotion_text {
  color: white;
  /* height:5vh;
    line-height:5vh; */
  margin-left: 0.05rem;
  font-size: 0.25rem;
}
.gradient-box {
  margin-top: -2vh;

  width: 100%;
  height: 4vh; /* 设置框的高度 */
  line-height: 4vh;
  font-size: 0.3rem;
  background: linear-gradient(
    to right,
    rgb(8, 19, 37),
    #ff5c5c,
    #f34d4d,
    #ff5c5c,
    rgb(8, 19, 37)
  );
}
.footer {
  display: flex;
  /* min-height: 6vh; */

  margin-top: 5vh;
  margin-bottom: 0;
}
.using_data {
  flex: 2;
  /* line-height: 10vh; */
  padding-left: 1rem;
  color: white;
  font-size: 0.3rem;
}
.water_flow,
.pedestrian_flow,
.electricity_flow,
.paper_flow {
  color: aqua;
}
.mainbox {
  display: flex;
  min-width: 12.8rem;
  margin: 0 auto;
  height: 80vh;
  padding: 0.125rem 0.125rem 0;
}
.module {
  font-weight: bold;
  font-size: 0.3rem;
  /* margin-top: -2.5vh; */
  background-image: -webkit-gradient(
    linear,
    0 0,
    0 bottom,
    from(#fff),
    to(rgb(80, 187, 219))
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.module > .title {
  display: inline-block;
  margin-top: -10px;
}
.line-icon {
  font-size: 0.4rem;
}
.remain_box,
.third_toilet,
.third_remain_box {
  display: inline-block;
  display: flex;
}
.remain_box > div:nth-child(1) {
  /* flex: 2; */
}
.remain_box > div:nth-child(2) {
  /* flex: 3; */
}
.third_toilet > div:nth-child(1) {
  flex: 1.5;
}
.third_toilet > div:nth-child(2) {
  flex: 3;
  margin-top: 5vh;
}
.third_remain_box > div:nth-child(1) {
  flex: 1.2;
  margin-top: 7vh;
}
.third_remain_box > div:nth-child(2) {
  flex: 1;
  margin-top:7vh;
}
.man_icon,
.woman_icon {
  font-size: 1.5rem;
  color: rgb(64, 147, 224);
}
.woman_icon {
  color: rgb(212, 73, 73);
  margin-left:-3vw;

}
.remain_box > div > li {
  list-style-type: none;
  margin-top: 0.8vh;
}

.third_remain_box > div > li {
  margin-top: 1vh;
}

.nance > div > li {
  margin-top: 1vh;
}
.third_toilet {
  margin-top: -3.5vh;
  padding-left: 0.1rem;
}

.third_toilet > div > li {
  margin-top: 0vh;
}
.wc_icon,
.environment_icon {
  font-size: 0.45rem;
}
.environment_icon {
  margin-right: 0.2rem;
}
.wc_text,
.third_wc_text,
.environment_title,
.flow_text,
.third_environment {
  display: inline-block;
  margin-left: 0.25rem;
  color: white;
  font-size: 0.25rem;
  margin-top:2vh;
}
.third_wc_text {
  text-align: center;
  margin: 0;
}

/* .flow_text {
  margin-left: 0.4rem;
} */

.wc_title {
  text-align: center;
  color: #fff;
  line-height: 1.2vh;
  height: 2.5vh;
  font-size: 0.35rem;
}
.remain_total,
.environment_value,
.flow_value,
.third_remain_total {
  display: inline-block;
  margin-left: 0.4rem;
  font-size: 0.6rem;
  color: rgb(131, 228, 131);
  font-weight: bold;
}
.third_remain_total {
  margin-left: 0rem;
  margin-right: 0.2rem;
  margin-top: 4vh;
}
.occupancy_text{
  font-size:0.3rem;
   color: rgb(131, 228, 131);
   font-weight:bold;
}
.occupancy{
  color:rgb(212, 73, 73);
}
.wc_icon {
  margin-top: 3.5vh;
}
.third_wc_text {
  margin-top: 1vh;
}

.flow_value {
  font-size: 0.25rem;
  margin-left: 0.2rem;
  color: rgb(0, 255, 213);
}

.environment_value {
  font-size: 0.3rem;
  color: white;
  font-weight: normal;
}
.environment {
  /* margin-left: 0.5rem; */
}
.PM25,
.H2S {
  margin-left: 0.5rem;
}
.H2S {
  color: yellow;
}
.NH3 {
  color: green;
}
.third_environment > li > .PM25 {
  margin-left: 0.2rem;
}

.temperature_icon,.temperature {
  color: rgb(255, 166, 0);
}
.humidity_icon,.humidity {
  color: rgb(0, 153, 255);
}
.NH3_icon,.NH3 {
  color: rgb(255, 72, 0);
}
.H2S_icon,.H2S {
  color: rgb(251, 255, 0);
}
.TVOC_icon,.TVOC {
  color: rgb(83, 252, 57);
}
.PM25_icon,.PM25{
  color: rgb(57, 148, 252);
}
.remain_paper_icon {
  color: rgb(209, 99, 21);
}
.PM10_icon,.PM10 {
  color: rgb(253, 74, 74);
}
.CO2_icon,.CO2 {
  color: rgb(0, 255, 213);
}
.formaldehyde_icon,.formaldehyde {
  color: rgb(68, 245, 121);
} 
.third_environment {
  margin-left: 0rem;
  margin-right: 0.2rem;
}
.column {
  flex: 2;
}
.column:nth-child(2) {
  flex: 5;
}
.panel,
.panel_bottom,
.panel_mid {
  position: relative;
  height: 40vh;
  border: 1px solid rgba(25, 186, 139, 0.17);
  background: url("~/assets/images/line.png") rgba(255, 255, 255, 0.03);
  padding: 2vh 0.1875rem 0.5rem;
  margin-bottom: 1.4vh;
  box-shadow: 0 0 10px rgba(0, 119, 255, 0.5) inset;
}
.panel_evaluation {
  height: 10vh;
}
.panel_third_toilet {
  height: 33.5vh;
}
.panel_video {
  margin-top: 1vh;
  height: 20vh;
}
/* .panel_mid {
  height: 10vh;
} */
.panel_middle {
  margin: 0 10px;
  height: 45vh;
  margin-top: 2vh;
}
.column_middle_footer {
  display: flex;
  height: 31vh;

  margin-top: 3vh;
}
.column_middle_footer > .box {
  flex: 2;
}
.right_box {
  margin-left: 0.1rem;
}
.evaluation_box {
  /* display: flex; */
}
.code{
  margin-top:1vh;
}
.code:nth-child(1) {
  flex: 3;
}
.code:nth-child(2) {
  /* background-color: #fff; */
  flex: 1;
}
.evaluation {
  height: 10vh;
}
.media_video {
  height: 20vh;
}
.panel_bottom {
  height: 42vh;
}
.panel_top {
  height: 40.5vh;
}
.toilet_plan {
  height: 45vh;
  width: 100%;
}
.panel_bottom::before {
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  border-left: 2px solid #02a6b5;
  border-top: 2px solid #02a6b5;
  content: "";
}

.panel_bottom::after {
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-right: 2px solid #02a6b5;
  border-top: 2px solid #02a6b5;
  content: "";
}
.panel::before {
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  border-left: 2px solid #02a6b5;
  border-top: 2px solid #02a6b5;
  content: "";
}

.panel::after {
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-right: 2px solid #02a6b5;
  border-top: 2px solid #02a6b5;
  content: "";
}
.panel_footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

.panel_footer::before {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 10px;
  height: 10px;
  border-left: 2px solid #02a6b5;
  border-bottom: 2px solid #02a6b5;
  content: "";
}

.panel_footer::after {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-right: 2px solid #02a6b5;
  border-bottom: 2px solid #02a6b5;
  content: "";
}
.flow {
  margin-top: 1vh;
}
.flow > div > li {
  display: inline-block;
}
header {
  height: 10vh;
  /* background-color: red; */
  color: #fff;
  position: relative;
}
header > h1 {
  font-size: 0.6rem;
  line-height: 7vh;
  text-align: center;
  font-weight: bold;
}
header > .nowWeather {
  position: absolute;
  left: 0.375rem;
  top: 5vh;
  font-size: 0.4rem;
  background-image: -webkit-gradient(
    linear,
    0 0,
    0 bottom,
    from(#fff),
    to(#5e94d2)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.nowWeather > li {
  display: inline-block;
  margin-right: 0.2rem;
  margin-left: 0.3rem;
}
header > .nowTime {
  position: absolute;
  right: 0.372rem;
  line-height: 0.3rem;
  font-size: 0.5rem;
  top: 5vh;
  background-image: -webkit-gradient(
    linear,
    0 0,
    0 bottom,
    from(#fff),
    to(#5e94d2)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.nowTime li {
  width: 2.2rem;
  display: inline-block;
  padding-right: 0.325rem;
  margin-right: 0.1rem;
}
.showDate {
  font-size: 0.24rem;
}
.main_container {
  width: 100%;
  /*  必须得设置这个最小高度布满整个浏览器窗口，高度可以调整看实际情况 */
  min-height: 100vh;
  background-image: url("~/assets/images/tvBack.png"); /* 设置背景图片的路径 */
  background-size: cover; /* 图片宽度自适应，高度按比例自动调整 */
  background-position: 20 center; /* 居中对齐背景图片 */
  background-repeat: no-repeat; /* 防止背景图片重复 */
}
.module_woman {
  margin-top: -1vh;
}

::v-deep .el-table__body tbody tr {
  background-color: rgb(16, 26, 44);
  font-size: 0.2rem;
  color: red;
}

::v-deep .el-table__row > td {
  font-size: 0.2rem;
  border: none;
}

::v-deep .el-table tbody tr:hover > td {
  font-size: 0.2rem;
  background-color: rgb(16, 26, 44) !important;
}

::v-deep .el-table .cell {
  line-height: 2vh;
}

.panel_top .environment {
  margin-left: 0.5vw;
  margin-top: -0.5vh;
}
/* .box {
  display:inline-block;
} */
</style>
<script setup>
import moment from "moment";
import "moment/locale/zh-cn"; // 导入中文语言包

import { ref, onMounted, onUnmounted, computed, reactive } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { getTemHum, getGas, getOccupancy } from "~/api/index.js";

let totalRecords = ref(1000);
let currentPage = ref(1);
let pageCount = 0;
const router = useRouter();
// 获取传递的参数
const location_name = router.currentRoute.value.query.param;

console.log(444, location_name);

// const tableData = [
//   {
//     // date: "10:23:23",
//     // location: "xx公厕",
//     // toilet: "第三卫生间",
//     warningType: "纸量报警",
//     detail: "暂无报警事件",
//   },

//   {
//     // date: "10:23:23",
//     // location: "xx公厕",
//     // toilet: "女厕",
//     warningType: "水浸报警",
//     detail: "暂无报警事件",
//   },
//   {
//     // date: "10:23:23",
//     // location: "xx公厕",
//     // toilet: "女厕",
//     warningType: "环境参数报警",
//     detail: "暂无报警事件",
//   },
// ];

const tableData = reactive([]);

const getAllSensor = async (pageNum) => {
  tableData.splice(0, tableData.length);
  axios({
    url: "/api/sensor-warning/getWarningSensor",
    data: {
      toilet_location: location_name,
    },
    method: "post",
  }).then((response) => {
    var res = response.data;
    console.log(res);

    for (var sensor in res) {
      var currentCar = {
        warningType: res[sensor].type + "报警",
        detail:
          res[sensor].time +
          " " +
          res[sensor].gender +
          " " +
          res[sensor].status,
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

const temperature_value = ref(0);
const humdity_value = ref(0);
const nh3_value = ref(0);
const h2s_value = ref(0);
const formaldehyde_value = ref(0);
const tvoc_value = ref(0);
const pm25_value = ref(0);
const pm10_value = ref(0);
const co2_value = ref(0);

const level_nice = ref();
const level_normal = ref();
const level_bad = ref();  

const toiletCanvas = ref(null);
const unOccupancyCount = ref(0);
const occupancyCount = ref(0);
const todayIn = ref(0);
const total_crowd = ref(0);



// 发送 HTTP GET 请求获取厕所布局数据

// 定义响应式变量来存储图片文件名
var imageName = ref();

const imagePath = ref("");
const qrcode_imagePath = ref("");
imageName.value = router.currentRoute.value.query.param;

imagePath.value = "images/" + imageName.value + ".png";
qrcode_imagePath.value = "images/qrcode_" + imageName.value + ".png";


var toiletLayout = ref([]);

onMounted(() => {
  function getFlashlight() {
    axios({
      url: "/api/mobile-occupancy/getAllPitStatus",
      data: {
        location_name: location_name,
      },
      method: "post",
    })
      .then((response) => {
        // 处理成功响应
        toiletLayout = response.data;
        console.log("Toilet layout data:", toiletLayout);

        // 这里可以对获取到的数据进行进一步处理
        console.log(444, toiletLayout);
        const canvas = toiletCanvas.value;
        const ctx = canvas.getContext("2d");

        // 更新画布大小
        const updateCanvasSize = () => {
          canvas.width = canvas.offsetWidth;
          canvas.height = canvas.offsetHeight;
          redraw();
        };

        // 绘制每个厕所和占用情况
        const redraw = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const radiusFactor = Math.min(
            canvas.width / 800,
            canvas.height / 600
          ).toFixed(2);
          console.log(222, radiusFactor);
          toiletLayout.forEach((toilet) => {
            const x = (toilet.horizontalDistance * canvas.width) / 800;
            const y = (toilet.verticalDistance * canvas.height) / 600;
            let radius = 12 * radiusFactor; // 圆的半径

            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = toilet.pitStatus == "1" ? "tomato" : "palegreen";
            ctx.fill();
            ctx.closePath();
          });
        };

        // 初始化画布大小并绘制图形
        updateCanvasSize();

        // 监听窗口大小变化，更新画布大小并重新绘制图形
        window.addEventListener("resize", updateCanvasSize);
      })
      .catch((error) => {
        // 处理请求失败情况
        console.error("Error fetching toilet layout:", error);
      });
  }
  getFlashlight();

  // setInterval(getFlashlight, 30000);
    window.setInterval(() => {
    setTimeout(() => {
      getFlashlight();
    }, 0);
  }, 30000);
});

// 组件销毁时移除窗口大小变化监听器
onUnmounted(() => {
  window.removeEventListener("resize", updateCanvasSize);
});

function fetchData() {
  axios({
    url: "/api/mobile-environment/getTodayInAndEnvironment",
    data: {
      location_name: location_name,
    },
    method: "post",
  }).then(function (resp) {
    if (resp.status == 200) {
      console.log(521, resp);
      temperature_value.value = resp.data.temperature;
      humdity_value.value = resp.data.humidity;
      h2s_value.value = resp.data.h2s;
      nh3_value.value = resp.data.nh3;
      tvoc_value.value = resp.data.tvoc;
      pm25_value.value = resp.data.pm25;
      pm10_value.value = resp.data.pm10;
      co2_value.value = resp.data.co2;
      formaldehyde_value.value = resp.data.formaldehyde;
      todayIn.value = resp.data.todayIn;
      total_crowd.value = parseInt(resp.data.totalIn);
    }
  });

 axios({
    url: "/api/mobile-occupancy/getCountByOccupancy",
    data: {
      location_name: location_name,
    },
    method: "post",
  }).then(function (resp) {
    if (resp.status == 200) {
      console.log(520, resp);
      unOccupancyCount.value = resp.data.unOccupancy;
      occupancyCount.value = resp.data.occupancy;
  
    }
  });

  

    axios({
    url: "/api/evaluation/getCountByLevel",
    data: {
      location_name: location_name,
    },
    method: "post",
  }).then(function (resp) {
    if (resp.status == 200) {
      console.log("满意度评价统计", resp);
      level_nice.value = resp.data["非常满意"] ?? 0;
      level_normal.value = resp.data["一般"] ?? 0;
      level_bad.value = resp.data["不满意"] ?? 0;
    }
  });

}



// 初始执行一次
fetchData();
// woman_fetchData();

// 每隔一分钟执行一次
// setInterval(fetchData, 30000);
  window.setInterval(() => {
    setTimeout(() => {
      fetchData();
    }, 0);
  }, 30000);


function backToMap() {
  router.push("/");
}

// 设置全局的本地化语言为中文
const city = ref("");
const weather = ref("");
const temperature = ref("");

moment.locale("zh-cn");
//获取高德天气
const apiUrl =
  "https://restapi.amap.com/v3/weather/weatherInfo?key=af197a710761d6e4757f3898a5d9fad6&city=510106&extensions=base";
axios.get(apiUrl).then((response) => {
  // 请求成功
  city.value = response.data.lives[0].city;
  weather.value = response.data.lives[0].weather;
  temperature.value = response.data.lives[0].temperature + "℃";
  console.log(city.value, weather.value, temperature.value);
});

axios
  .get(
    "https://restapi.amap.com/v3/weather/weatherInfo?key=af197a710761d6e4757f3898a5d9fad6&city=510106&extensions=all"
  )
  .then((response) => {
    // 请求成功

    temperature.value =
      response.data.forecasts[0].casts[0].nighttemp +
      "℃~" +
      response.data.forecasts[0].casts[0].daytemp +
      "℃";
    console.log(city.value, weather.value, temperature.value);
  });

// const city = data.lives.city;
// const temperature = data.current.temp_c;
const currentTime = ref("");
const currentDate = ref("");
const dayOfWeek = ref("");

const updateTime = () => {
  currentTime.value = moment().format("HH:mm:ss");
  currentDate.value = moment().format("YYYY年MM月DD日");
  dayOfWeek.value = moment().format("dddd");
};

onMounted(() => {
  updateTime();

  // 每秒更新时间
  // setInterval(() => {
  //   updateTime();
  // }, 1000);

    window.setInterval(() => {
    setTimeout(() => {
      updateTime();
    }, 0);
  }, 1000);
  
});

// flexible函数是为了自适应 + 结合cssrem插件（设置1rem = 80px）
(function flexible(window, document) {
  var docEl = document.documentElement;
  var dpr = window.devicePixelRatio || 1;

  // adjust body font size
  function setBodyFontSize() {
    if (document.body) {
      document.body.style.fontSize = 12 * dpr + "px";
    } else {
      document.addEventListener("DOMContentLoaded", setBodyFontSize);
    }
  }
  setBodyFontSize();

  // set 1rem = viewWidth / 24  其实1920/24=80px，即1rem=80px
  function setRemUnit() {
    var rem = docEl.clientWidth / 24;
    docEl.style.fontSize = rem + "px";
  }

  setRemUnit();

  // reset rem unit on page resize
  window.addEventListener("resize", setRemUnit);
  window.addEventListener("pageshow", function (e) {
    if (e.persisted) {
      setRemUnit();
    }
  });

  // detect 0.5px supports
  if (dpr >= 2) {
    var fakeBody = document.createElement("body");
    var testElement = document.createElement("div");
    testElement.style.border = ".5px solid transparent";
    fakeBody.appendChild(testElement);
    docEl.appendChild(fakeBody);
    if (testElement.offsetHeight === 1) {
      docEl.classList.add("hairlines");
    }
    docEl.removeChild(fakeBody);
  }
})(window, document);
</script>

<style scoped>
.back-map-btn {
  position: fixed;
  top: 0;
  right: 4vw;
  left: auto;
  background-color: rgb(15, 29, 54);
  border: 0;
  color: white;
  font-size: 0.25rem;
}

.panel_middle {
  position: relative;
}

.toilet_plan {
  /* position: absolute; */
  top: 0;
  left: 0;
  z-index: -1;
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
</style>
