<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24" class="card-box">
        <el-card>
          <template #header>
            <PieChart style="width: 1em; height: 1em; vertical-align: middle" />
            <span style="vertical-align: middle">筛选条件</span>
          </template>
          <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch">
            <el-form-item label="监测项" prop="monitorItem">
              <el-select v-model="queryParams.monitorItem" placeholder="监测项名称" clearable style="width: 200px">
                <el-option v-for="item in monitorItemOptions" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="监测线" prop="monitorLine">
              <el-select v-model="queryParams.monitorLine" placeholder="监测线名称" clearable style="width: 150px">
                <el-option v-for="item in monitorLineOptions" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="监测点" prop="sensor">
              <el-select v-model="queryParams.sensor" placeholder="监测点名称" clearable style="width: 150px">
                <el-option v-for="item in sensorOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="时间段" style="width: 308px;">
              <el-date-picker v-model="dateRange" value-format="YYYY-MM-DD" type="daterange" range-separator="-"
                start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="时间间隔" prop="monitorLine">
              <el-select v-model="hourRange" placeholder="小时" clearable style="width: 80px">
                <el-option v-for="item in hourOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="Search" @click="handleQuery">查询</el-button>
              <el-button icon="Refresh" @click="resetQuery">报表</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="mb8" v-show="false">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['system:dept:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="info" plain icon="Sort" @click="toggleExpandAll">展开/折叠</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-row>
      <el-col :span="24" class="card-box" v-show="false">
        <el-card>
          <template #header>
            <PieChart style="width: 1em; height: 1em; vertical-align: middle" />
            <span style="vertical-align: middle">表格</span>
          </template>
          <el-table v-if="refreshTable" v-loading="loading" :data="deptList" row-key="deptId"
            :default-expand-all="isExpandAll">
            <el-table-column prop="monitorItemName" label="监测项类型" width="200"></el-table-column>
            <el-table-column prop="monitorLineName" label="监测线名称" width="200"></el-table-column>
            <el-table-column prop="sensorName" label="监测点名称" width="200"></el-table-column>
            <el-table-column prop="lastCollectingTime" label="采集时间" width="200"></el-table-column>
            <el-table-column prop="lastDeviceData" label="监测点读数" width="200"></el-table-column>
            <el-table-column prop="lastSinkingData" label="及时形变" width="200"></el-table-column>
            <el-table-column prop="lastSinkingAccumulation" label="累积形变" width="200"></el-table-column>
            <el-table-column prop="alarmLevel" label="状态" width="100"></el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <el-col :span="24" class="card-box">
        <el-card>
          <template #header>
            <PieChart style="width: 1em; height: 1em; vertical-align: middle" />
            <span style="vertical-align: middle">图表</span>
          </template>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <div ref="chartContainer" style="width: 100%; height: 400px"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup name="history">
import { getFilteredUiData, getMonitorItems, getMonitorLines, getSensors } from "@/api/datamodel/monitorline";
import dayjs from 'dayjs'; // 导入 dayjs 用于处理日期和时间
import * as echarts from 'echarts';

const dateRange = ref([]);
const hourRange = ref([]);
const deptList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const title = ref("");
const deptOptions = ref([]);
const isExpandAll = ref(true);
const refreshTable = ref(true);
const data = reactive({
  queryParams: {
    monitorItem: 1,
    monitorLine: 1,
    sensor: 1,
    alarm: 0,
  },
  // ...其他数据属性
});
const { queryParams } = toRefs(data);

// 示例数据源
const monitorItemOptions = getMonitorItems().map(item => ({
  value: item.id, // 使用监测线的 id 作为 value 值
  label: item.name // 使用原始监测线名称作为标签
}));

const monitorLineOptions = getMonitorLines(queryParams.monitorItem).map(item => ({
  value: item.id, // 使用监测线的 id 作为 value 值
  label: item.name // 使用原始监测线名称作为标签
}));

const sensorOptions = getSensors(queryParams.monitorLine).map(item => ({
  value: item.id, // 使用监测线的 id 作为 value 值
  label: item.name // 使用原始监测线名称作为标签
}));

const hourOptions = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
  { value: 7, label: '7' },
  { value: 8, label: '8' },
  { value: 9, label: '9' },
  { value: 10, label: '10' },
  { value: 11, label: '11' },
  { value: 12, label: '12' },
]

const alarmOptions = [
  { value: 0, label: '正常' },
  { value: 1, label: '一级预警' },
  { value: 2, label: '二级预警' },
  { value: 3, label: '三级预警' }
];

/** 查询监测项列表 */
function getList() {
  deptList.value = getFilteredUiData();
  loading.value = false;
}

/** 新增按钮操作 */
function handleAdd(row) {

}
/** 展开/折叠操作 */
function toggleExpandAll() {

}

const { proxy } = getCurrentInstance()
const chartContainer = ref(null)

// 获取过滤后的数据
const filteredData = getFilteredUiData();

// 构造时间序列数据
const times = filteredData.map(item => dayjs(item.lastCollectingTime).format('YYYY-MM-DD HH:mm:ss'));

// 构造监测数据
const monitorData = filteredData.map(item => ({
  value: item.lastDeviceData,
  instant: item.lastSinkingData,
  cumulative: item.lastSinkingAccumulation
}));

const option = ref({
  title: {
    text: '累计形变多曲线',
    subtext: dayjs().format('YYYY-MM-DD HH:mm:ss'), // 当前时间
    left: 'center', // 标题居中
    textStyle: {
      fontSize: 18, // 标题字体大小
      fontWeight: 'bold' // 标题字体加粗
    },
    subtextStyle: {
      fontSize: 14 // 副标题字体大小
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross' // 使用十字准心指示器
    }
  },
  xAxis: {
    type: 'category',
    data: times, // 横轴为时间序列
    axisLabel: {
      rotate: 45, // 旋转45度,防止过长时间字符串显示不全
      fontSize: 12 // 横轴标签字体大小
    }
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      fontSize: 12 // 纵轴标签字体大小
    }
  },
  series: [
    {
      name: '监测点读数',
      type: 'line',
      data: monitorData.map(item => item.value),
      smooth: true, // 使用平滑曲线
      lineStyle: {
        width: 2 // 线条宽度
      }
    },
    {
      name: '即时形变',
      type: 'line',
      data: monitorData.map(item => item.instant),
      smooth: true,
      lineStyle: {
        width: 2
      }
    },
    {
      name: '累计形变',
      type: 'line',
      data: monitorData.map(item => item.cumulative),
      smooth: true,
      lineStyle: {
        width: 2
      }
    }
  ],
  legend: {
    orient: 'vertical', // 图例垂直显示
    x: 'right', // 图例位置
    fontSize: 12 // 图例字体大小
  }
});

// ECharts 实例
let chart = null

onMounted(() => {
  proxy.$nextTick(() => {
    initChart()
    window.addEventListener('resize', chart.resize)
  })
})

const initChart = () => {
  chart = echarts.init(chartContainer.value)
  chart.setOption(option.value)
}

// 在组件卸载时销毁图表实例
onBeforeUnmount(() => {
  window.removeEventListener('resize', chart.resize)
  chart.dispose()
})

// 添加空的 handleQuery 方法
const handleQuery = () => {
  // 处理查询逻辑
};

// 添加空的 resetQuery 方法
const resetQuery = () => {
  // 处理查询逻辑
};

getList();
</script>
