/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'nprogress';
declare module 'crypto-js';

// 地图变量加入TS定义
declare interface Window {
  BMapGL: any,
}
