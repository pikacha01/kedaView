<script setup lang="ts">
import {onMounted , watch} from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader';
import Header from '../views/header.vue';
import BodyContainer from '@/views/BodyContainer.vue';
import LeftChart from '@/views/leftChart.vue';
import BottomChart from '@/views/bottomChart.vue';
import { mapDataStore } from '@/store'
import RightChart from '@/views/rightChart.vue';


const mapStore = mapDataStore()

watch(() => {
  return mapStore.stationList
}, () => {
  dotting()
})

let map :any = null;

// 地图画点和弹出框
const dotting = () => {
  if (!map) {
   return 
  }
  // 清除之前的标记
  map.clearMap()
  //将地图中心点设置为新标记的位置
  // map.setCenter(mapStore.stationList[0].position)
  mapStore.stationList.forEach(item => {
    // let markerContent = "<div style='display:flex;align-items: center;'><div style='text-align: center'><img src='\/src/assets/img/定位点1.png\'></div>"+'<div style="background: url(\'src/assets/img/电站名称2.png\') no-repeat center center;height: 120px; background-size: 100% 100%; min-width: 300px" display: inline-block;> <div style="height: 120px;padding-left: 40px;padding-right: 40px;text-align: center;line-height: 148px; min-width: 292px; font-size: 45px; color: #fced00;display: inline-block;line-height: 120px" ><span>' + item.content + "</span></div></div></div>";
    let extDataContent = `
    <div class="scale">
      <div class="pop">
        <div class="titlePop">
          ${item.name}
        </div>
        <div class="addressPop">
          <img src="/view/img/weizhi.png">
          <span>${item.address}</span>
        </div>
        <div class="contentPop">
          <div class="leftPop">
            <img src="/view/img/guangfupng.png" alt="">
          </div>
          <div class="rightPop">
            <div class="InfoLeft columnSpaceBetween">
                <div class="grid">
                  <div class="caption">
                    设备厂商
                  </div>
                  <div class="textPop">
                    ${item.factory}
                  </div>
                </div>
                <div class="grid">
                  <div class="caption">
                    经纬度
                  </div>
                  <div class="textPop">
                    ${Number(item.position[0]).toFixed(2)}E  ${Number(item.position[1]).toFixed(2)}N
                  </div>
                </div>
                <div class="grid">
                  <div class="caption">
                    今日发电量
                  </div>
                  <div class="textPop">
                    ${item.todayPower}kWp
                  </div>
                </div>
            </div>
            <div class="InfoCenter columnSpaceBetween">
              <div class="grid">
                  <div class="caption">
                    状态
                  </div>
                  <div class="textPop">
                    ${item.status}
                  </div>
                </div>
                <div class="grid">
                  <div class="caption">
                    电站编号
                  </div>
                  <div class="textPop">
                    ${item.sn}  
                  </div>
                </div>
                <div class="grid">
                  <div class="caption">
                    总发电量
                  </div>
                  <div class="textPop">
                    ${item.totalPower}kWp
                  </div>
                </div>
            </div>
            <div class="InfoRight columnSpaceBetween">
              <div class="grid">
                  <div class="caption">
                    健康度
                  </div>
                  <div class="textPop">
                    ${item.health}
                  </div>
                </div>
                <div class="grid">
                </div>
                <div class="grid">
                  <div class="caption">
                    电站容量
                  </div>
                  <div class="textPop">
                    ${item.volume}kWp
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      </div>`
    var marker = new AMap.Marker({
        icon: '/view/img/icon1.png', // 添加 Icon 图标 URL
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
    marker.on("mouseover", function (e : any) {
      let infoWindow = new AMap.InfoWindow({
          content: e.target.getExtData().content,
          offset: new AMap.Pixel(0, -30)
      });
      infoWindow.open(map, e.target.getPosition());
      //   const box = document.querySelector('.amap-info') as HTMLDivElement;
      //   const transFormStr = changeScale(box.style.cssText, 0.3)
      //   box.style.transform = transFormStr as string;
    });
    marker.on('mouseout', function (e: any) {
      map.clearInfoWindow();
    });
  })
}

// 改变高德地图中的scale方法
// const changeScale = (changeStr: string,scale: number) => {
//   // 正则规则
//   const transformRegex = /transform:\s*(.*?);/;
//   const transformMatch = changeStr.match(transformRegex);
//   if (transformMatch) {
//     const transformValue = transformMatch[1];
//     // 改变scale
//     const newTransformValue = transformValue.replace(/scale\([^)]*\)/, `scale(${scale})`);
//     return newTransformValue;
//   }
// }

let AMap :any  = null

const initMap = async () => {
  AMap = await AMapLoader.load({
      key:"21197c9fef143c98f6d08bf2ebab8488",             // 申请好的Web端开发者Key，首次调用 load 时必填
      version:"2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins:[''],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
  let centerPlot:any = null
  mapStore.stationList.forEach(item => {
    if (item.address === "安徽省马鞍山市雨山区银塘镇湖西南路82号信成大厦") {
      centerPlot = item
    }
  })
  map = new AMap.Map("mapContainer",{  //设置地图容器id
      viewMode:"2D",    //是否为3D地图模式
      zoom:9,           //初始化地图级别
      center:centerPlot.position, //初始化地图中心点位置
      mapStyle: 'amap://styles/grey',
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
  dotting()
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
  <div class="leftCover"></div>
  <div class="rightCover"></div>
  <div class="bottomCover"></div>
</div>
</template>

<style lang="less">
#mapContainer{
  padding:0px;
  margin: 0px;
  width: 1920px;
  height: 1080px;
  position: relative;
}
.amap-info-content{
  background-color: #1a232c !important;
  width: 650px !important;
  height: 250px !important;
}
.scale {
  width: 650px;
  height: 250px;
}
.pop{
  transform: scale(0.3);
  transform-origin: 0 0;
  width: 1950px;
  height: 700px;
  background: url("@/assets/img/弹窗边角.png") no-repeat,
              url("/view/img/弹窗背景.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  padding: 50px;
  box-sizing: border-box;
  .titlePop {
    font-size: 45px;
    width: 100%;
    color: #fff;
    font-family: Medium;
    font-weight: bold;
    height: 55px;
  }
  .addressPop {
    width: 100%;
    height: 45px;
    margin-top: 35px;
    line-height: 45px;
    color:#23F7EE;
    display: flex;
    align-items: center;
    font-size: 40px;
    span{
      margin-left: 25px;
    }
  }
  .contentPop {
    width: 100%;
    height: 100%;
    margin-top: 45px;
    display: flex;
    .leftPop{
      width: 587px;
      height: 407px;
      background: url("/view/img/883.png") no-repeat;
      background-size: 100% 100%;
      padding: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .rightPop {
      margin-left: 65px;
      height: 417px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex:1;
      // 垂直等分
      .columnSpaceBetween {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
      }
      .caption {
        color: #96D6E8;
        font-size: 38px;
        font-family: Light;
      }
      .textPop {
        font-family: HRegular;
        font-size: 45px;
        color: #23F7EE
      }
      .InfoCenter {
        margin-left: -50px;
      }
      .InfoRight {
        margin-left: -25px;
      }
    }
  }
}
.leftCover {
  width: 25%;
  height: 100%;
  z-index: 200;
  position: absolute;
  left: 0%;
  background: linear-gradient(to right, rgba(7, 24, 31, 1), rgba(7, 24, 31, 0.1));
}
.rightCover {
  width: 25%;
  height: 100%;
  z-index: 200;
  position: absolute;
  right: 0%;
  background: linear-gradient(to left, rgba(7, 24, 31, 1), rgba(7, 24, 31, 0.1));
}
.bottomCover {
  width: 100%;
  height: 35%;
  z-index: 200;
  position: absolute;
  bottom: 0%;
  background: linear-gradient(to top, rgba(7, 24, 31, 1), rgba(7, 24, 31, 0.1));
}
.amap-info-close{
  display: none;
}
.amap-info-sharp {
  display: none;
}
.amap-icon img {
  width: 40px;
  height: 40px;
}
</style>
