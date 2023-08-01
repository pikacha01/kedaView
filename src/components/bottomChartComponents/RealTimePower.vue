<script setup lang="ts">
import { onMounted,onUnmounted,watch } from 'vue'
import ChartTitle from '../chartTitle.vue';
import { bottomDataStore,mapDataStore } from '@/store';
import * as echarts from "echarts";

const mapStore = mapDataStore()
const store = bottomDataStore()
let echart = echarts
let chart : any = null

onMounted(async () => {
  await store.getHourElectric(mapStore.selectStation)
  realEleChart();
  watch(() => {
    return store.HourYData
    }, () => {
    const option: any = chart.getOption()// 获取当前配置项
    if (!option) {
      return 
    }
    option.xAxis[0].data = store.HourXData
    option.series[0].data = store.HourYData
    chart.setOption(option)
  })
});
onUnmounted(() => {
  echart.dispose(chart);
}
)

function realEleChart() {
  chart = echart.init(document.getElementById("realEleChart") as HTMLElement);
  chart.setOption({
    grid: {
      top: "25%",
      bottom: "10%", //也可设置left和right设置距离来控制图表的大小
      left: 55
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: 'shadow'
      },
      backgroundColor: 'rgba(28, 212, 145, 0.2)', // 设置 Tooltip 的背景色
      borderWidth: 2, // 设置 Tooltip 的边框宽度
      borderColor: '#065f9a', // 设置 Tooltip 的边框颜色
      formatter: function (params: any) {
        let html =''
        html += '<div style="width: 150px; height: 46px; font-size: 14px; color: #fff;">'
        html += '<div style="margin-top: 2px;">' + params[0].name + '时</div>';
        html += '<div style="margin-top: 5px; display:flex; align-items: center"><div>小时发电量:</div><div style="font-size: 14px;margin-left:10px;color:#F6FF00">'+ params[0].data +'kw</div></div>';
        return html
      }
    },
    xAxis: {
      type: 'category',
      data: store.HourXData,
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
          fontSize: 14
        },
      },
    },
    yAxis: {
      type: 'value',
      name: "kwh",
      nameTextStyle: {
          color: "#96D6E8",
          fontSize: 14,
          padding:[0,0,40,0]

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
          fontSize: 14
        },
      },
    },
    series: [
      {
        // data: store.HourYData,
        data: [23,45,88,75,15,23,54,85,54,75,58,47,21,31,25,20,58,47,21,31,70,25,89],
        type: 'bar',
        smooth: true, //平滑曲线显示
        showAllSymbol: true, //显示所有图形。
        symbol: "none", //标记的图形为实心圆
        // symbolSize: 10, //标记的大小
        // itemStyle: {
        //   //折线拐点标志的样式
        //   color: "#0fe7ae",
        //   borderColor: '#fff',
        //   borderWidth: 3,
        // },
        lineStyle: {
          color: "#0fe7ae",
        },
        itemStyle: {
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
        name: "等效小时数",
      }
    ]
  }
  );
  window.onresize = function() {
    //自适应大小
    chart.resize()
  };
}

</script>

<template>
  <div class="realTimePwoer">
    <ChartTitle title="电站小时发电量" />
    <div class="lineChart" id="realEleChart"></div>
  </div>
</template>

<style scoped lang="less">

.realTimePwoer{
  margin-left: 40px;
  width: 450px;
  height: 100%;
  .lineChart {
    width: 100%;
    height: 230px;
  }
}
</style>
