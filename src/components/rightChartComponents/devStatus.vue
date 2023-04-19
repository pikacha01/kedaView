<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import ChartTitle from '../chartTitle.vue';
import { pieData } from '@/api/data'
import * as echarts from "echarts";
import { rightDataStore } from '@/store'
const store = rightDataStore()

onMounted(async () => {
  await store.getDevStatus()
  store.devStatusData.forEach(item => {
    initBarChart(item)
  })
})

onUnmounted(() => {
  echart.dispose;
});

let echart = echarts

function initBarChart(data: pieData) {
  let chart = echart.init(document.getElementById(`proChart${data.name}`) as HTMLElement);
  chart.setOption({
    title: [
      {
        text: (Number(data.value / store.devStatusTotal * 100).toFixed(2))+ "%",
        x: "20%",
        y: "35%",
        textStyle: {
          fontSize: "50",
          color: "#23f8ef",
          foontWeight: "600",
        },
        image: "@/assets/img/设备工况统计2.png",
        width: 32,
        height: 41, 
      },
      
    ],
    polar: {
      radius: ["95%", "70%"],
      center: ["47%", "40%"],
    },
    angleAxis: {
      max: store.devStatusTotal,
      show: false,
    },
    radiusAxis: {
      type: "category",
      show: true,
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    series: [
      {
        name: "",
        type: "bar",
      //   roundCap: true,
        barWidth: 30,
        showBackground: true,
        backgroundStyle: {
          color: "#0a3142",
        },
        data: [data.value],
        coordinateSystem: "polar",
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                color: "#12575c",
              },
              {
                offset: 1,
                color: "#09ada4",
              },
            ]),
          },
        },
      },
      {
        name: "",
        type: "pie",
        startAngle: 80,
      //   radius: ["56%"],
        hoverAnimation: false,
        center: ["50%", "50%"],
        itemStyle: {
          color: "rgba(66, 66, 66, .1)",
          borderWidth: 1,
          // borderColor: "#5269EE",
        },
        data: [100],
      },
      {
        name: "",
        type: "pie",
        startAngle: 80,
      //   radius: ["38%"],
        hoverAnimation: false,
        center: ["50%", "50%"],
        itemStyle: {
          color: "rgba(66, 66, 66, .1)",
          borderWidth: 1,
          // borderColor: "#5269EE",
        },
        data: [100],
      },
    ],
  })
  window.onresize = function() {
    //自适应大小
    chart.resize()
  };
}

</script>

<template>
  <div class="devStatus">
    <ChartTitle title="设备工况统计" />
    <div class="content">
      <div class="box" v-for="(item) in store.devStatusData" :key="item.name">
        <div class="chart"  :id="`proChart${item.name}`">
        </div>
        <div class="text">{{ item.value }} <span> / {{ store.devStatusTotal }}</span></div>
        <div class="title">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.devStatus {
  width: 1500px;
  height: 820px;
  margin-left: 50px;
  .content {
     margin-top: 100px;
     display: flex;
  }
  .box{
    width: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 150px;
    font-family: "Light";
    .chart {
      width: 100%; 
      background: url("@/assets/img/设备工况统计1.png");
      height: 400px;
    }
    .text {
      font-size: 65px;
      text-align: center;
      margin-top: -50px;
      color: #FFF000;
      span{
        color: #09aea5;
        font-size: 50px;
      }
    }
    .title {
      margin-top: 60px;
      background: url('@/assets/img/设备工况统计3.png') no-repeat center center;
      background-size: 100% 100%;
      width: 400px;
      height: 100px;
      color: #96D6E8;
      text-align: center;
      line-height: 100px;
      font-size: 50px;
    }
  }
}
</style>
