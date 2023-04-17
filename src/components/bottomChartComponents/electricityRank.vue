<script setup lang="ts">
import {onMounted,onUnmounted} from 'vue'
import ChartTitle from '../chartTitle.vue';
import * as echarts from "echarts";

// 年
const handleFirstOptionChange = () => {
  console.log("FirstOptionChange")
}
// 月
const handleSecondOptionChange = () => {
  console.log("handleSecondOptionChange")
}
let echart = echarts

onMounted(() => {
  barChart();
});

onUnmounted(() => {
  echart.dispose;
});
function barChart() {
  let chart = echart.init(document.getElementById("barChart") as HTMLElement);
  chart.setOption({
    grid: {
      top: "25%",
      bottom: "10%", //也可设置left和right设置距离来控制图表的大小
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01],
      name: "万kwh",
      nameTextStyle: {
          color: "#96D6E8",
          fontSize: 30
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
          fontSize: 25
        },
      },
    },
    yAxis: {
      type: 'category',
      axisLabel: {
        show: true,
        textStyle: {
          color: "#96D6E8", //X轴文字颜色
          fontSize: 25
        },
      },
      data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
    },
    series: [
      {
        name: '2011',
        type: 'bar',
        label: {
          show: true,
          position: ['95%', '-70%'],
          fontSize: 20,
          color:"#23F8EF "
        },
        barMaxWidth: 30,
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
        data: [1823, 2389, 2904, 10490, 13144, 6230],
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
  <div class="electricityRank">
    <ChartTitle 
    title="发电量排名" 
    sub-title="发电量分析" 
    first-option="月" 
    second-option="年" 
    @changeFirstOption="handleFirstOptionChange"
    @changeSecondOption="handleSecondOptionChange" />
    <div class="barChart" id="barChart"></div>
  </div>
</template>

<style scoped lang="less">
.electricityRank{
  margin-left: 75px;
  width: 1450px;
  height: 100%;
  .barChart {
    width: 100%;
    height: 700px;
  }
}
</style>
