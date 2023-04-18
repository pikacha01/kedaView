<script setup lang="ts">
import {onMounted,onUnmounted} from 'vue'
import ChartTitle from '../chartTitle.vue';
import { bottomDataStore } from "@/store"
import * as echarts from "echarts";

const store = bottomDataStore()

let echart = echarts


onMounted(async () => {
  await store.getWorkOrder()
  cakeChart();
});

function cakeChart() {
  let chart = echart.init(document.getElementById("cakeChart") as HTMLElement);
  chart.setOption({
    legend: {
      show: true,
      data: store.workOrderName,
      formatter: function(name:string) {
            return "      {text|" + name + "}       {value|"+ ((store.objDataWorkeOrder[name].value / store.sumValueOrderName * 100).toFixed(2)) +"%}         {title|" + (store.objDataWorkeOrder[name].value) + "} {title|条}"
      },
      itemGap: 50,
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
      top: "23%",
      left: "55%",
      padding: [20, 30, 20, 0],
    },
    series: [
      {
        name: 'Access From',
        
        type: 'pie',
        radius: ['70%', '78%'],
        left: "-45%",
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            formatter: "{b}\n\n{d}%",
            fontSize: 50,
            fontWeight: 'bold',
            color:"#36befc"
          }
        },
        labelLine: {
          show: false
        },
        color: ["#36befc","#1975ff","#0bdea5","#ffd800"],
        data: store.workOrder
      }
    ]
  })
}

onUnmounted(() => {
  echart.dispose;
});
</script>

<template>
  <div class="operationManage">
    <ChartTitle title="运维管理分析" />
    <div class="progress">
      <div class="title">
        运维管理分析
      </div>
      <div class="content">
          <div class="strip">
            <img src="@/assets/img/电站健康分析4.png" :style="{width: 80 +'%'}" alt="">
          </div>
          <div class="percent">{{ 100  }}<span style="font-size: 45px;">%</span></div>
        </div>
    </div>
    <div class="chart">
      <div class="pieChart" id="cakeChart"></div>
    </div>
  </div>
</template>

<style scoped lang="less">
.operationManage{
  margin-left: 100px;
  width: 1400px;
  height: 100%;
  .progress {
    margin-top: 30px;
    width: 100%;
    height: 90px;
    display: flex;
    align-items: center;
    .title{
        width:400px;
        font-family: Medium;
        background: url("@/assets/img/运维管理分析1.png") no-repeat center center;
        background-size: 100% 100%;
        font-size: 45px;
        color: #c4ebf6;
        text-align: center;
        height: 100%;
        line-height: 90px;
      }
      .content {
        width: 1100px;
        background: url("@/assets/img/运维管理分析2.png") no-repeat center center;
        background-size: 100% 100%;
        height: 90px;
        display: flex;
        align-items: center;
        .strip{
          width: 750px;
          height: 55px;
          background: url("@/assets/img/运维管理分析3.png") no-repeat center center;
          background-size: 100% 100%;
          margin-left: 25px;
          transition: width 1s ease-out;
          position: relative;
          img {
            margin-left: 10px;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          &::after {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            background: url("@/assets/img/运维分析管理2.png") no-repeat center center;
          }
        }
        .percent{
          padding-right: 80px;
          padding-left: 40px;
          font-family: "DRegular";
          color: #23f8ef;
          font-size: 60px;
        }
      }
  }
  .chart {
    margin-top: 50px;
    width: 100%;
    height: 600px;
    display: flex;
    .pieChart {
      width: 1200px;
      height: 550px;
      background: url('@/assets/img/运维管理分析5.png') no-repeat 9% center, 
                  url('@/assets/img/运维管理分析7.png') no-repeat 19% center,
                  url('@/assets/img/运维管理分析6.png') no-repeat 505px center;
    }
  }
}
</style>
