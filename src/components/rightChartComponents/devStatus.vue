<script setup lang="ts">
import { onMounted, onUnmounted,watch,ref } from 'vue'
import ChartTitle from '../chartTitle.vue';
import { pieData } from '@/api/data'
import * as echarts from "echarts";
import { rightDataStore, mapDataStore } from '@/store'

const store = rightDataStore()

let chart : any = null

let timer: any = null

const mapStore = mapDataStore()

onMounted(async () => {
  await store.getDevStatus(mapStore.selectStation)
  store.devStatusData.forEach(item => {
    initBarChart(item)
  })
  watch(() => {
    return store.devStatusData[0][0]
  }, () => {
    const option:any = chart.getOption()// 获取当前配置项
    if (!option) {
        return 
    }
    store.devStatusData.forEach(item => {
      chart = echart.init(document.getElementById(`proChart${item[0].name}`) as HTMLElement);
      const option:any = chart.getOption()// 获取当前配置项
      if (!option) {
        return 
      }
      option.series[0].data = item
      chart.setOption(option)
    })
  })

  // 动态效果实现

  // 当前下标
  let i = 0 
  timer = setInterval(() => {
    // 上一个下标
    const lastIndex = i === 0 ? 2 : i - 1
    chart  = echart.init(document.getElementById(`proChart${store.devStatusData[lastIndex][0].name}`) as HTMLElement);
    chart.dispatchAction({
      type: 'downplay',
      seriesIndex: 0,
      dataIndex: 0
    });
    let option: any = chart.getOption()
    option.title[0].text = (store.devStatusData[lastIndex][0].value / store.devStatusTotal * 100).toFixed(2) + "%"
    chart.setOption(option)
    chart  = echart.init(document.getElementById(`proChart${store.devStatusData[i][0].name}`) as HTMLElement);
    option = chart.getOption()
    option.title[0].text = ''
    chart.dispatchAction({
      type: "highlight",
      seriesIndex: 0,
      dataIndex: 0,
    });
    i = i === 2 ? 0 : i + 1
    chart.setOption(option)
  },3000)
})


onUnmounted(() => {
  store.devStatusData.forEach(item => {
    echart.dispose(chart);
  })
  clearInterval(timer)
  timer  = null
});

let echart = echarts



function initBarChart(data: pieData[]) {
  chart = echart.init(document.getElementById(`proChart${data[0].name}`) as HTMLElement);
  chart.setOption({
    title: {
      text: (data[0].value / store.devStatusTotal * 100).toFixed(2) + "%",
      top: "center",
      left: "center",
      textStyle: {
        fontSize: 15,
        fontWeight: 'bold',
        color:"#23f8ef"
      }
    },
    series: [{
      name: 'Access From',
      type: 'pie',
      avoidLabelOverlap: false,
      hoverAnimation: true,
      label: {
        show: false,
        position: 'center'
      },
      radius: ['73%', '88%'],
      emphasis: {
        label: {
          show: true,
          formatter: "{d}%",
          fontSize: 23,
          fontWeight: 'bold',
          color:"#23f8ef"
        },
        sclae: true,
        scaleSize: 5,
      },
      labelLine: {
        show: false
      },
      color: ["#09b8ae","#0a3142"],
      data: data
    }]
  })
  window.onresize = function() {
    //自适应大小
    chart.resize()
  };
}


</script>

<template>
  <div class="devStatus">
    <ChartTitle title="设备工况统计" />
    <div class="content">
      <div class="box" v-for="(item) in store.devStatusData" :key="item[0].name">
        <div class="chart"  :id="`proChart${item[0].name}`">
        </div>
        <div class="text">{{ item[0].value }} <span> / {{ store.devStatusTotal }}</span></div>
        <div class="title">
          {{ item[0].name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.devStatus {
  width: 500px;
  height: 180px;
  margin-left: 50px;
  position: relative;
  .content {
     display: flex;
     justify-content: center;
  }
  .box{
    margin-top: -20px;
    width: 118px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 20px;
    font-family: "Light";
    .chart {
      width: 100%; 
      background: url("@/assets/images/设备工况统计1.png") no-repeat center center;
      height: 200px;
    } 
    .text {
      font-size: 24px;
      text-align: center;
      margin-top: -38px;
      color: #FFF000;
      span{
        color: #09aea5;
        font-size: 14px;
      }
    }
    .title {
      margin-top: 18px;
      background: url('@/assets/images/设备工况统计2.png') no-repeat center center;
      background-size: 100% 100%;
      width: 90px;
      height: 29px;
      color: #96D6E8;
      text-align: center;
      line-height: 29px;
      font-size: 14px;
    }
  }
}

</style>
