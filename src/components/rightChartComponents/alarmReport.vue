<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import ChartTitle from '../chartTitle.vue';
import * as echarts from "echarts";
import { rightDataStore } from '@/store'
import { computed } from '@vue/reactivity';
const store = rightDataStore()

let echart = echarts

onMounted(async () => {
  await store.getAlarmReport()
  alarmChart()
})

onUnmounted(() => {
  let chart = echart.init(document.getElementById("alarmReport") as HTMLElement);
  echart.dispose(chart);
});


// 月
const handleFirstOptionChange = () => {
  store.type = 3
  store.getAlarmReport()
}
// 日
const handleSecondOptionChange = () => {
  store.type = 4
  store.getAlarmReport()
}

const isChecked = computed(() => {
  if (store.type === 3) {
    return true
  }
  return false
})

function alarmChart() {
  let chart = echart.init(document.getElementById("alarmReport") as HTMLElement);
  chart.setOption({
    grid: {
      top: "25%",
      bottom: "10%", //也可设置left和right设置距离来控制图表的大小
    },
    tooltip: {
      trigger: "axis",

    },
    xAxis: {
      type: 'category',
      data: store.alarmxData,
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
        data: store.alarmyData,
        type: 'line',
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
    <ChartTitle title="告警趋势分析"
    first-option="月" 
    second-option="日" 
    @changeFirstOption="handleFirstOptionChange"
    @changeSecondOption="handleSecondOptionChange" 
    :is-checked="isChecked"
    />
    <div class="alarmChart" id="alarmReport"></div>

  </div>

</template>

<style scoped lang="less">
.alarmReport {
  margin-top: 120px;
  margin-left: 50px;
  width: 1500px;
  height: 820px;
  .alarmChart{
    margin-top: 50px;
    width: 100%;
    height: 700px;
  }
}
</style>
