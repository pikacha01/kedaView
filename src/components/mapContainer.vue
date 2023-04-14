<script setup lang="ts">
import {onMounted} from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader';
import { shallowRef } from '@vue/reactivity'
import Header from '../views/header.vue';
let map = shallowRef(null);
const initMap = ()=>{
    AMapLoader.load({
      key:"21197c9fef143c98f6d08bf2ebab8488",             // 申请好的Web端开发者Key，首次调用 load 时必填
      version:"2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins:[''],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    }).then((AMap)=>{
      map = new AMap.Map("mapContainer",{  //设置地图容器id
        viewMode:"3D",    //是否为3D地图模式
        zoom:25,           //初始化地图级别
        center:[121.498586, 31.239637], //初始化地图中心点位置
        mapStyle: 'amap://styles/grey'
      });
    })
}

onMounted(() => {
  initMap()
})
</script>

<template>
<div id="mapContainer" class="mapContainer">
  <Header></Header>
</div>
</template>

<style scoped lang="less">
#mapContainer{
  padding:0px;
  margin: 0px;
  width: 7680px;
  height: 3240px;
  position: relative;
}
</style>
