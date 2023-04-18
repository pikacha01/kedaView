<script setup lang="ts">
import { onMounted,onUnmounted,computed } from 'vue'
import ChartTitle from '../chartTitle.vue';
import * as echarts from "echarts";
import { bottomDataStore } from '@/store';
import {pieData} from '@/api/data'
const store = bottomDataStore()

let echart = echarts


onMounted(async () => {
  await store.getVolume()
  pieChart();
});

onUnmounted(() => {
  echart.dispose;
});


function pieChart() {
  let chart = echart.init(document.getElementById("pieChart") as HTMLElement);
  chart.setOption({
    grid: {
      top: "25%",
      bottom: "10%", //也可设置left和right设置距离来控制图表的大小
    },
    legend: {
        show: true,
        icon: "circle",
        top: "18%",
        left: "30%",
        data: store.arrName,
        width: 40,
        padding: [0, 0, 0 , 50],
        itemGap: 25,
        formatter: function(name:string) {
            return "{text|" + name + "}  {value|"+ ((store.objData[name].value / store.sumValue * 100).toFixed(2)) +"%}    {title|" + (store.objData[name].value) + "} {title|万kWp}"
        },
        textStyle: {
          rich: {
            title: {
                fontSize: 25,
                color: "#23f8ef"
            },
            value: {
                fontSize: 25,
                color: "#F6FF00"
            },
            text: {
              fontSize: 25,
              color:"#93bad0"
            }
            }
        },
    },
    tooltip: {
        show: true,
        trigger: "item",
        formatter: "{a}<br>{b}:{c}({d}%)"
    },
    color: ['#1472bb', '#00c6ff', '#22ff89'],
    xAxis: [{
        show: false
    }],
    series:store.optionData.series
  })
}
</script>

<template>
  <div class="powerStationCapacity">
    <ChartTitle title="电站装机容量" />
    <div class="pieChart" id="pieChart"></div>
  </div>
</template>

<style scoped lang="less">
.powerStationCapacity{
  margin-left: 150px;
  width: 1350px;
  height: 100%;
  .pieChart {
    width: 100%;
    height: 700px;
  }
}
</style>
