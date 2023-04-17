<script setup lang="ts">
import {onMounted,onUnmounted} from 'vue'
import ChartTitle from '../chartTitle.vue';
import * as echarts from "echarts";

let echart = echarts

onMounted(() => {
  barChart();
});
function barChart() {
  let chart = echart.init(document.getElementById("barAndLineChart") as HTMLElement);
  chart.setOption({
    grid: {
      top: "25%",
      bottom: "10%", //也可设置left和right设置距离来控制图表的大小
    },
    tooltip: {
      trigger: "axis",

    },
    legend: {
      data: ["能效PR","等效小时数"],
      top: "15%",
      textStyle: {
        color: "#ffffff",
        fontSize: 25
      },
    },
    xAxis: {
      data: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
      ],
      axisLine: {
        show: true, //隐藏X轴轴线
        lineStyle: {
          color: "#065a63",
        },
      },
      axisTick: {
        show: true, //隐藏X轴刻度
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#96D6E8", //X轴文字颜色
          fontSize: 25
        },
      },
    },
    yAxis: [
      {
        type: "value",
        name: "%",
        nameTextStyle: {
          color: "#96D6E8",
          fontSize: 42
        },
        splitLine: {
          show:false
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: "#96D6E8 ",
            fontSize: 42
          },
        },
      },
      {
        type: "value",
        name: "%",
        nameTextStyle: {
          color: "#96D6E8 ",
          fontSize: 42
        },
        position: "right",
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: true,
          formatter: "{value}", //右侧Y轴文字显示
          textStyle: {
            color: "#96D6E8",
            fontSize: 42
          },
        },
      },
      {
        type: "value",
        gridIndex: 0,
        min: 50,
        max: 100,
        splitNumber: 8,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: "等效小时数",
        type: "line",
        yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
        smooth: true, //平滑曲线显示
        showAllSymbol: true, //显示所有图形。
        symbol: "circle", //标记的图形为实心圆
        symbolSize: 10, //标记的大小
        itemStyle: {
          //折线拐点标志的样式
          color: "#0fe7ae",
          borderColor: '#fff',
          borderWidth: 3,
        },
        lineStyle: {
          color: "#0fe7ae",
        },
        areaStyle: {
          color: "rgba(5,140,255, 0.2)",
        },
        data: [4.2, 3.8, 4.8, 3.5, 2.9, 2.8, 3, 5],
      },
      {
        name: "能效PR",
        type: "bar",
        barWidth: 15,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
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
        data: [4.2, 3.8, 4.8, 3.5, 2.9, 2.8, 3, 5],
      },
    ],
  }
  );
  window.onresize = function() {
    //自适应大小
    chart.resize()
  };
}

onUnmounted(() => {
  echart.dispose;
});
</script>

<template>
  <div class="rpEfficiency">
    <ChartTitle 
    title="能效PR及等效小时分析" 
    />
    <div class="barChart" id="barAndLineChart"></div>
  </div>
</template>

<style scoped lang="less">
.rpEfficiency{
  margin-left: 150px;
  width: 1300px;
  height: 100%;
  .barChart {
    width: 100%;
    height: 700px;
  }
}
</style>
