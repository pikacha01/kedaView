/// <reference types="vite/client" />
// declare module '@jiaminghi/data-view'
declare global{
  // 为window添加新方法
  interface Window{
    AMap: any;
  }
}