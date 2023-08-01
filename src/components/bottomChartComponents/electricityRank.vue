<script setup lang="ts">
import {computed, onMounted,onUnmounted,watch} from 'vue'
import ChartTitle from '../chartTitle.vue';
import PowerStationCapacity from '@/components/bottomChartComponents/powerStationCapacity.vue';
import * as echarts from "echarts";
import { bottomDataStore,mapDataStore } from '@/store';

const mapStore = mapDataStore()
const store = bottomDataStore()

const isChecked = computed(() => {
  if (store.getGenerateEnum === 3) {
    return true
  }
  return false
})

let echart = echarts

let timer: any = null

let chart : any = null

onMounted(async () => {
  await store.getGenerateElectricity()
  barChart();
  watch(() => {
    return store.getGenerateEnum  
  }, () => {
    const option:any = chart.getOption()// 获取当前配置项
    if (!option) {
      return 
    }
    if (store.getGenerateEnum === 3) {
      option.series[0].data = store.generateXData
    } else {
      option.series[0].data = store.generateXDataYear
    }
    option.yAxis[0].data = store.generateYData
    chart.setOption(option)
  })
  timer = setInterval(() => {
    store.getGenerateEnum = store.getGenerateEnum === 3 ? 4 : 3
  }, 2000)
});

onUnmounted(() => {
  echart.dispose(chart);
  window.clearInterval(timer)
  timer = null;
});
function barChart() {
  chart = echart.init(document.getElementById("barChart") as HTMLElement);
  chart.setOption({
    grid: {
      top: "15%",
      bottom: "10%", //也可设置left和right设置距离来控制图表的大小
      left:100
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01],
      name: "kwh",
      nameTextStyle: {
          color: "#96D6E8",
          fontSize: 15,
      },
      axisLine: {
        show: false, //隐藏X轴轴线
      },
      axisTick: {
        show: false, //隐藏X轴刻度
        alignWithLabel: true, //对齐刻度线和标签
      },
      splitLine:{
        show:false
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#96D6E8", //X轴文字颜色
          fontSize: 14
        },
      },
    },
    yAxis: {
      type: 'category',
      axisLabel: {
        show: true,
        textStyle: {
          color: "#96D6E8", //X轴文字颜色
          fontSize: 15
        },
        formatter: function (value: any) {
          var texts = value;
          if (texts.length > 4) { // 字数限制
            texts = texts.substr(0, 4) + '...';
          }
          return texts;
        }
      },
      data: store.generateYData
    },
    series: [
      {
        name: '2011',
        type: 'bar',
        label: {
          show: true,
          position: ['95%', '-70%'],
          fontSize: 15,
          color:"#23F8EF "
        },
        barMaxWidth: 15,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
              {
                offset: 0,
                color: "#22e7e4",
              },
              {
                offset: 1,
                color: "#04417d",
              },
            ]),
          },
        },
        data: store.generateXData,
      }
    ]
  })
  window.onresize = function() {
    //自适应大小
    chart.resize()
  };
}
</script>

<template>
  <!-- <div class="electricityRank" v-show="!mapStore.selectStation">
    <ChartTitle 
    title="发电量排名" 
    first-option="月" 
    second-option="年" 
    :is-checked="isChecked"
    />
    <div class="barChart" id="barChart"></div>
  </div> -->
  <!-- <PowerStationCapacity v-show="mapStore.selectStation" /> -->
  <PowerStationCapacity />
</template>

<style scoped lang="less">
.electricityRank{
  margin-left: 10px;
  width: 490px;
  height: 100%;
  .barChart {
    width: 100%;
    height: 230px;
  }
}
</style>
