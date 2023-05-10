<script setup lang="ts">
import {onMounted,onUnmounted,watch} from 'vue'
import ChartTitle from '../chartTitle.vue';
import * as echarts from "echarts";
import { bottomDataStore,mapDataStore } from '@/store';

const mapStore = mapDataStore()
const store = bottomDataStore()
let echart = echarts
let chart : any = null

onMounted(async () => {
  await store.getPR(mapStore.selectStation)
  barChart();
  watch(() => {
    return store.PRyData
  }, () => {
    const option: any = chart.getOption()// 获取当前配置项
    if (!option) {
      return 
    }
    option.xAxis[0].data = store.PRxData
    option.series[0].data = store.PRyData
  chart.setOption(option)
  })
});
function barChart() {
  chart = echart.init(document.getElementById("barAndLineChart") as HTMLElement);
  chart.setOption({
    grid: {
      top: "25%",
      bottom: "10%", //也可设置left和right设置距离来控制图表的大小
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: 'shadow'
      },
      backgroundColor: 'rgba(28, 212, 145, 0.2)', // 设置 Tooltip 的背景色
      borderWidth: 2, // 设置 Tooltip 的边框宽度
      borderColor: '#18E399', // 设置 Tooltip 的边框颜色
      formatter: function (params: any) {
        let html =''
        html += '<div style="width: 420px; height: 150px; padding: 10px; font-size: 40px; color: #fff;">'
        html += '<div style="margin-top: 20px;">' + params[0].name + '时</div>';
        html += '<div style="margin-top: 50px; display:flex; align-items: center"><div>等效小时数:</div><div style="font-size: 50px;margin-left:10px;color:#F6FF00">'+ params[0].data +'小时</div></div>';
        // html += '<div style="margin-top: 50px; display:flex; align-items: center"><div>能效PR:</div><div style="font-size: 50px;margin-left:10px;color:#F6FF00">'+ params[1].data +'%</div></div>';
        return html
      }
    },
    legend: {
      data: ["等效小时数"],
      top: "15%",
      textStyle: {
        color: "#ffffff",
        fontSize: 25
      },
    },
    xAxis: {
      data: store.PRxData,
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
      // {
      //   type: "value",
      //   name: "%",
      //   nameTextStyle: {
      //     color: "#96D6E8",
      //     fontSize: 42,
      //     padding:[0,0,40,0]

      //   },
      //   splitLine: {
      //     show:false
      //   },
      //   axisTick: {
      //     show: false,
      //   },
      //   axisLine: {
      //     show: false,
      //   },
      //   axisLabel: {
      //     show: true,
      //     textStyle: {
      //       color: "#96D6E8 ",
      //       fontSize: 42
      //     },
      //   },
      // },
      {
        type: "value",
        name: "小时",
        nameTextStyle: {
          color: "#96D6E8 ",
          fontSize: 42,
          padding:[0,0,40,50]
        },
        position: "left",
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
      // {
      //   name: "等效小时数",
      //   type: "line",
      //   yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
      //   smooth: true, //平滑曲线显示
      //   showAllSymbol: true, //显示所有图形。
      //   symbol: "circle", //标记的图形为实心圆
      //   symbolSize: 10, //标记的大小
      //   itemStyle: {
      //     //折线拐点标志的样式
      //     color: "#0fe7ae",
      //     borderColor: '#fff',
      //     borderWidth: 3,
      //   },
      //   lineStyle: {
      //     color: "#0fe7ae",
      //   },
      //   areaStyle: {
      //     color: "rgba(5,140,255, 0.2)",
      //   },
      //   data: store.HourYData,
      // },
      {
        name: "等效小时数",
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
        data: store.PRyData,
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
  echart.dispose(chart);
});
</script>

<template>
  <div class="rpEfficiency">
    <ChartTitle 
    title="等效小时分析" 
    />
    <div class="barChart" id="barAndLineChart"></div>
  </div>
</template>

<style scoped lang="less">
.rpEfficiency{
  margin-left: 150px;
  width: 1350px;
  height: 100%;
  .barChart {
    width: 100%;
    height: 700px;
  }
}
</style>
