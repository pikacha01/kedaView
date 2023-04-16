<script setup lang="ts">
import {onMounted} from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader';
import { shallowRef } from '@vue/reactivity'
import Header from '../views/header.vue';
import BodyContainer from '@/views/BodyContainer.vue';
import LeftChart from '@/views/leftChart.vue';
import {  } from 'ant-design-vue';
let map = shallowRef(null);

const lineData=[
        {
          path: [
            [118.715995, 32.0219131],
            [118.735995, 32.0219131],
          ],
          content: "第一个线路",
        },
        {
          path: [
            [118.745995, 32.1219131],
            [118.745995, 32.0219131],
          ],
          content: "第二个线路",
        },
]

const markerData = [
        {
          position: [118.715995, 32.0319131],
          content: "站点名称",
        },
        {
          position: [118.715995, 32.0329200],
          content: "站点名称",
        },
      ]

const initMap = async () => {
  const AMap =await AMapLoader.load({
      key:"21197c9fef143c98f6d08bf2ebab8488",             // 申请好的Web端开发者Key，首次调用 load 时必填
      version:"2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins:[''],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
    map = new AMap.Map("mapContainer",{  //设置地图容器id
        viewMode:"2D",    //是否为3D地图模式
        zoom:25,           //初始化地图级别
        center:[118.715995, 32.0319131], //初始化地图中心点位置
        mapStyle: 'amap://styles/grey'
    });
  // lineData.forEach(item => {
  //       let path = item.path;
  //       // 创建折线实例
  //       var polyline = new AMap.Polyline({
  //         path: path,
  //         borderWeight: 10, // 线条宽度，默认为 1
  //         strokeColor: "red", // 线条颜色
  //         lineJoin: "round", // 折线拐点连接处样式
  //       });
  //       // 将折线添加至地图实例
  //       polyline.setMap(map);
  // })
  markerData.forEach(item => {
    let markerContent = '<div style="background: url(\'src/assets/img/电站名称2.png\') no-repeat center center;height: 120px; background-size: 100% 100%; min-width: 0"> <div style="height: 120px;padding-left: 40px;padding-right: 40px;text-align: center;line-height: 148px; min-width: 292px; font-size: 45px; color: #fced00;display: inline-block;line-height: 120px" >' + item.content + "</div></div><div style='text-align: center'><img src='\/src/assets/img/定位点1.png\'></div>";
    var marker = new AMap.Marker({
          icon: '/src/assets/img/定位点1.png', // 添加 Icon 图标 URL
          position: item.position, // 基点位置
          content:markerContent
          // offset: new AMap.Pixel(-10, -32), // 相对于基点的偏移位置
    });
    marker.setMap(map);
    //点击地图点标记的方法
    // marker.on("click", function (e) {
    //       console.log(item.content + "点击成功！");
    //       console.log(e);
    //       let infoWindow = new AMap.InfoWindow({
    //         content: markerContent,
    //         offset: new AMap.Pixel(0, -30),
    //       });
    //       infoWindow.open(map, e.target.getPosition());
    //     });
  })
    
}


onMounted(() => {
  initMap()
})
</script>

<template>
<div id="mapContainer" class="mapContainer">
  <Header></Header>
  <BodyContainer></BodyContainer>
  <LeftChart />
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
#mapContainer .mapContainer__stationInfo {
 
  .text {
    
  }
}
</style>
