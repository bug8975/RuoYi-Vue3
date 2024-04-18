<template>
  <!-- 地图 -->
  <baidu-map class="map" :center="{ lng: 118.454, lat: 32.955 }" :zoom="15" :mapStyle="mapStyle" @ready="ready">
  </baidu-map>
  <div ref="mapContainer" class="map-container" ak="wYecjdkuOs9FoGjK23ouHHMIwf91i1mC"></div>
  <!-- header -->
  <header class="map-header">
    <div class="map-info">
      <!-- 天气组件 -->
      <span class="time-weather">

      </span>
      <!-- 标题 -->
      <div class="map-title">
        <span>{{ title }}</span>
      </div>
      <!-- 右侧按钮 -->
      <span class="header-btn">
        <span class="btn-item" @click="router.push('/system/sensor')">
          <i class="ri-mac-line"></i>控制台</span>
        <!-- v-if="_userRole &&
        CryptoJS.AES.decrypt(_userRole, CRYPTO_SECRET).toString(CryptoJS.enc.Utf8) == 'SUPER' 
        || CryptoJS.AES.decrypt(_userRole, CRYPTO_SECRET).toString(CryptoJS.enc.Utf8) == 'ADMIN'" -->
        <!-- <span class="btn-item"><i class="ri-user-3-fill"></i>{{ _userName }}</span> -->
        <span class="btn-item" @click="logout"><i class="ri-logout-circle-r-fill"></i>退出</span>
      </span>
    </div>
  </header>
  <!-- 左侧 -->
  <div class="map-left">
    <!-- 边框四角装饰组件 -->
    <!-- 选择地铁线路 -->
    <div class="map-left-item select-lines">
      <div class="left-title">
        <i class="i-left-title ri-subway-fill"></i>
        <span>地铁线路</span>
      </div>
      <div class="project-container">
        <el-select class="project-select" v-model="lineId" filterable clearable placeholder="全部线路" no-match-text="暂无线路"
          popper-class="gh__map-project" @change="handleProjectItem">
          <el-option v-for="item of projectList" :key="item.id" :label="item.projectName" :value="item.id">
          </el-option>
        </el-select>
      </div>
    </div>
    <!-- 提示级别 -->
    <div class="map-left-item warning-level">
      <div class="left-title">
        <i class="i-left-title ri-alarm-warning-fill"></i>
        <span>提示级别</span>
      </div>
      <ul class="warning-contanier">
        <li :class="['warning-item', 'warning-red']" @click="handleShowPoint('3')" v-if="l3Count != 0">
          <div class="warning-item-left">
            <i class="i-title ri-water-flash-fill"></i>
            <span>一级</span>
          </div>
          <div class="warning-item-right">
            <span>{{ l3Count }}</span>个
          </div>
        </li>
        <li :class="['warning-item', 'warning-yellow']" @click="handleShowPoint('2')" v-if="l2Count != 0">
          <div class="warning-item-left">
            <i class="i-title ri-water-flash-fill"></i>
            <span>二级</span>
          </div>
          <div class="warning-item-right">
            <span>{{ l2Count }}</span>个
          </div>
        </li>
        <li :class="['warning-item', 'warning-blue']" @click="handleShowPoint('1')" v-if="l1Count != 0">
          <div class="warning-item-left">
            <i class="i-title ri-water-flash-fill"></i>
            <span>三级</span>
          </div>
          <div class="warning-item-right">
            <span>{{ l1Count }}</span>个
          </div>
        </li>
        <li :class="['warning-item', 'warning-green']" @click="handleShowPoint('0')" v-if="normalCounts.length != 0">
          <div class="warning-item-left">
            <i class="i-title ri-water-flash-fill"></i>
            <span>正常</span>
          </div>
          <div class="warning-item-right">
            <span>{{ normalCounts.length }}</span>个
          </div>
        </li>
      </ul>
    </div>
    <!-- 水位监测点 -->
    <div class="map-left-item monitor-dot">
      <div class="left-title">
        <i class="i-left-title ri-drop-fill"></i>
        <span>水位监测点</span>
      </div>
      <ul class="dot-contanier">
        <li class="dot-item" @click="handleShowPoint('allline')">
          <div class="dot-title">水位监测点</div>
          <div class="dot-number-contanier">
            <span class="dot-number">{{ dtLineDataVOs.length }}</span>个
          </div>
        </li>
        <li class="dot-item" @click="handleShowPoint('online')">
          <div class="dot-title">当前在线</div>
          <div class="dot-number-contanier">
            <span class="dot-number">{{ onlineConuts.length }}</span>个
          </div>
        </li>
        <li class="dot-item" @click="handleShowPoint('offline')">
          <div class="dot-title">当前离线</div>
          <div class="dot-number-contanier">
            <span class="dot-number">{{ offlineConuts.length }}</span>个
          </div>
        </li>
      </ul>
    </div>
  </div>
  <!-- 右侧 -->
  <div class="map-right" v-if="rightLevelTitle">
    <!-- 边框四角装饰组件 -->
    <div class="map-right-item">
      <div :class="['right-title', rightLevelClassName]">
        <div>
          <i class="i-right-title ri-water-flash-fill"></i>
          <span>{{ rightLevelTitle }}</span>
        </div>
        <i class="ri-close-line i-close" @click="hanldClose"></i>
      </div>
      <el-scrollbar class="gh-scrollbar">
        <ul class="level-data-container">
          <li>

          </li>
        </ul>
      </el-scrollbar>
    </div>
  </div>

  <!-- 右下角切换地图入口 -->
  <div class="map-type" @mouseover="mouseMap" @mouseleave="mouseLeave">
    <i class="ri-map-2-line"></i>
    <!-- 地图切换缩略图 -->
    <ul :class="[
      'map-type-img',
      isOverMapType ? 'over-map-type' : 'leave-map-type',
    ]">
      <!-- <li v-for="item of mapTypes" :key="item.id" :class="[item.className, _index == item.id ? 'map-type-active' : '']"
        @click="mapTypeClick(item.id)">
        <span>{{ item.desc }}</span>
      </li> -->
    </ul>
  </div>
  <!-- 显示视频 -->
  <div class="player-content">
    <el-dialog v-model="dialogVideoVisible" :title="dialogTitle" custom-class="gh-dialog-wrapper" @close="stopVideo()"
      width="1000px" height="600px">
      <div id="myplayer" style="width:1000px;height:600px;margin:0,0,0,0;"></div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user';
import { ElMessageBox } from 'element-plus';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// 引入样式文件
import styleJson from './data/mapConfig.json';

const router = useRouter();
const userStore = useUserStore();

// 模拟数据
const title = ref('自动化在线监测系统');
const lineId = ref(''); // 选择的地铁线路 ID
const projectList = ref([  // 地铁线路列表
  { id: 1, projectName: '地铁线路1' },
  { id: 2, projectName: '地铁线路2' },
  // more items
]);
const l3Count = ref(10); // 一级警告数量
const l2Count = ref(15); // 二级警告数量
const l1Count = ref(5);  // 三级警告数量
const normalCounts = ref([/* ... */]); // 正常数量数据
const dtLineDataVOs = ref([/* ... */]); // 水位监测点数据
const onlineConuts = ref([/* ... */]);   // 在线监测点数量
const offlineConuts = ref([/* ... */]);  // 离线监测点数量
const rightLevelTitle = ref('预警信息'); // 右侧标题
const rightLevelClassName = ref('class-name'); // 右侧标题样式类名
const mapTypes = ref([ // 地图切换类型列表
  { id: 1, className: 'type1', desc: '类型1' },
  { id: 2, className: 'type2', desc: '类型2' },
  // more items
]);
const dialogVideoVisible = ref(false); // 视频弹窗是否可见
const dialogTitle = ref('视频标题'); // 视频弹窗标题

const mapStyle = {
  styleJson: styleJson,
};
// // 初始化地图
const ready = ({ BMap, map }) => {
  //  对地图进行自定义操作
  var myPurpleIcon = new BMap.Icon('public/assets/images/allStyleMarker.png', new BMap.Size(18, 27), { "imageOffset": new BMap.Size(-72, -22) });
  const point = new BMap.Point(121.179987, 31.301937); // 创建点坐标
  map.centerAndZoom(point, 11); // 初始化地图，设置中心点坐标和地图级别
  map.enableScrollWheelZoom(true); // 启用滚轮放大缩小

  // 设置地图样式
  // map.setMapStyleV2({
  //   styleJson: styleJson,
  // });

  // 添加标记点
  dataSource.dtLineDataVOs.forEach((item) => {
    const marker = new BMap.Marker(new BMap.Point(item.longitude, item.latitude)); // 创建标注
    map.addOverlay(marker); // 将标注添加到地图中
  });
};

// 方法
function routerPush(path) {
  // 页面跳转逻辑
}

function handleProjectItem() {
  // 处理地铁线路选择逻辑
}

function handleShowPoint(level) {
  // 处理不同级别提示的展示逻辑
}

function mouseMap() {
  // 鼠标移入地图切换入口逻辑
}

function mouseLeave() {
  // 鼠标移出地图切换入口逻辑
}

function mapTypeClick(id) {
  // 处理地图切换类型点击逻辑
}

function stopVideo() {
  // 停止视频播放逻辑
}

function hanldClose() {
  // 右侧内容区域关闭逻辑
}

function logout() {
  ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    userStore.logOut().then(() => {
      location.href = '/map';
    })
  }).catch(() => { });
}

// 数据源
const dataSource = {
  l3Count: 0,
  l1Count: 155,
  avglongitude: 114.62163683794407,
  code: 200,
  avglatitude: 30.31379226170574,
  dtLineDataVOs: [
    {
      monitorLineName: 'M20230301001',
      sensorName: 'M20230301001',
      dtLineName: 'M20230301001',
      longitude: 121.179987,
      latitude: 31.301937,
      alarmLevel: 0,
      lastCollectingTime: '0',
      sensorBat: 0,
      time: '0',
      dtLineAddress: '昌吉路156弄42号',
      lastDeviceData: '0.0Y/N',
      imageName: '20230817142839_1.jpg',
    },
    {
      monitorLineName: 'M20230222001',
      sensorName: 'M20230222001',
      dtLineName: 'M20230222001',
      longitude: 121.179765,
      latitude: 31.302004,
      alarmLevel: 0,
      lastCollectingTime: '0',
      sensorBat: 0,
      time: '0',
      dtLineAddress: '昌吉路156弄42号',
      lastDeviceData: '0.0Y/N',
    },
    {
      monitorLineName: 'M20230301201',
      sensorName: 'M20230301201',
      dtLineName: 'M20230301201',
      longitude: 120.116131,
      latitude: 30.242502,
      alarmLevel: 0,
      lastCollectingTime: '0',
      sensorBat: 0,
      time: '0',
      dtLineAddress: '杭州西湖',
      lastDeviceData: '0.0Y/N',
    },
  ],
};
</script>


<style lang="scss" scoped>
// 去掉弹框内容的默认padding值 
.player-content {
  :deep(.el-dialog__body) {
    padding-bottom: 0px;
    padding-left: 0px !important;
    padding-right: 0px !important;
    padding-top: 0px !important;
  }
}

#bm-view {
  width: 100%;
  height: 100%;
}

.map-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 1920px;
  height: 40px;
  background: $mainBlue;
  z-index: 99;

  .map-info {
    position: absolute;
    top: 0;
    left: 50%;
    width: 1696px;
    height: 60px;
    color: white;
    font-size: 20px;
    line-height: 60px;
    transform: translateX(-50%);
    background: url('@/assets/images/header-bg.png') no-repeat;
    background-size: contain;
    z-index: 100;

    .time-weather {
      display: inline-block;
      margin-left: 78px;
    }

    .header-btn {
      position: absolute;
      right: 77px;
      display: inline-flex;
      justify-content: space-around;
      align-items: center;
      width: 340px;

      .btn-item {
        cursor: pointer;
        display: flex;
        align-items: center;

        >i {
          margin-right: 6px;
          font-size: 20px;
        }
      }
    }
  }

  .map-title {
    position: absolute;
    top: 0;
    left: 50%;
    width: 734px;
    height: 80px;
    text-align: center;
    line-height: 80px;
    transform: translateX(-50%);
    background: url('@/assets/images/title-bg.png') no-repeat;
    background-size: contain;
    z-index: 101;

    span {
      background-image: -webkit-linear-gradient(bottom,
          rgba(255, 255, 255, 1),
          rgba(166, 217, 255, 1));
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 40px;
    }
  }
}

.map-left {
  position: absolute;
  // top: 50%;
  top: 140px;
  left: 20px;
  width: 360px;
  // height: 746px;
  background: rgba(0, 29, 106, 0.8);
  padding: 20px 0;
  // transform: translateY(-50%);
  z-index: 99;

  .map-left-item {
    background: linear-gradient(180deg,
        rgba(6, 43, 139, 0.6) 0%,
        rgba(6, 72, 199, 0.6) 98.44%);
    border: 1px solid #1350d0;
    width: 334px;
    margin: 0 auto;
  }

  .left-title {
    display: flex;
    align-items: center;
    padding-left: 22px;
    height: 56px;
    color: white;
    font-size: 16px;
    font-weight: bolder;
    background: linear-gradient(180deg, #062b8b 0%, #066ac7 98.44%);

    .i-left-title {
      font-size: 20px;
      margin-right: 12px;
    }
  }

  .warning-level {
    margin: 15px auto;
  }
}

.project-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 102px;

  .project-select {
    width: 294px;
    height: 50px;

    :deep(.select-trigger) {
      height: 100%;
    }

    :deep(.el-input) {
      height: 100%;
    }

    :deep(.el-input__wrapper) {
      height: 100%;
      background: transparent !important;
      box-shadow: none;
      border: 1px solid #1350d0;
      border-radius: 2px;
    }

    :deep(.el-input__inner) {
      height: 100%;
      color: white;

      &::-webkit-input-placeholder {
        color: white;
      }
    }

    :deep(.el-input.is-focus) {
      .el-input__wrapper {
        box-shadow: none !important;
      }
    }

    :deep(.el-input__wrapper.is-focus) {
      box-shadow: none !important;
    }

    :deep(.el-input__suffix) {
      i {
        color: white;
        font-weight: bold;
        font-size: 16px;
      }
    }
  }
}

.warning-contanier {
  .warning-item {
    padding: 0 20px 0 30px;
    display: flex;
    height: 70px;
    border-bottom: 1px solid rgba(225, 225, 225, 0.1);
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    cursor: pointer;

    &:last-child {
      border-bottom: none;
    }

    .warning-item-left {
      display: flex;
      align-items: center;
      font-weight: 400;
    }

    .warning-item-right {
      span {
        font-size: 30px;
        margin-right: 6px;
      }
    }

    .i-title {
      transform: rotate(180deg);
      display: inline-block;
      margin-right: 14px;
      font-size: 30px;
    }
  }
}

.warning-red {
  color: #ff3b3b !important;
}

.warning-yellow {
  color: #ffcc00 !important;
}

.warning-blue {
  color: #3dd0ff !important;
}

.warning-green {
  color: #5ad22f !important;
}

.gh-scrollbar {
  height: pxTovh(570);
}

.dot-contanier {
  display: flex;
  color: white;
  padding: 0 13px;
  height: 124px;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;

  .dot-item {
    height: 57px;
    cursor: pointer;

    &:nth-of-type(2) {
      padding: 0 20px;
      border-left: 2px solid rgba(225, 225, 225, 0.1);
      border-right: 2px solid rgba(225, 225, 225, 0.1);
    }
  }

  .dot-title {
    font-size: 14px;
  }

  .dot-number-contanier {
    margin-top: 6px;
  }

  .dot-number {
    display: inline-block;
    margin-right: 8px;
    font-size: 30px;
  }
}

.map-right {
  position: absolute;
  top: 140px;
  right: 20px;
  width: 360px;
  height: pxTovh(660);
  background: rgba(0, 29, 106, 0.8);
  z-index: 99;

  .map-right-item {
    background: linear-gradient(180deg,
        rgba(6, 43, 139, 0.6) 0%,
        rgba(6, 72, 199, 0.6) 98.44%);
    border: 1px solid #1350d0;
    width: 334px;
    // margin: 20px auto;
    margin: pxTovh(18) auto;
  }

  .right-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 22px;
    // height: 56px;
    height: pxTovh(50);
    color: white;
    font-size: 16px;
    font-weight: bolder;
    background: linear-gradient(180deg, #062b8b 0%, #066ac7 98.44%);

    >div {
      display: flex;
      align-items: center;
    }

    .i-right-title {
      transform: rotate(180deg);
      font-size: 20px;
      margin-right: 12px;
    }

    .i-close {
      padding-right: 10px;
      display: block;
      color: white;
      font-size: 30px;
      cursor: pointer;
    }
  }
}

.level-data-container {
  .level-data-item {
    cursor: pointer;
    padding: pxTovh(10) 15px;
    color: white;
    border-bottom: 1px solid rgba(225, 225, 225, 0.1);

    span {
      margin-left: 10px;
      font-size: 14px;
    }

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }

  .level-select {
    font-weight: bold;
    background: rgba(255, 255, 255, 0.1);
  }
}

.map-type {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 24px;
  font-weight: bold;
  color: white;
  background: url('@/assets/images/btn-bg.png') center no-repeat;
  background-size: cover;
  text-align: center;
  z-index: 98;
  cursor: pointer;
}

.map-type-img {
  position: absolute;
  bottom: 0;
  right: 40px;
  display: flex;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 98;
  overflow: hidden;
  transition: width 0.5s;

  >li {
    border: 1px solid transparent;
    font-size: 16px;
    color: white;
    text-align: right;
    line-height: 138px;
    cursor: pointer;
    transition: width 0.5s;

    &:hover {
      @extend .map-type-active;
    }
  }

  .type-dark {
    background: url('@/assets/images/dark.png') center no-repeat;
    background-size: cover;
  }

  .type-light {
    margin: 0 15px;
    background: url('@/assets/images/light.png') center no-repeat;
    background-size: cover;
  }

  .type-earth {
    background: url('@/assets/images/earth.png') center no-repeat;
    background-size: cover;
  }

  .map-type-active {
    border: 1px solid $iconBlue;

    span {
      background: $iconBlue;
    }
  }
}

.over-map-type {
  width: auto;
  padding: 12px;

  >li {
    width: 128px;
    height: 78px;
    opacity: 1;
  }
}

.leave-map-type {
  width: 0;
  padding: 0;

  >li {
    width: 0;
    height: 0;
    opacity: 0;
  }
}

.map {
  width: 100%;
  height: 100%;
}
</style>
<style lang="scss">
@import '@/assets/styles/_baidu.scss';

.el-overlay.is-message-box {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
  height: 100%;
  background-color: var(--el-overlay-color-lighter);
  overflow: auto;
}

.gh__loading {
  .el-loading-text {
    margin-top: 10px !important;
    color: white !important;
    font-size: 16px !important;
    letter-spacing: 3px !important;
  }

  .circular {
    width: 70px !important;
    height: 70px !important;

    .path {
      stroke: white !important;
    }
  }
}

.gh__map-project {
  background: linear-gradient(180deg, #062b8b 0%, #0648c7 98.44%) !important;
  border: 1px solid #1350d0 !important;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2) !important;
  color: white;

  .el-popper__arrow {
    display: none;
  }

  .el-select-dropdown__item {
    display: flex;
    align-items: center;
    color: white;
  }

  .el-select-dropdown__item.hover {
    background: rgba(255, 255, 255, 0.2);
  }

  .opt-ico-container {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background: white;
    margin-right: 10px;
    width: 24px;
    height: 24px;
    border-radius: 100%;

    .i-subway {
      color: $mainBlue;
    }
  }
}

.baidu-overlay-animation {
  height: bigPx(30);
  width: bigPx(40);
  border-radius: 100%;
  transform: scale(0);
}

.baidu-overlay-animation-green {
  background: rgba(90, 210, 47, 1);
  animation: colorGreen 1.5s;
  animation-iteration-count: infinite;
}

.baidu-overlay-animation-blue {
  background: rgba(61, 208, 255, 1);
  animation: colorBlue 1.5s;
  animation-iteration-count: infinite;
}

.baidu-overlay-animation-yellow {
  background: rgba(255, 204, 0, 1);
  animation: colorYellow 1.5s;
  animation-iteration-count: infinite;
}

.baidu-overlay-animation-red {
  background: rgba(255, 59, 59, 1);
  animation: colorRed 1.5s;
  animation-iteration-count: infinite;
}

@keyframes colorGreen {
  to {
    transform: scale(0.8);
    background: rgba(90, 210, 47, 0);
  }
}

@keyframes colorBlue {
  to {
    transform: scale(0.8);
    background: rgba(61, 208, 255, 0);
  }
}

@keyframes colorYellow {
  to {
    transform: scale(0.8);
    background: rgba(255, 204, 0, 0);
  }
}

@keyframes colorRed {
  to {
    transform: scale(0.8);
    background: rgba(255, 59, 59, 0);
  }
}
</style>