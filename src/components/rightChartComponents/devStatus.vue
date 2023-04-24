<script setup lang="ts">
import { onMounted, onUnmounted,watch } from 'vue'
import ChartTitle from '../chartTitle.vue';
import { pieData } from '@/api/data'
import * as echarts from "echarts";
import { rightDataStore } from '@/store'
const store = rightDataStore()
let chart : any = null

let timer :any = null

onMounted(async () => {
  await store.getDevStatus()
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
    // 上一个下表
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
        fontSize: 30,
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
      radius: ['80%', '91%'],
      emphasis: {
        label: {
          show: true,
          formatter: "{d}%",
          fontSize: 50,
          fontWeight: 'bold',
          color:"#23f8ef"
        },
        sclae: true,
        scaleSize: 15,
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
  width: 1500px;
  height: 820px;
  margin-left: 50px;
  .content {
     margin-top: 100px;
     display: flex;
  }
  .box{
    width: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 150px;
    font-family: "Light";
    .chart {
      width: 100%; 
      background: url("@/assets/img/设备工况统计1.png") no-repeat center center;
      height: 400px;
    }
    .text {
      font-size: 65px;
      text-align: center;
      margin-top: -30px;
      color: #FFF000;
      span{
        color: #09aea5;
        font-size: 50px;
      }
    }
    .title {
      margin-top: 60px;
      background: url('@/assets/img/设备工况统计3.png') no-repeat center center;
      background-size: 100% 100%;
      width: 400px;
      height: 100px;
      color: #96D6E8;
      text-align: center;
      line-height: 100px;
      font-size: 50px;
    }
  }
}
</style>
