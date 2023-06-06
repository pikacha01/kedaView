<script setup lang="ts">
import {onMounted , watch,ref} from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader';
import Header from '../views/header.vue';
import BodyContainer from '@/views/BodyContainer.vue';
import LeftChart from '@/views/leftChart.vue';
import BottomChart from '@/views/bottomChart.vue';
import { mapDataStore } from '@/store'
import RightChart from '@/views/rightChart.vue';
import {stationListDetail} from '@/api/data'



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
            <img src=${item.pic === null ? "/view/img/guangfupng.png" : item.pic} alt="">
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
                    ${(String(item.sn)).length > 15? (String(item.sn)).substr(0, 15) + '...' : item.sn}  
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

// 获取城市定位
// const getLocation = () => {
//   AMap.plugin('AMap.Geolocation', function() {
//     var geolocation = new AMap.Geolocation({
//       enableHighAccuracy: true, // 是否使用高精度定位，默认：true
//       timeout: 10000, // 设置定位超时时间，默认：无穷大
//       offset: [10, 20],  // 定位按钮的停靠位置的偏移量
//       zoomToAccuracy: true,  //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
//     })

//     geolocation.getCurrentPosition(function(status:any,result:any){
//       if(status=='complete'){
//           console.log(result)
//       }
//       console.log(status)
//       console.log(result)
//     });
//   })
// }

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
      key:"9c9c088be8dd903f5de200cf76d3153d",             // 申请好的Web端开发者Key，首次调用 load 时必填
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

const selectStation = ref<string>("全部")

// 改变电站列表
const isOptionList = ref<boolean>(false)
// 选项改变
const changeSelect = (id: number, item?: stationListDetail) => {
  if (item) {
    mapStore.selectStation = item.id
    mapStore.showWeather!.info = item.weatherStatus
    mapStore.showWeather!.weather = item.weather
  } else {
    mapStore.selectStation = id
  }
  if (id === 0) {
    mapStore.showWeather = mapStore.currentWeather
    selectStation.value = "全部"
    dotting()
  } else {
    selectStation.value = item!.name
    map.clearMap()
    map.setCenter(item?.position)
    let extDataContent = `
    <div class="scale">
      <div class="pop">
        <div class="titlePop">
          ${item?.name}
        </div>
        <div class="addressPop">
          <img src="/view/img/weizhi.png">
          <span>${item?.address}</span>
        </div>
        <div class="contentPop">
          <div class="leftPop">
            <img src=${item?.pic === null ? "/view/img/guangfupng.png" : item?.pic } alt="">
          </div>
          <div class="rightPop">
            <div class="InfoLeft columnSpaceBetween">
                <div class="grid">
                  <div class="caption">
                    设备厂商
                  </div>
                  <div class="textPop">
                    ${item?.factory}
                  </div>
                </div>
                <div class="grid">
                  <div class="caption">
                    经纬度
                  </div>
                  <div class="textPop">
                    ${Number(item?.position[0]).toFixed(2)}E  ${Number(item?.position[1]).toFixed(2)}N
                  </div>
                </div>
                <div class="grid">
                  <div class="caption">
                    今日发电量
                  </div>
                  <div class="textPop">
                    ${item?.todayPower}kWp
                  </div>
                </div>
            </div>
            <div class="InfoCenter columnSpaceBetween">
              <div class="grid">
                  <div class="caption">
                    状态
                  </div>
                  <div class="textPop">
                    ${item?.status}
                  </div>
                </div>
                <div class="grid">
                  <div class="caption">
                    电站编号
                  </div>
                  <div class="textPop">
                    ${(String(item?.sn)).length > 15? (String(item?.sn)).substr(0, 15) + '...' : item?.sn}  
                  </div>
                </div>
                <div class="grid">
                  <div class="caption">
                    总发电量
                  </div>
                  <div class="textPop">
                    ${item?.totalPower}kWp
                  </div>
                </div>
            </div>
            <div class="InfoRight columnSpaceBetween">
              <div class="grid">
                  <div class="caption">
                    健康度
                  </div>
                  <div class="textPop">
                    ${item?.health}
                  </div>
                </div>
                <div class="grid">
                </div>
                <div class="grid">
                  <div class="caption">
                    电站容量
                  </div>
                  <div class="textPop">
                    ${item?.volume}kWp
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      </div>`
    var marker = new AMap.Marker({
        icon: '/view/img/icon1.png', // 添加 Icon 图标 URL
        position: item?.position, // 基点位置
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
      }
      isOptionList.value = false
}
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
  <div class="selectionList" @click="isOptionList = true">
      <img class="image" src="@/assets/images/电站列表.png">
      <span class="list">{{ selectStation.length > 4? selectStation.substr(0, 4) + '...' : selectStation }}</span>
  </div>
  <div class="allScreen"  v-show="isOptionList" @click="isOptionList = false">
    <div class="OptionList" @click.stop="">
      <div class="powerStation">
        <div class="option"  @click="changeSelect(0)">
            全部
        </div>
        <div class="option" @click="changeSelect(item.id,item)" v-for="item in mapStore.stationList" :key="item.id">
            {{ item.name }}
        </div>
      </div>
    </div>
  </div>
  
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
  width: 585px !important;
  padding: 0;
  height: 210px !important;
}
.scale {
  width: 585px;
  height: 210px;
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
      img {
        width: 567px;
        height: 385px;
      }
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
        color: #23F7EE;
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
.selectionList {
  position: absolute;
  top: 12%;
  right: 1%;
  padding-right: 18px;
  height: 24px;
  display: flex;
  z-index: 1000;
  background: rgba(3,64,75,0.8);
  align-items: center;
  border-radius: 6px;
  cursor: pointer;
  .image {
    width: 18px;
    height: 18px;
    margin-left: 18px;
  }
  .list {
    color: #00FFF4;
    font-size: 18px;
    margin-left: 8px;
  }
}
.allScreen {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 9999;
}
.OptionList {
  position: absolute;
  top: 10%;
  right: 12%;
  width: 301px;
  height: 435px;
  background: #043540;
  box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.15);
  opacity: 0.95;
  border-radius: 6px;
  .powerStation {
    margin: 23px 19px;
    width: 270px;
    height: 389px;
    overflow-y: scroll;
    .option{
      font-family: Light;
      text-align: center;
      padding: 0 10px;
      line-height: 37px;
      width: 233px;
      height: 37px;
      background: #002C36;
      border-radius: 6px;
      font-size: 16px;
      color: #00FFF4;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      cursor: pointer;
    }
    .option:not(:first-child){
      margin-top: 15px;
    }
  }
}
/* 隐藏滚动条上下箭头 */
::-webkit-scrollbar-button {
  display: none;
}

/* 定义滚动条的样式 */
::-webkit-scrollbar {
  width: 7px; /* 滚动条宽度 */
  height: 391px; /* 滚动条高度 */
  background-color: #032830; /* 滚动条背景色 */
}

/* 定义滚动条滑块的样式 */
::-webkit-scrollbar-thumb {
  border-radius: 4px; /* 滑块圆角 */
  background-color: #096074; /* 滑块颜色 */
}
</style>
