<template>
  <div class="canvasContainer" ref="canvasContainer"></div>
</template>

<script setup>
import { DxfViewer } from "dxf-viewer";
import * as three from "three";
import { onBeforeUnmount, onMounted, ref } from 'vue';

const canvasContainer = ref(null);
const dxfPath = '../../public/Drawing1.dxf';
let dxfViewer = ref(null);
const options = {
  clearColor: new three.Color("#fff"),
  autoResize: true,
  colorCorrection: true,
  sceneOptions: {
    wireframeMesh: true
  }
};
onMounted(() => {
  dxfViewer = new DxfViewer(canvasContainer.value, options);
  Load(dxfPath)
});
async function Load(path) {
  try {
    await dxfViewer.Load({ url: path });
  } catch (error) {
    console.warn(error);
    // Handle error
  }
};

onBeforeUnmount(() => {
  dxfViewer.Destroy();
  dxfViewer = null;
});


</script>

<style scoped>
.canvasContainer {
  width: 100%;
  height: 100%;
  min-width: 1000px;
  min-height: 1000px;
}
</style>
