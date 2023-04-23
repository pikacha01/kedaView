<script setup lang="ts">
import { onMounted,onUnmounted,watch,ref } from 'vue'
import ChartTitle from '../chartTitle.vue';
import { bottomDataStore } from '@/store';
import * as echarts from "echarts";


const store = bottomDataStore()
let echart = echarts
const data= ref([502,456,351,102,0,0,0,0,0,0,0,0,125,225,325,456,478,520,550,600,650,700,697,657,620])
let timer : any  =null 

let chart : any = null

onMounted(async () => {
  await store.getHourElectric()
  realTimeChart();
  watch(() => {
    return data.value
    }, () => {
    const option: any = chart.getOption()// 获取当前配置项
    if (!option) {
      return 
    }
    option.xAxis[0].data = store.HourXData
    option.series[0].data = data.value
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
        html += '<div style="width: 450px; height: 155px; padding: 10px; font-size: 40px; color: #fff;">'
        html += '<div style="margin-top: 20px;">' + params[0].name + '时</div>';
        html += '<div style="margin-top: 50px; display:flex; align-items: center"><div>发电功率:</div><div style="font-size: 50px;margin-left:10px;color:#F6FF00">'+ params[0].data +'万kw</div></div>';
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
          fontSize: 25
        },
      },
    },
    yAxis: {
      type: 'value',
      name: "万kwh",
      nameTextStyle: {
          color: "#96D6E8",
          fontSize: 42,
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
          fontSize: 42
        },
      },
    },
    series: [
      {
        // data: store.HourYData,
        data: data.value,
        type: 'bar',
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
    <ChartTitle title="实时功率" />
    <div class="realPowerChart" id="realPowerChart"></div>
  </div>
</template>

<style scoped lang="less">

.realPower{
  margin-left: 150px;
  width: 1350px;
  height: 100%;
  .realPowerChart {
    width: 100%;
    height: 700px;
  }
}
</style>
