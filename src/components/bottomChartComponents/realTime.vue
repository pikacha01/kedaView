<script setup lang="ts">
import { onMounted,onUnmounted,watch,ref } from 'vue'
import ChartTitle from '../chartTitle.vue';
import { bottomDataStore,mapDataStore } from '@/store';
import * as echarts from "echarts";

const mapStore = mapDataStore()
const store = bottomDataStore()
let echart = echarts
let timer : any  =null 

let chart : any = null

onMounted(async () => {
  await store.getEnergyPower(mapStore.selectStation)
  realTimeChart();
  watch(() => {
    return store.PowerY
    }, () => {
    const option: any = chart.getOption()// 获取当前配置项
    if (!option) {
      return 
    }
    option.xAxis[0].data = store.PowerX
    option.series[0].data = store.PowerY
    chart.setOption(option)
  })
  // timer = setInterval(() => {
  //   console.log("Timeout")
  //   data.value = data.value.map(item => {
  //     return item * 0.9
  //   })
  //   setTimeout(() => {
  //     console.log("Timeout2")
  //     data.value = data.value.map(item => {
  //       return item * 5
  //     })
  //   },2000)
  // },10000)
});
onUnmounted(() => {
  timer = null
  window.clearInterval(timer)
  echart.dispose(chart);
}
)

function realTimeChart() {
  chart = echart.init(document.getElementById("realPowerChart") as HTMLElement);
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
      borderColor: '#18E399', // 设置 Tooltip 的边框颜色
      formatter: function (params: any) {
        let html =''
        html += '<div style="width: 150px; height: 46px; font-size: 14px; color: #fff;">'
        html += '<div style="margin-top: 20x;">' + params[0].name + '时</div>';
        html += '<div style="margin-top: 50x; display:flex; align-items: center"><div>发电功率:</div><div style="font-size: 14px;margin-left:10px;color:#F6FF00">'+ params[0].data +'kw</div></div>';
        return html
      }
    },
    xAxis: {
      type: 'category',
      data: store.PowerX,
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
        name: "等效功率",
        // data: store.HourYData,
        // data: store.PowerY,
        data: [23,45,88,75,15,23,54,85,54,75,58,47,21,31,25,20,58,47,21,31,70,25,89],
        type: 'line',
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
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(28, 212, 145, 0.5)",
              },
              {
                offset: 1,
                color: "rgba(0, 255, 210, 0.2)",
              },
            ]),
        },
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
  <div class="realPower">
    <ChartTitle title="逆变器小时功率" />
    <div class="realPowerChart" id="realPowerChart"></div>
  </div>
</template>

<style scoped lang="less">

.realPower{
  width: 450px;
  height: 100%;
  .realPowerChart {
    width: 100%;
    height: 230px;
  }
}
</style>
