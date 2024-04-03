<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24" class="card-box">
        <el-card>
          <template #header>
            <PieChart style="width: 1em; height: 1em; vertical-align: middle" />
            <span style="vertical-align: middle">监测选项</span>
          </template>
          <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch">
            <el-form-item label="监测项" prop="monitorItem">
              <el-select v-model="queryParams.monitorItem" placeholder="监测项名称" @change="monitorItemSelectChange"
                clearable style="width: 200px">
                <el-option v-for="item in monitorItemOptions" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="监测线" prop="monitorLine">
              <el-select v-model="queryParams.monitorLine" placeholder="监测线名称" clearable style="width: 200px">
                <el-option v-for="item in monitorLineOptions" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="监测点" prop="sensor">
              <el-select v-model="queryParams.sensor" placeholder="监测点名称" clearable style="width: 200px">
                <el-option v-for="item in sensorOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="图表类型" v-show="rainState">
              <el-select v-model="selectedOption" placeholder="请选择" @change="dateTypeSelectChange" clearable
                style="width: 100px">
                <el-option v-for="option in options" :key="option.value" :label="option.label"
                  :value="option.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="雨量日期" v-show="rainState">
              <el-date-picker v-model="selectedDate" :type="datePickerType" placeholder="选择日期" clearable
                style="width: 100px">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
              <el-button icon="Refresh" @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>

      <el-col :span="24" class="card-box">
        <el-card>
          <template #header>
            <PieChart style="width: 1em; height: 1em; vertical-align: middle" />
            <span style="vertical-align: middle">实时数据</span>
          </template>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <div ref="chartContainer" style="width: 100%; height: 400px"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup name="Sensorchart">
import { getFilteredUiData, getMonitorItems, getMonitorLines, getSensors } from "@/api/datamodel/monitorline";
import dayjs from 'dayjs'; // 导入 dayjs 用于处理日期和时间
import * as echarts from 'echarts';
import { ElDatePicker, ElOption, ElSelect } from 'element-plus';

// ECharts 实例
let chart = null;
const showSearch = ref(true);
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

const rainState = ref(false);
const selectedOption = ref(null);
const selectedDate = ref(null);
const options = [
  { label: '月均', value: 'year' },
  { label: '日均', value: 'month' },
  { label: '时均', value: 'day' }
];
const datePickerType = ref('date'); // 默认为日期类型

const dateTypeSelectChange = (value) => {
  if (value === 'year') {
    datePickerType.value = 'year'; // 年份选择
  } else if (value === 'month') {
    datePickerType.value = 'month'; // 月份选择
  } else if (value === 'day') {
    datePickerType.value = 'date'; // 日选择
  }
}

const monitorItemSelectChange = (value) => {
  if (value === 21) {
    rainState.value = true;
  } else {
    rainState.value = false;
  }
}

const renderChart = () => {

  if (chart) {
    chart.dispose();
  }

  chart = echarts.init(chartContainer.value);

  if (rainState.value) {
    const chartData = generateChartData();
    const option = {
      title: {
        text: '降雨量柱状图'
      },
      xAxis: {
        type: 'category',
        data: chartData.xAxisData
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: chartData.seriesData,
        type: 'bar',
        label: {
          show: true,
          position: 'top'
        }
      }]
    };
    chart.setOption(option);
  } else {
    const option = {
      title: {
        text: '实时曲线',
        subtext: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        left: 'center',
        textStyle: {
          fontSize: 18,
          fontWeight: 'bold'
        },
        subtextStyle: {
          fontSize: 14
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      xAxis: {
        type: 'category',
        data: times,
        axisLabel: {
          rotate: 45,
          fontSize: 12
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          fontSize: 12
        }
      },
      series: generateOthersChartData(),
      legend: {
        orient: 'vertical',
        x: 'right',
        fontSize: 12
      }
    };
    chart.setOption(option);
  }
}

const generateChartData = () => {
  // 模拟的降雨量数据
  const rainfallData = [120, 200, 150, 80, 70, 110, 130, 140, 180, 220, 160, 100];
  let xAxisData = [];
  let seriesData = [];
  if (selectedOption.value === 'year') {
    xAxisData = Array.from({ length: 12 }, (_, i) => `${i + 1}月`);
    seriesData = Array.from({ length: 12 }, (_, i) => rainfallData[i]);
  } else if (selectedOption.value === 'month') {
    const date = new Date(selectedDate.value);
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    xAxisData = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}日`);
    seriesData = Array.from({ length: daysInMonth }, () => rainfallData[Math.floor(Math.random() * 12)]);
  } else if (selectedOption.value === 'day') {
    const date = new Date(selectedDate.value);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const startOfDay = new Date(year, month, day, 0, 0, 0);
    const endOfDay = new Date(year, month, day, 23, 59, 59);
    xAxisData = ['0-6时', '6-12时', '12-18时', '18-24时'];
    seriesData = Array.from({ length: 4 }, () => Math.floor(Math.random() * 30));
  }
  return { xAxisData, seriesData };
}

const generateOthersChartData = () => {
  return [
    {
      name: '监测点读数',
      type: 'line',
      data: monitorData.map(item => item.value),
      smooth: true,
      lineStyle: {
        width: 2
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
  ];
}

onMounted(() => {
  renderChart();
});

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



// const option = ref({
//   title: {
//     text: '实时数据监测',
//     subtext: dayjs().format('YYYY-MM-DD HH:mm:ss'), // 当前时间
//     left: 'center', // 标题居中
//     textStyle: {
//       fontSize: 18, // 标题字体大小
//       fontWeight: 'bold' // 标题字体加粗
//     },
//     subtextStyle: {
//       fontSize: 14 // 副标题字体大小
//     }
//   },
//   tooltip: {
//     trigger: 'axis',
//     axisPointer: {
//       type: 'cross' // 使用十字准心指示器
//     }
//   },
//   xAxis: {
//     type: 'category',
//     data: times, // 横轴为时间序列
//     axisLabel: {
//       rotate: 45, // 旋转45度,防止过长时间字符串显示不全
//       fontSize: 12 // 横轴标签字体大小
//     }
//   },
//   yAxis: {
//     type: 'value',
//     axisLabel: {
//       fontSize: 12 // 纵轴标签字体大小
//     }
//   },
//   series: [
//     {
//       name: '监测点读数',
//       type: 'bar',
//       data: monitorData.map(item => item.value),
//     },
//   ],
//   legend: {
//     orient: 'vertical', // 图例垂直显示
//     x: 'right', // 图例位置
//     fontSize: 12 // 图例字体大小
//   }
// });

// // ECharts 实例
// let chart = null

// onMounted(() => {
//   proxy.$nextTick(() => {
//     initChart()
//     window.addEventListener('resize', chart.resize)
//   })
// })

// const initChart = () => {
//   chart = echarts.init(chartContainer.value)
//   chart.setOption(option.value)
// }

// // 在组件卸载时销毁图表实例
// onBeforeUnmount(() => {
//   window.removeEventListener('resize', chart.resize)
//   chart.dispose()
// })

// 添加空的 handleQuery 方法
const handleQuery = () => {
  // 处理查询逻辑
  renderChart();
};

// 添加空的 resetQuery 方法
const resetQuery = () => {
  // 处理查询逻辑
};
</script>
<style scoped>
.chart-container {
  width: 100%;
  height: 400px;
  position: relative;
}

.chart {
  width: 100%;
  height: 100%;
}

@font-face {
  font-family: 'MyFont';
  src: url('myfont.woff2') format('woff2');
  font-display: swap;
  /* 设置字体加载策略为swap */
}
</style>
