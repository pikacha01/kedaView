<script setup lang="ts">
import {onMounted} from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader';
import { shallowRef } from '@vue/reactivity'
import Header from '../views/header.vue';
import BodyContainer from '@/views/BodyContainer.vue';
import LeftChart from '@/views/leftChart.vue';
import BottomChart from '@/views/bottomChart.vue';
import { mapDataStore } from '@/store'
import RightChart from '@/views/rightChart.vue';


const mapStore = mapDataStore()


let map = shallowRef(null);

// const lineData=[
//         {
//           path: [
//             [118.715995, 32.0219131],
//             [118.735995, 32.0219131],
//           ],
//           content: "第一个线路",
//         },
//         {
//           path: [
//             [118.745995, 32.1219131],
//             [118.745995, 32.0219131],
//           ],
//           content: "第二个线路",
//         },
// ]



const initMap = async () => {
  const AMap =await AMapLoader.load({
      key:"21197c9fef143c98f6d08bf2ebab8488",             // 申请好的Web端开发者Key，首次调用 load 时必填
      version:"2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins:[''],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
    map = new AMap.Map("mapContainer",{  //设置地图容器id
        viewMode:"2D",    //是否为3D地图模式
        zoom:12,           //初始化地图级别
        center:mapStore.stationList[0].position, //初始化地图中心点位置
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
  mapStore.stationList.forEach(item => {
    // let markerContent = "<div style='display:flex;align-items: center;'><div style='text-align: center'><img src='\/src/assets/img/定位点1.png\'></div>"+'<div style="background: url(\'src/assets/img/电站名称2.png\') no-repeat center center;height: 120px; background-size: 100% 100%; min-width: 300px" display: inline-block;> <div style="height: 120px;padding-left: 40px;padding-right: 40px;text-align: center;line-height: 148px; min-width: 292px; font-size: 45px; color: #fced00;display: inline-block;line-height: 120px" ><span>' + item.content + "</span></div></div></div>";
    let extDataContent = `
    <div style=" width: 1900px; height: 800px; display: flex;flex-direction: column; background-color: #1a232c;z-index: 9999;">
      <div style="width: 100%; height: 100px; line-height: 100px; font-size: 56px;font-weight: bold;padding-left: 50px; color: #fff;">电站简介</div>
      <div style="margin-top: 50px; display: flex;justify-content: center; align-items: center;height: 650px;">
        <div style="width: 40%; height: 100%; background-color: #fff;"></div>
        <div style="width: 60%; height: 100%;padding-left: 50px;">
          <div style="margin-top: 20px;display: flex;"><div style="color: #1a232c;font-weight: bold; font-size: 45px; color: #C4EBF6 ; width: 200px;">名称</div><div style="font-size: 40px; color: #94BBD1;overflow: hidden;text-overflow: ellipsis;white-space:nowrap;">${item.name}</div></div>
          <div style="width: 100%;display: flex;">
            <div style="width: 50%;">
              <div style="margin-top: 40px;display: flex;"><div style="color: #1a232c;font-weight: bold; font-size: 45px; color: #C4EBF6 ; width: 200px;">工厂</div><div style="font-size: 40px; color: #94BBD1;overflow: hidden;text-overflow: ellipsis;white-space:nowrap;">${item.factory}</div></div>
              <div style="margin-top: 40px;display: flex;"><div style="color: #1a232c;font-weight: bold; font-size: 45px; color: #C4EBF6 ; width: 200px;">健康</div><div style="font-size: 40px; color: #94BBD1;overflow: hidden;text-overflow: ellipsis;white-space:nowrap;">${item.health}</div></div>
              <div style="margin-top: 40px;display: flex;"><div style="color: #1a232c;font-weight: bold; font-size: 45px; color: #C4EBF6 ; width: 200px;">经纬度</div><div style="font-size: 40px; color: #94BBD1;overflow: hidden;text-overflow: ellipsis;white-space:nowrap;">${Number(item.position[0]).toFixed(2)}N  ${Number(item.position[1]).toFixed(2)}E</div></div>
              <div style="margin-top: 40px;display: flex;"><div style="color: #1a232c;font-weight: bold; font-size: 45px; color: #C4EBF6 ; width: 200px;">编号</div><div style="font-size: 40px; color: #94BBD1;overflow: hidden;text-overflow: ellipsis;white-space:nowrap;">${item.sn}</div></div>
            </div>
            <div style="width: 50%;">
              <div style="margin-top: 20px;display: flex;"><div style="color: #1a232c;font-weight: bold; font-size: 45px; color: #C4EBF6 ; width: 270px;">状态</div><div style="font-size: 40px; color: #94BBD1;overflow: hidden;text-overflow: ellipsis;white-space:nowrap;">${item.status}</div></div>
              <div style="margin-top: 20px;display: flex;"><div style="color: #1a232c;font-weight: bold; font-size: 45px; color: #C4EBF6 ; width: 270px;">今日发电量</div><div style="font-size: 40px; color: #94BBD1;overflow: hidden;text-overflow: ellipsis;white-space:nowrap;">${item.todayPower} kWp</div></div>
              <div style="margin-top: 20px;display: flex;"><div style="color: #1a232c;font-weight: bold; font-size: 45px; color: #C4EBF6 ; width: 270px;">总发电量</div><div style="font-size: 40px; color: #94BBD1;overflow: hidden;text-overflow: ellipsis;white-space:nowrap;">${item.totalPower} kWp</div></div>
              <div style="margin-top: 20px;display: flex;"><div style="color: #1a232c;font-weight: bold; font-size: 45px; color: #C4EBF6 ; width: 270px;">电站容量</div><div style="font-size: 40px; color: #94BBD1;overflow: hidden;text-overflow: ellipsis;white-space:nowrap;">${item.volume} kWp</div></div>
            </div>
          </div>
          <div style="margin-top: 20px;display: flex;"><div style="color: #1a232c;font-weight: bold; font-size: 45px; color: #C4EBF6 ; width: 200px;">地址</div><div style="font-size: 40px; color: #94BBD1;width:900px;">${item.address}</div></div>
        </div>
      </div>
    </div>`
    var marker = new AMap.Marker({
        icon: '/src/assets/img/定位点1.png', // 添加 Icon 图标 URL
        position: item.position, // 基点位置
        extData: {
            content: extDataContent
        }
          // content:markerContent
          // offset: new AMap.Pixel(-10, -32), // 相对于基点的偏移位置
    });
    marker.setMap(map);
    //点击地图点标记的方法
    //鼠标悬停地图点标记
    marker.on("mouseover", function (e) {
      let infoWindow = new AMap.InfoWindow({
          content: e.target.getExtData().content,
          offset: new AMap.Pixel(0, -30)
      });
      infoWindow.open(map, e.target.getPosition());
    });
    marker.on('mouseout', function (e) {
      map.clearInfoWindow();
    });
  })
    
}


onMounted(async () => {
  await mapStore.getStationList()
  initMap()
})
</script>

<template>
<div id="mapContainer" class="mapContainer">
  <Header></Header>
  <BodyContainer></BodyContainer>
  <LeftChart />
  <BottomChart />
  <RightChart />
</div>
</template>

<style lang="less">
#mapContainer{
  padding:0px;
  margin: 0px;
  width: 7680px;
  height: 3240px;
  position: relative;
}
.amap-info-content{
  background-color: #1a232c !important;
}
</style>
