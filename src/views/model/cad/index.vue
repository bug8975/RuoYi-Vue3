<script setup lang="ts">
import {
  AxisGizmoPlugin,
  DxfViewer,
  MarkupType,
  ViewerEvent,
  type DxfViewerConfig,
  type ModelConfig
} from '@pattern-x/gemini-viewer-threejs';
import { onMounted, ref } from 'vue';

const filename = 'Drawing1'
const modelCfg: ModelConfig = {
  modelId: filename,
  name: filename,
  src: `../../../../public/${filename}.dxf`,
  merge: true
}
const viewerCfg: DxfViewerConfig = {
  containerId: 'myCanvas',
  enableSpinner: true,
  enableProgressBar: true,
  enableLayoutBar: true
}

onMounted(async () => {
  try {
    viewer = new DxfViewer(viewerCfg)
    let fontFiles = []
    if (import.meta.env.VITE_APP_ENV === 'development') {
      fontFiles = ['../../../../public/hztxt.shx', '../../../../public/simplex.shx'];
    } else if (import.meta.env.VITE_APP_ENV === 'production') {
      fontFiles = ['./hztxt.shx', './simplex.shx'];
    }
    fontFiles.forEach((font) => console.log(`[Demo] Loading font ${font}\n`))
    await viewer.setFont(fontFiles)
    window.viewer = viewer

    new AxisGizmoPlugin(viewer, { ignoreZAxis: true })

    const onProgress = (event: any) => {
      const progress = ((event.loaded * 100) / event.total).toFixed(1)
      console.log(`[Demo] Loading progress: ${progress}%`)
    }

    await viewer.loadModelAsync(modelCfg, onProgress)

    console.log(`[Demo] Loaded model ${modelCfg.src}`)

    viewer.addEventListener(ViewerEvent.MarkupClicked, (data) => {
      if (data.markup) {
        console.log('[Demo] Clicked on markup:', data)
      }
    })
  } catch (error) {
    console.log(error)
  }
})
const markupDataTxt = ref('');
let markups = [];
let viewer: DxfViewer;
const MultipleState = ref('连续添加');
const buttonState = ref('primary');

function SingleAdd() {
  viewer.activateMarkup(MarkupType.Dot);
}
function MultipleAdd() {
  if (MultipleState.value === '连续添加') {
    viewer.activateMarkup(MarkupType.Dot);
    MultipleState.value = '结束添加';
    buttonState.value = 'danger';
  } else if (MultipleState.value === '结束添加') {
    viewer.deactivateMarkup();
    MultipleState.value = '连续添加';
    buttonState.value = 'primary';
  }
}
function disableMarkup() {
  viewer.deactivateMarkup();
}
function RemoveMarkup() {
  viewer.clearSelection();
}
function ClearMarkup() {
  viewer.clearMarkups();
}
function ManageMarkup() {
  showManagerPanel.value = !showManagerPanel.value
}
function getMarkupData() {
  try {
    markups = viewer.getMarkups()
    // format the data a bit, so it looks better
    let val = '['
    for (let i = 0; i < markups.length; ++i) {
      val += i > 0 ? ',\n' : '\n'
      val += JSON.stringify(markups[i])
    }
    val += '\n]'
    markupDataTxt.value = val
    console.log(val)
  } catch (ex) {
    console.warn(ex)
  }
}
function setMarkupData() {
  try {
    const markups = JSON.parse(markupDataTxt.value)
    console.log(markups)
    viewer.setMarkups(markups)
  } catch (ex) {
    console.warn(ex)
  }
}
function updateMarkupData() {
  try {
    const markups = JSON.parse(markupDataTxt.value)
    console.log(markups)
    // update markups one by one
    for (let i = 0; i < markups.length; ++i) {
      const ret = viewer.updateMarkup(markups[i])
      const str = `[Demo] ${ret ? 'Updated' : 'Failed to update'} markup with id: ${markups[i].id}`
      console.log(str)
    }
  } catch (ex) {
    console.warn(ex)
  }
}
function removeMarkupData() {
  try {
    const markups = JSON.parse(markupDataTxt.value)
    console.log(markups)
    // remove markups one by one
    for (let i = 0; i < markups.length; ++i) {
      const ret = viewer.removeMarkup(markups[i].id)
      const str = `[Demo] ${ret ? 'Removed' : 'Failed to remove'} markup with id: ${markups[i].id}`
      console.log(str)
    }
  } catch (ex) {
    console.warn(ex)
  }
}
const showManagerPanel = ref(false)
</script>
<template>
  <el-container>

    <el-main>
      <el-row>
        <el-col class="card">
          <el-card>
            <el-form :inline="true">
              <el-form-item>
                <el-button type="primary" @click="SingleAdd()">单个添加</el-button>
              </el-form-item>
              <el-form-item>
                <el-button :type="buttonState" @click="MultipleAdd()">{{ MultipleState }}</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="RemoveMarkup()">删除</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="ClearMarkup()">清空</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
      <div id="myCanvas" style="width: 100%; height: 700px"></div>
      <el-drawer v-model="showManagerPanel" title="Markup Manager" :withHeader="false">
        <el-input v-model="markupDataTxt" type="textarea" :autosize="{ minRows: 10, maxRows: 20 }"></el-input>
        <div class="markup-manager-bottom">
          <el-button type="primary" @click="getMarkupData">Get</el-button>
          <el-button type="primary" @click="setMarkupData">Set</el-button>
          <el-button type="primary" @click="updateMarkupData">Update</el-button>
          <el-button type="danger" @click="removeMarkupData">Remove</el-button>
        </div>
      </el-drawer>
    </el-main>
  </el-container>
</template>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.el-card {
  margin-bottom: 10px;
}

.is-active {
  background-color: #409eff;
  color: #fff;
}

.markup-manager-bottom {
  margin-top: 10px;
}
</style>