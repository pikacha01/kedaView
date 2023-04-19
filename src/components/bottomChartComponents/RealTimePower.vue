<script setup lang="ts">
import { onMounted,onUnmounted } from 'vue'
import ChartTitle from '../chartTitle.vue';
import { bottomDataStore } from '@/store';
import * as echarts from "echarts";


const store = bottomDataStore()
let echart = echarts

onMounted(async () => {
  await store.getPR()
  lineChart();
});
onUnmounted(() =>{
  echart.dispose;
}
)

function lineChart() {
  let chart = echart.init(document.getElementById("LineChart") as HTMLElement);
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
      borderWidth: 1, // 设置 Tooltip 的边框宽度
      formatter: function (params: any) {
        let html =''
        html += '<div style="width: 380px; height: 155px; padding: 10px; font-size: 40px; color: #fff;">'
        html += '<div style="margin-top: 20px;">' + params[0].name + '时</div>';
        html += '<div style="margin-top: 50px; display:flex; align-items: center"><div>发电功率:</div><div style="font-size: 50px;margin-left:10px;color:#F6FF00">'+ params[0].data +'万kw</div></div>';
        return html
      }
    },
    xAxis: {
      type: 'category',
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
        data: store.HourYData,
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
  <div class="realTimePwoer">
    <ChartTitle title="实时发电功率" />
    <div class="lineChart" id="LineChart"></div>
  </div>
</template>

<style scoped lang="less">

.realTimePwoer{
  margin-left: 150px;
  width: 1350px;
  height: 100%;
  .lineChart {
    width: 100%;
    height: 700px;
  }
}
</style>
