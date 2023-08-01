<script setup lang="ts">
import { onMounted, onUnmounted,watch } from 'vue'
import ChartTitle from '../chartTitle.vue';
import * as echarts from "echarts";
import { rightDataStore,mapDataStore } from '@/store'
import { computed } from '@vue/reactivity';
const store = rightDataStore()
const mapStore = mapDataStore()
let echart = echarts
let timer : any = null
let chart : any = null

onMounted(async () => {
  await store.getAlarmReport(mapStore.selectStation)
  alarmChart()
  timer = setInterval(() => {
    store.type = store.type === 3 ? 2 : 3
  },10000)
})

onUnmounted(() => {
  window.clearInterval(timer)
  timer = null
  echart.dispose(chart);
});

watch(() => {
  return store.type
}, () => {
  const option: any = chart.getOption()// 获取当前配置项
  if (!option) {
    return 
  }
  if (store.type === 3) {
    option.series[0].data = store.alarmyDataMonth
    option.xAxis[0].data = store.alarmxDataMonth
  } else {
    option.series[0].data = store.alarmyDataDay
    option.xAxis[0].data = store.alarmxDataDay
  }
  chart.setOption(option)
})


const isChecked = computed(() => {
  if (store.type === 3) {
    return true
  }
  return false
})

function alarmChart() {
  chart = echart.init(document.getElementById("alarmReport") as HTMLElement);
  chart.setOption({
    grid: {
      top: "25%",
      bottom: "10%", //也可设置left和right设置距离来控制图表的大小
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: 'rgba(28, 212, 145, 0.2)', // 设置 Tooltip 的背景色
      borderWidth: 2, // 设置 Tooltip 的边框宽度
      borderColor: '#18E399', // 设置 Tooltip 的边框颜色
      formatter: function (params: any) {
        let html =''
        html += '<div style="width: 100px; height: 46px; font-size: 14px; color: #fff;">'
        html += '<div style="margin-top: 2px;">' + params[0].name + '时</div>';
        html += '<div style="margin-top: 5px; display:flex; align-items: center"><div>告警数量:</div><div style="font-size: 14px;margin-left:10px;color:#F6FF00">'+ params[0].data +'条</div></div>';
        return html
      }
    },
    xAxis: {
      type: 'category',
      data: store.alarmxDataMonth,
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
          fontSize: 15
        },
      },
    },
    yAxis: {
      type: 'value',
      name: "条",
      nameTextStyle: {
          color: "#96D6E8",
          fontSize: 15,
          // padding:[0,0,40,0]

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
        data: store.alarmyDataMonth,
        type: 'line',
        smooth: true, //平滑曲线显示
        showAllSymbol: true, //显示所有图形。
        // symbol: "circle", //标记的图形为实心圆
        symbol: "none", //标记的图形为实心圆
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
  <div class="alarmReport">
    <ChartTitle style="padding-left: 10px; width: 460px; margin-right: 20px;" title="告警趋势分析"
    first-option="月" 
    second-option="日" 
    :is-checked="isChecked"
    />
    <div class="alarmChart" id="alarmReport"></div>
  </div>

</template>

<style scoped lang="less">
.alarmReport {
  margin-top: 120px;
  margin-left: 50px;
  width: 490px;
  .alarmChart{
    margin-top: 20px;
    width: 100%;
    height: 230px;
  }
}
</style>
