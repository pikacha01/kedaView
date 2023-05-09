<script setup lang="ts">
import {onMounted,onUnmounted,ref,watch} from 'vue'
import ChartTitle from '../chartTitle.vue';
import { bottomDataStore } from "@/store"
import * as echarts from "echarts";

const store = bottomDataStore()

let echart = echarts

let chart : any = null

onMounted(async () => {
  await store.getWorkOrder()
  cakeChart();
  circulation();
  const option: any = chart.getOption()// 获取当前配置项
  watch(() => {
    return store.workOrder
  }, () => {
    if (!option) {
      return 
    }
    option.series[0].data = store.workOrder
    chart.setOption(option)
  })
});

// 实现动态效果
let index = 0
let timer: any = null

function circulation() {
  timer && window.clearTimeout(timer);
  if (store.workOrder.length === 0) return;
  // 取消高亮指定的数据图形
  chart.dispatchAction({
    type: "downplay",
    seriesIndex: 0,
    dataIndex: index === 0 ? 3 : index - 1,
  });
  chart.dispatchAction({
    type: "highlight",
    seriesIndex: 0,
    dataIndex: index,
  });
  if (index >= store.workOrder.length - 1) {
    index = 0;
  } else {
    index = index + 1;
  }
  timer = window.setTimeout(function () {
    circulation();
  }, 3000);
}

function cakeChart() {
  chart = echart.init(document.getElementById("cakeChart") as HTMLElement);
  chart.setOption({
    legend: {
      show: true,
      data: store.workOrderName,
      formatter: function(name:string) {
            return "      {text|" + name + "}       {value|"+ ((store.objDataWorkeOrder[name].value / store.sumValueOrderName * 100).toFixed(2)) +"%}         {title|" + (store.objDataWorkeOrder[name].value) + "} {title|条}"
      },
      itemGap: 10,
      textStyle: {
          rich: {
            title: {
                fontSize: 14,
                color: "#23f8ef"
            },
            value: {
                fontSize: 14,
                color: "#F6FF00"
            },
            text: {
              fontSize: 14,
              color:"#93bad0"
            }
          }
      },
      top: "25%",
      left: "40%",
      // padding: [20, 30, 20, 0],
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '55%'],
        left: "-62%",
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 5,
          normal: {
            borderWidth: 5, // 间距的宽度
            borderColor: '#06171e', //背景色
          }
        },
        hoverAnimation: true,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            formatter: "{b}\n\n{d}%",
            fontSize: 14,
            fontWeight: 'bold',
            color:"#36befc"
          },
          sclae: true,
          scaleSize:5,
        },
        labelLine: {
          show: false
        },
        color: ["#36befc","#1975ff","#0bdea5","#ffd800"],
        data: store.workOrder
      }
    ]
  }),
  window.onresize = function() {
    //自适应大小
    chart.resize()
  };
}

onUnmounted(() => {
  let chart = echart.init(document.getElementById("cakeChart") as HTMLElement);
  echart.dispose(chart);
  window.clearTimeout(timer);
  timer = null;
});
</script>

<template>
  <div class="operationManage">
    <ChartTitle title="运维管理分析" />
    <div class="progress">
      <div class="title">
        工单准时完成率
      </div>
      <div class="content">
          <div class="strip">
            <img src="@/assets/images/电站健康分析5.png" :style="{width: store.percentageComplete +'%'}" alt="">
          </div>
          <div class="percent">{{ store.percentageComplete  }}%</div>
        </div>
    </div>
    <div class="chart">
      <div class="pieChart" id="cakeChart"></div>
    </div>
  </div>
</template>

<style scoped lang="less">
.operationManage{
  // margin-left: 100px;
  width: 490px;
  height: 100%;
  .progress {
    width: 430px;
    height: 30px;
    display: flex;
    margin-top: 15px;
    margin-left: 20px;
    align-items: center;
    background: url("@/assets/images/电站健康分析1.png") no-repeat center center;
    background-size: 100% 100%;
    .title{
      margin-left: 15px;
      // width: 65px;
      font-family: Medium;
      background-size: 100% 100%;
      font-size: 16px;
      color: #00FFEA;
      text-align: center;
      height: 100%;
      line-height: 30px;
      }
      .content {
        background-size: 100% 100%;
        height: 18px;
        display: flex;
        align-items: center;
        .strip{
          width: 201px;
          height: 18px;
          background: url("@/assets/images/电站健康分析4.png") no-repeat center center;
          background-size: 100% 100%;
          margin-left: 10px;
          transition: width 1s ease-out;
          position: relative;
          img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .percent{
          padding-left: 25px;
          font-family: "DRegular";
          color: #23f8ef;
          font-size: 16px;
        }
      }
  }
  .chart {
    width: 100%;
    display: flex;
    .pieChart {
      width: 100%;
      height: 230px;
      background: url('@/assets/images/运维管理分析4.png') no-repeat 9% center, 
    }
  }
}
</style>
