<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch">
      <el-form-item label="监测项" prop="monitorItem">
        <el-select v-model="queryParams.monitorItem" placeholder="监测项名称" clearable style="width: 200px">
          <el-option v-for="item in monitorItemOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="监测线" prop="monitorLine">
        <el-select v-model="queryParams.monitorLine" placeholder="监测线名称" clearable style="width: 150px">
          <el-option v-for="item in monitorLineOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="监测点" prop="sensor">
        <el-select v-model="queryParams.sensor" placeholder="监测点名称" clearable style="width: 150px">
          <el-option v-for="item in sensorOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间" style="width: 308px;">
        <el-date-picker v-model="dateRange" value-format="YYYY-MM-DD" type="daterange" range-separator="-"
          start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="时间段" prop="monitorLine">
        <el-select v-model="hourRange" placeholder="小时" clearable style="width: 80px">
          <el-option v-for="item in hourOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['system:dept:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="info" plain icon="Sort" @click="toggleExpandAll">展开/折叠</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-if="refreshTable" v-loading="loading" :data="deptList" row-key="deptId" :default-expand-all="isExpandAll">
      <el-table-column prop="monitorItemName" label="监测项类型" width="200"></el-table-column>
      <el-table-column prop="monitorLineName" label="监测线名称" width="200"></el-table-column>
      <el-table-column prop="sensorName" label="监测点名称" width="200"></el-table-column>
      <el-table-column prop="lastCollectingTime" label="采集时间" width="200"></el-table-column>
      <el-table-column prop="lastDeviceData" label="监测点读数" width="200"></el-table-column>
      <el-table-column prop="lastSinkingData" label="及时形变" width="200"></el-table-column>
      <el-table-column prop="lastSinkingAccumulation" label="累积形变" width="200"></el-table-column>
      <el-table-column prop="alarmLevel" label="状态" width="100"></el-table-column>
    </el-table>
  </div>
</template>

<script setup name="history">
import { getFilteredUiData, getMonitorItems, getMonitorLines, getSensors } from "@/api/datamodel/monitorline";

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

getList();
</script>
