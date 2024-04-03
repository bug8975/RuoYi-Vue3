const monitorItems = [
  {
    id: 1,
    lastModifyTime: 1467516237364,
    name: '磁致伸缩式静力水准仪',
    type: 1,
    deviceTh: '监测点读数',
    skinTh: '即时形变',
    accTh: '累计形变'
  },
  {
    id: 2,
    lastModifyTime: 1467516237364,
    name: '液压式静力水准仪',
    type: 1,
    deviceTh: '监测点读数',
    skinTh: '即时形变',
    accTh: '累计形变'
  },
  {
    id: 3,
    lastModifyTime: 1467516237364,
    name: '电感式静力水准仪',
    type: 1,
    deviceTh: '监测点读数',
    skinTh: '即时形变',
    accTh: '累计形变'
  },
  {
    id: 4,
    lastModifyTime: 1467516237364,
    name: '位移传感器',
    type: 1,
    deviceTh: '监测点读数',
    skinTh: '即时形变',
    accTh: '累计形变'
  },
  {
    id: 5,
    lastModifyTime: 1467516237364,
    name: '轴力计',
    type: 3,
    deviceTh: '频率值',
    skinTh: '本次物理量',
    accTh: '累计物理量'
  },
  {
    id: 6,
    lastModifyTime: 1467516237364,
    name: '土力计',
    type: 3,
    deviceTh: '频率值',
    skinTh: '本次物理量',
    accTh: '累计物理量'
  },
  {
    id: 7,
    lastModifyTime: 1467516237364,
    name: '钢筋应力计',
    type: 3,
    deviceTh: '频率值',
    skinTh: '本次物理量',
    accTh: '累计物理量'
  },
  {
    id: 8,
    lastModifyTime: 1467516237364,
    name: '应变计',
    type: 3,
    deviceTh: '频率值',
    skinTh: '本次物理量',
    accTh: '累计物理量'
  },
  {
    id: 9,
    lastModifyTime: 1467516237364,
    name: '锚索计',
    type: 3,
    deviceTh: '频率值',
    skinTh: '本次物理量',
    accTh: '累计物理量'
  },
  {
    id: 10,
    lastModifyTime: 1467516237364,
    name: '固定式测斜仪',
    type: 2,
    deviceTh: 'X',
    skinTh: 'Y',
    accTh: 'Z'
  },
  {
    id: 11,
    lastModifyTime: 1467516237364,
    name: '倾角计',
    type: 2,
    deviceTh: 'X',
    skinTh: 'Y',
    accTh: 'Z'
  },
  {
    id: 12,
    lastModifyTime: 1467516237364,
    name: '激光传感器',
    type: 1,
    deviceTh: '监测点读数',
    skinTh: '即时形变',
    accTh: '累计形变'
  },
  {
    id: 13,
    lastModifyTime: 1467516237364,
    name: '孔隙水压力传感器',
    type: 1,
    deviceTh: '监测点读数',
    skinTh: '即时形变',
    accTh: '累计形变'
  },
  {
    id: 14,
    lastModifyTime: 1467516237364,
    name: '水位计',
    type: 1,
    deviceTh: '管口到液面距离',
    skinTh: '即时形变',
    accTh: '累计形变'
  },
  {
    id: 15,
    lastModifyTime: 1467516237364,
    name: '机器人',
    type: 2,
    deviceTh: 'X',
    skinTh: 'Y',
    accTh: 'Z'
  },
  {
    id: 16,
    lastModifyTime: 1467516237364,
    name: '加速度计',
    type: 1,
    deviceTh: '监测点读数',
    skinTh: '即时形变',
    accTh: '累计形变'
  },
  {
    id: 17,
    lastModifyTime: 1467516237364,
    name: 'SW',
    type: 2,
    deviceTh: 'X',
    skinTh: 'Y',
    accTh: 'Z'
  },
  {
    id: 18,
    lastModifyTime: 1467516237364,
    name: '全向位移计',
    type: 2,
    deviceTh: 'X',
    skinTh: 'Y',
    accTh: 'Z'
  },
  {
    id: 19,
    lastModifyTime: 1467516237364,
    name: '轴压计',
    type: 1,
    deviceTh: '监测点读数',
    skinTh: '即时形变',
    accTh: '累计形变'
  },
  {
    id: 20,
    lastModifyTime: 1467516237364,
    name: '温度计',
    type: 1,
    deviceTh: '监测点读数',
    skinTh: '即时形变',
    accTh: '累计形变'
  },
  {
    id: 21,
    lastModifyTime: 1467516237364,
    name: '雨量计',
    type: 1,
    deviceTh: '监测点读数',
    skinTh: '即时形变',
    accTh: '累计形变'
  },
  {
    id: 22,
    lastModifyTime: 1467516237364,
    name: '风速风向计',
    type: 1,
    deviceTh: '监测点读数',
    skinTh: '即时形变',
    accTh: '累计形变'
  },
  {
    id: 23,
    lastModifyTime: 1467516237364,
    name: '流量计',
    type: 1,
    deviceTh: '监测点读数',
    skinTh: '即时形变',
    accTh: '累计形变'
  },
  {
    id: 24,
    lastModifyTime: 1467516237364,
    name: '水质仪',
    type: 1,
    deviceTh: '监测点读数',
    skinTh: '即时形变',
    accTh: '累计形变'
  },
  {
    id: 25,
    lastModifyTime: 1467516237364,
    name: '电流电压',
    type: 1,
    deviceTh: '监测点读数',
    skinTh: '即时形变',
    accTh: '累计形变'
  }
];

const sensorTypes = [
  {
    id: 1,
    addTime: 1467516237364,
    deleteStatus: false,
    name: 'C-levelingTransducer',
    displayName: '磁致伸缩式静力水准仪',
    usingStatus: 0,
    unit: 'mm',
    itemName: '磁致伸缩式静力水准仪'
  },
  {
    id: 2,
    addTime: 1467516237364,
    deleteStatus: false,
    name: 'P-levelingTransducer',
    displayName: '液压式静力水准仪',
    usingStatus: 0,
    unit: 'mm',
    itemName: '液压式静力水准仪'
  },
  {
    id: 3,
    addTime: 1467516237364,
    deleteStatus: false,
    name: 'I-levelingTransducer',
    displayName: '电感式静力水准仪',
    usingStatus: -1,
    unit: 'mm',
    itemName: '电感式静力水准仪'
  },
  {
    id: 4,
    addTime: 1467516237364,
    deleteStatus: false,
    name: 'DisplacementSensor',
    displayName: '位移传感器',
    usingStatus: 0,
    unit: 'mm',
    itemName: '位移传感器'
  },
  {
    id: 5,
    addTime: 1467516237364,
    deleteStatus: false,
    name: 'AxialForceMeter',
    displayName: '轴力计',
    usingStatus: 0,
    unit: 'Mpa',
    itemName: '轴力计'
  },
  {
    id: 6,
    addTime: 1467516237364,
    deleteStatus: false,
    name: 'EarthPressureGauge',
    displayName: '土力计',
    usingStatus: 0,
    unit: 'Mpa',
    itemName: '土力计'
  },
  {
    id: 7,
    addTime: 1467516237364,
    deleteStatus: false,
    name: 'SteelStressMeter',
    displayName: '钢筋应力计',
    usingStatus: 0,
    unit: 'KN',
    itemName: '钢筋应力计'
  },
  {
    id: 8,
    addTime: 1467516237364,
    deleteStatus: false,
    name: 'StrainGauge',
    displayName: '应变计',
    usingStatus: 0,
    unit: 'με',
    itemName: '应变计'
  },
  {
    id: 9,
    addTime: 1467516237364,
    deleteStatus: false,
    name: 'AnchorDynamometer',
    displayName: '锚索计',
    usingStatus: 0,
    unit: 'Mpa',
    itemName: '锚索计'
  },
  {
    id: 10,
    addTime: 1467516237364,
    deleteStatus: false,
    name: 'FixedInclinoMeter',
    displayName: '固定式测斜仪',
    usingStatus: 0,
    unit: '°/mm',
    itemName: '固定式测斜仪'
  },
  {
    id: 11,
    addTime: 1467516237364,
    deleteStatus: false,
    name: 'InclinoMeter',
    displayName: '倾角计',
    usingStatus: 0,
    unit: '°',
    itemName: '倾角计'
  },
  {
    id: 12,
    addTime: 1467516237364,
    deleteStatus: false,
    name: 'LaserSensor',
    displayName: '激光传感器',
    usingStatus: 0,
    unit: 'm',
    itemName: '激光传感器'
  },
  {
    id: 13,
    addTime: 1467516237364,
    deleteStatus: false,
    name: 'PoreWaterPressureSensor',
    displayName: '孔隙水压力传感器',
    usingStatus: -1,
    unit: 'Mpa',
    itemName: '孔隙水压力传感器'
  },
  {
    id: 14,
    addTime: 1467516237364,
    deleteStatus: false,
    name: 'WaterLevelGauge',
    displayName: '水位计',
    usingStatus: 0,
    unit: 'm',
    itemName: '水位计'
  },
  {
    id: 15,
    addTime: 1467516237364,
    deleteStatus: false,
    name: 'Robot',
    displayName: '机器人',
    usingStatus: 0,
    unit: 'mm',
    itemName: '机器人'
  },
  {
    id: 16,
    addTime: 1467516237364,
    deleteStatus: false,
    name: 'AccelerateMeter',
    displayName: '加速度计',
    usingStatus: -1,
    unit: 'g',
    itemName: '加速度计'
  },
  {
    id: 17,
    addTime: 1467516237364,
    deleteStatus: false,
    name: 'Gnss',
    displayName: 'SW',
    usingStatus: 0,
    unit: 'mm',
    itemName: 'SW'
  },
  {
    id: 18,
    addTime: 1467516237364,
    deleteStatus: false,
    name: 'OmniDisplacementSensor',
    displayName: '全向位移计',
    usingStatus: 0,
    unit: 'mm',
    itemName: '全向位移计'
  },
  {
    id: 19,
    addTime: 1467516237364,
    deleteStatus: false,
    name: 'SettlementMeter',
    displayName: '轴压计',
    usingStatus: 0,
    unit: 'KN',
    itemName: '轴压计'
  },
  {
    id: 20,
    addTime: 1467516237364,
    deleteStatus: false,
    name: 'Thermometer',
    displayName: '温度计',
    usingStatus: 0,
    unit: '°C',
    itemName: '温度计'
  },
  {
    id: 21,
    addTime: 1467516237364,
    deleteStatus: false,
    name: 'RainGauge',
    displayName: '雨量计',
    usingStatus: 0,
    unit: 'mm',
    itemName: '雨量计'
  },
  {
    id: 22,
    addTime: 1467516237364,
    deleteStatus: false,
    name: 'WindGauge',
    displayName: '风速风向计',
    usingStatus: 0,
    unit: 'm/s',
    itemName: '风速风向计'
  },
  {
    id: 23,
    addTime: 1467516237364,
    deleteStatus: false,
    name: 'Flowmeter',
    displayName: '流量计',
    usingStatus: -1,
    unit: 'L',
    itemName: '流量计'
  },
  {
    id: 24,
    addTime: 1467516237364,
    deleteStatus: false,
    name: 'WaterQualityGauge',
    displayName: '水质仪',
    usingStatus: -1,
    unit: '%',
    itemName: '水质仪'
  },
  {
    id: 25,
    addTime: 1467516237364,
    deleteStatus: false,
    name: 'VoltageCurrentMeter',
    displayName: '电流电压',
    usingStatus: -1,
    unit: 'A/U',
    itemName: '电流电压'
  },
  {
    id: 26,
    addTime: 1664335549000,
    deleteStatus: false,
    name: 'Vibration-Sensor',
    displayName: '振动传感器',
    usingStatus: 1,
    unit: 'mm',
    itemName: '振动传感器'
  },
  {
    id: 27,
    addTime: 1467516237364,
    deleteStatus: false,
    name: 'VibrationRate',
    displayName: '振动速度',
    usingStatus: 0,
    unit: 'mm/s',
    itemName: '振动速度'
  },
  {
    id: 28,
    addTime: 1467516237364,
    deleteStatus: false,
    name: 'VibrationAmplitude',
    displayName: '振动位移',
    usingStatus: 0,
    unit: 'mm',
    itemName: '振动位移'
  },
  {
    id: 29,
    addTime: 1467516237364,
    deleteStatus: false,
    name: 'SP-LaserSensor',
    displayName: '激光传感器-高支模-水平',
    usingStatus: 0,
    unit: 'mm',
    itemName: '激光传感器-高支模-水平'
  },
  {
    id: 30,
    addTime: 1467516237364,
    deleteStatus: false,
    name: 'SP-InclinoMeter',
    displayName: '倾角传感器-高支模-水平',
    usingStatus: 0,
    unit: 'mm',
    itemName: '倾角传感器-高支模-水平'
  },
  {
    id: 31,
    addTime: 1467516237364,
    deleteStatus: false,
    name: 'CJ-LaserSensor',
    displayName: '激光传感器-高支模-沉降',
    usingStatus: 0,
    unit: 'mm',
    itemName: '激光传感器-高支模-沉降'
  },
  {
    id: 32,
    addTime: 1467516237364,
    deleteStatus: false,
    name: 'QX-InclinoMeter',
    displayName: '倾角传感器-高支模-倾斜',
    usingStatus: 0,
    unit: '°',
    itemName: '倾角传感器-高支模-倾斜'
  }
];

const monitorLines = [
  {
    id: 1,
    addTime: 1610945806644,
    deleteStatus: false,
    name: 'SW',
    aliveStatus: 1,
    hostName: 'localhost',
    port: 59999,
    alarmStatus: false,
    lastModifyTime: 1683873978389,
    sinkingthresholdl1: 6,
    sinkingthresholdl2: 8,
    sinkingthresholdl3: 10,
    basePointSensorId: -1,
    lastHeartBeatTime: 1679972206990,
    thresholdSetStatus: 2,
    sensorType: 'Gnss',
    sinkingthresholdl4: 0
  },
  {
    id: 53,
    addTime: 1610945806644,
    deleteStatus: false,
    name: 'FHSW',
    aliveStatus: 1,
    hostName: 'localhost',
    port: 59999,
    alarmStatus: false,
    lastModifyTime: 1683873978389,
    sinkingthresholdl1: 6,
    sinkingthresholdl2: 8,
    sinkingthresholdl3: 10,
    basePointSensorId: -1,
    lastHeartBeatTime: 1679972206990,
    thresholdSetStatus: 2,
    sensorType: 'WaterLevelGauge',
    sinkingthresholdl4: 0
  },
  {
    id: 177,
    addTime: 1618583288132,
    deleteStatus: false,
    name: 'HJCKCSW',
    aliveStatus: 1,
    hostName: 'localhost',
    port: 59999,
    alarmStatus: false,
    lastModifyTime: 1699241684776,
    sinkingthresholdl1: 6,
    sinkingthresholdl2: 8,
    sinkingthresholdl3: 10,
    basePointSensorId: -1,
    lastHeartBeatTime: 1699241684776,
    thresholdSetStatus: 0,
    sensorType: 'WaterLevelGauge',
    sinkingthresholdl4: 0
  },
  {
    id: 268,
    addTime: 1626529439571,
    deleteStatus: false,
    name: 'RYGYQMS',
    aliveStatus: 1,
    hostName: 'localhost',
    port: 59999,
    alarmStatus: false,
    lastModifyTime: 1665396446743,
    sinkingthresholdl1: 6,
    sinkingthresholdl2: 8,
    sinkingthresholdl3: 10,
    basePointSensorId: -1,
    lastHeartBeatTime: 1665396446743,
    thresholdSetStatus: 0,
    sensorType: 'AnchorDynamometer',
    sinkingthresholdl4: 0
  },
  {
    id: 281,
    addTime: 1632390626762,
    deleteStatus: false,
    name: 'HKZYNMS',
    aliveStatus: 1,
    hostName: 'localhost',
    port: 59999,
    alarmStatus: false,
    lastModifyTime: 1668898892838,
    sinkingthresholdl1: 6,
    sinkingthresholdl2: 8,
    sinkingthresholdl3: 10,
    basePointSensorId: -1,
    lastHeartBeatTime: 1668898892838,
    thresholdSetStatus: 0,
    sensorType: 'AnchorDynamometer',
    sinkingthresholdl4: 0
  },
  {
    id: 292,
    addTime: 1632999969779,
    deleteStatus: false,
    name: 'ZBSW',
    aliveStatus: 1,
    hostName: 'localhost',
    port: 59999,
    alarmStatus: false,
    lastModifyTime: 1661052784116,
    sinkingthresholdl1: 6,
    sinkingthresholdl2: 8,
    sinkingthresholdl3: 10,
    basePointSensorId: -1,
    lastHeartBeatTime: 1661052784116,
    thresholdSetStatus: 0,
    sensorType: 'WaterLevelGauge',
    sinkingthresholdl4: 0
  }
];

const sensors = [
  {
    id: 1,
    addTime: 1617958515744,
    deleteStatus: false,
    name: 'SW-01',
    monitorLineId: 1,
    alarmLevel: 3,
    lastModifyTime: 1695201117961,
    base: false,
    lastCollectingTime: 1679997600000,
    lastDeviceData: -22.1,
    lastSinkingData: -1.8,
    firstDeviceData: -5.7921,
    sensorType: 'Gnss',
    lastSinkingAccumulation: 5
  },
  {
    id: 2,
    addTime: 1687937283047,
    deleteStatus: false,
    name: 'TESTQJ1',
    monitorLineId: 53,
    alarmLevel: 0,
    lastModifyTime: 0,
    base: false,
    lastCollectingTime: 0,
    lastDeviceData: 0,
    lastSinkingData: 0,
    firstDeviceData: 0,
    sensorType: 'InclinoMeter',
    lastSinkingAccumulation: 0
  },
  {
    id: 721,
    addTime: 1617958515744,
    deleteStatus: false,
    name: 'FHSW-23',
    monitorLineId: 53,
    alarmLevel: 0,
    lastModifyTime: 1679972205083,
    base: false,
    lastCollectingTime: 1679972200000,
    lastDeviceData: -3.0719,
    lastSinkingData: 0,
    firstDeviceData: -5.7921,
    sensorType: 'WaterLevelGauge',
    lastSinkingAccumulation: 2.7195
  },
  {
    id: 1035,
    addTime: 1621336128904,
    deleteStatus: false,
    name: 'HJCKCSW-15',
    monitorLineId: 177,
    alarmLevel: 0,
    lastModifyTime: 1699241684348,
    base: false,
    lastCollectingTime: 1699241681000,
    lastDeviceData: 5.1857,
    lastSinkingData: 0,
    firstDeviceData: 9.052,
    sensorType: 'WaterLevelGauge',
    lastSinkingAccumulation: -3.8656
  },
  {
    id: 1487,
    addTime: 1636451020874,
    deleteStatus: false,
    name: 'SW-1',
    monitorLineId: 53,
    alarmLevel: 0,
    lastModifyTime: 1709795923393,
    base: false,
    lastCollectingTime: 1709795919000,
    lastDeviceData: 0,
    lastSinkingData: 0,
    firstDeviceData: 0,
    sensorType: 'WaterLevelGauge',
    lastSinkingAccumulation: 3.27
  },
  {
    id: 1488,
    addTime: 1636451020874,
    deleteStatus: false,
    name: 'ANCMTR-1',
    monitorLineId: 53,
    alarmLevel: 2,
    lastModifyTime: 1668898892838,
    base: true,
    lastCollectingTime: 1668898892000,
    lastDeviceData: 12.5,
    lastSinkingData: 0.2,
    firstDeviceData: 10,
    sensorType: 'AnchorDynamometer',
    lastSinkingAccumulation: 2.5
  },
  {
    id: 1489,
    addTime: 1636451020874,
    deleteStatus: false,
    name: 'ANCMTR-2',
    monitorLineId: 53,
    alarmLevel: 1,
    lastModifyTime: 1665396446743,
    base: false,
    lastCollectingTime: 1665396446000,
    lastDeviceData: 8.2,
    lastSinkingData: 0.1,
    firstDeviceData: 8,
    sensorType: 'AnchorDynamometer',
    lastSinkingAccumulation: 0.2
  },
  {
    id: 1490,
    addTime: 1636451020874,
    deleteStatus: false,
    name: 'SW-02',
    monitorLineId: 1,
    alarmLevel: 3,
    lastModifyTime: 1695201117961,
    base: false,
    lastCollectingTime: 1679997600000,
    lastDeviceData: -18.7,
    lastSinkingData: -1.2,
    firstDeviceData: -5.7921,
    sensorType: 'Gnss',
    lastSinkingAccumulation: 4.5
  },
  {
    id: 1491,
    addTime: 1636451020874,
    deleteStatus: false,
    name: 'WLVL-01',
    monitorLineId: 53,
    alarmLevel: 0,
    lastModifyTime: 1661052784116,
    base: false,
    lastCollectingTime: 1661052784000,
    lastDeviceData: 2.8,
    lastSinkingData: 0,
    firstDeviceData: 3,
    sensorType: 'WaterLevelGauge',
    lastSinkingAccumulation: -0.2
  },
  {
    id: 1492,
    addTime: 1636451020874,
    deleteStatus: false,
    name: 'WLVL-02',
    monitorLineId: 53,
    alarmLevel: 1,
    lastModifyTime: 1679972205083,
    base: false,
    lastCollectingTime: 1679972200000,
    lastDeviceData: -2.1,
    lastSinkingData: 0.2,
    firstDeviceData: -5.7921,
    sensorType: 'WaterLevelGauge',
    lastSinkingAccumulation: 3.5
  }
];

// 方法1: 导出monitorItems
export function getMonitorItems() {
  return monitorItems;
}

// 方法2: 导出sensorTypes
export function getSensorTypes() {
  return sensorTypes;
}

// 方法3: 导出sensors并关联其他数据源
export function getUiData() {
  const uiData = sensors.map(sensor => {
    // 根据monitorLineId找到对应的monitorLine
  const monitorLine = monitorLines.find(line => line.id === sensor.monitorLineId);

  // 根据monitorLine的sensorType找到对应的monitorItem
  const monitorItem = monitorItems.find(item => item.name === monitorLine.sensorType);

  // 格式化lastCollectingTime
  const lastCollectingTime = sensor.lastCollectingTime
    ? new Date(sensor.lastCollectingTime).toLocaleString()
    : '';

    return {
      monitorItemName: monitorItem ? monitorItem.name : '',
      monitorLineName: monitorLine ? monitorLine.name : '',
      sensorName: sensor.name,
      lastDeviceData: sensor.lastDeviceData,
      lastSinkingData: sensor.lastSinkingData,
      lastSinkingAccumulation: sensor.lastSinkingAccumulation,
      alarmLevel: sensor.alarmLevel,
      lastCollectingTime
    };
  });

  return uiData;
}

// 方法4: 根据条件过滤sensors并关联其他数据源
export function getFilteredUiData(
  monitorItemName = null,
  monitorLineName = null,
  sensorName = null,
  alarmLevel = null
) {
  const filteredSensors = sensors.filter(sensor => {
    const monitorLine = monitorLines.find(line => line.id === sensor.monitorLineId);
    const sensorType = sensorTypes.find(type => type.name === monitorLine.sensorType);
    const monitorItem = monitorItems.find(item => item.name === sensorType.itemName);

    const matchMonitorItem = monitorItemName ? monitorItem.name === monitorItemName : true;
    const matchMonitorLine = monitorLineName ? monitorLine.name === monitorLineName : true;
    const matchSensorName = sensorName ? sensor.name === sensorName : true;
    const matchAlarmLevel = alarmLevel !== null ? sensor.alarmLevel === alarmLevel : true;

    return matchMonitorItem && matchMonitorLine && matchSensorName && matchAlarmLevel;
  });

  const filteredUiData = filteredSensors.map(sensor => {
    const monitorLine = monitorLines.find(line => line.id === sensor.monitorLineId);
    const sensorType = sensorTypes.find(type => type.name === monitorLine.sensorType);
    const monitorItem = monitorItems.find(item => item.name === sensorType.itemName);
    const lastCollectingTime = sensor.lastCollectingTime
      ? new Date(sensor.lastCollectingTime).toLocaleString()
      : '';

    return {
      monitorItemName: monitorItem ? monitorItem.name : '',
      monitorLineName: monitorLine ? monitorLine.name : '',
      sensorName: sensor.name,
      lastCollectingTime,
      lastDeviceData: sensor.lastDeviceData,
      lastSinkingData: sensor.lastSinkingData,
      lastSinkingAccumulation: sensor.lastSinkingAccumulation,
      alarmLevel: sensor.alarmLevel
    };
  });

  return filteredUiData;
}

// 方法5: 根据monitorItem的id返回匹配的monitorLines
export function getMonitorLines(monitorItemId) {
  // 如果monitorItemId为null或未提供,直接返回所有monitorLines
  if (!monitorItemId) {
    return monitorLines;
  }

  // 查找与monitorItemId匹配的monitorItem
  const matchedItem = monitorItems.find(item => item.id === monitorItemId);

  // 如果找不到匹配的monitorItem,返回空数组
  if (!matchedItem) {
    return [];
  }

  // 根据monitorItem的类型过滤monitorLines
  const filteredLines = monitorLines.filter(line => line.sensorType === matchedItem.name);

  return filteredLines;
}

// 方法6: 根据monitorIine的id返回匹配的sensors
export function getSensors(monitorIineId) {
  // 如果monitorIineId为null或未提供,直接返回所有monitorLines
  if (!monitorIineId) {
    return sensors;
  }

  // 查找与monitorIineId匹配的monitorIine
  const matchedItem = monitorIines.find(item => item.id === monitorIineId);

  // 如果找不到匹配的monitorIine,返回空数组
  if (!matchedItem) {
    return [];
  }

  // 根据monitorIine的类型过滤sensors
  const filteredSensors = sensors.filter(sensor => sensor.monitorLineId === matchedItem.id);

  return filteredSensors;
}