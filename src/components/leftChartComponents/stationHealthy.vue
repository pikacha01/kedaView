<script setup lang="ts">
import {computed,ref, onMounted,onUnmounted, watch} from 'vue'
import ChartTitle from '../chartTitle.vue';
import * as echarts from "echarts";
import { leftDataStore } from '@/store';
// const percentage = computed(()=>{
//   return `80`
// })
const store = leftDataStore()
const rotate = computed(() => {
  const rotateTotal = 405 - 159
  return (rotateTotal * store.alarmReport / 100  + 159).toFixed(2)
})
let chart : any = null


let echart = echarts

onMounted(async () => {
  await store.getPRdata()
  await store.getalarmReport()
  initChart();
  // 数据更新配置
  watch(() => {
    return store.PRValue
  }, () => {
    const option:any = chart.getOption()// 获取当前配置项
    if (!option) {
      return 
    }
    option.series[0].data = store.PRValue
    option.xAxis[0].data = store.PRTitle
    chart.setOption(option,true)
  })
});

onUnmounted(() => {
  echart.dispose(chart);
});



  // 基础配置一下Echarts
function initChart() {
  chart = echart.init(document.getElementById("lineChart") as HTMLElement);
  // 把配置和数据
  chart.setOption({
    grid: {
      top: "20%",
      bottom: "20%", //也可设置left和right设置距离来控制图表的大小
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
        html += '<div style="width: 100px; height: 46px; font-size: 14px; color: #fff;">'
        html += '<div style="margin-top: 2px;">' + params[0].name + '日</div>';
        html += '<div style="margin-top: 5px; display:flex; align-items: center"><div>能效PR</div><div style="font-size: 14px;margin-left:10px;color:#F6FF00">'+ Number(params[0].data).toFixed(2) +'</div></div>';
        return html
      }
    },
    legend: {
      data: ["能效PR"],
      top: "15%",
      textStyle: {
        color: "#96D6E8",
        fontSize: 14
      },
    },
    xAxis: {
      data: store.PRTitle,
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
    yAxis: [
      {
        type: "value",
        name: "",
        nameTextStyle: {
          color: "#96D6E8",
          fontSize: 14
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
      {
        type: "value",
        name: "%",
        nameTextStyle: {
          color: "#96D6E8 ",
          fontSize: 14,
          // padding:[0,0,40,50]
        },
        position: "right",
        min: 0,
        max: 100,
        splitNumber: 6,  
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: true,
          formatter: "{value}", //右侧Y轴文字显示
          textStyle: {
            color: "#96D6E8",
            fontSize: 14
          },
        },
      },
      {
        type: "value",
        gridIndex: 0,
        min: 50,
        max: 100,
        splitNumber: 8,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: "能效PR",
        type: "bar",
        yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
        smooth: true, //平滑曲线显示
        showAllSymbol: true, //显示所有图形。
        symbol: "circle", //标记的图形为实心圆
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
        data: store.PRValue,
        // data: [23,45,88,75,15,23,54,85,54,75,58,47,21,31,25,20],
      }
    ],
  }
  );
  window.onresize = function() {
    //自适应大小
    chart.resize()
  };
}

</script>

<template>
  <div class="container">
    <ChartTitle title="电站健康分析" />
    <div class="body">
      <div class="progress">
        <div class="title">
          健康度HI
        </div>
        <div class="content">
          <div class="strip">
            <img src="@/assets/images/电站健康分析5.png" :style="{width: store.PRProgress+'%'}" alt="">
          </div>
          <div class="percent">{{ store.PRProgress.toFixed(2) }}<span style="font-size: 16px;">%</span></div>
        </div>
      </div>
      <div class="chart">
        <!-- <div class="pointer">
          <div class="pointerChart">
            <div class="image">
              <div class="content">
                <img :style="`transform: rotate(${rotate}deg)`" src="@/assets/img//电站健康分析9.png">
                <div class="circle">
                  <img src="@/assets/img/电站健康分析8.png">
                </div>
              </div>
            </div>
          </div>
          <div class="percent">{{ store.alarmReport.toFixed(2) }} <span>%</span></div>
          <div class="healthyHI">
              健康度HI
              <div>
                <img src="@/assets/img/电站健康分析5.png" alt="">
              </div>
          </div>
        </div> -->
        <div class="lineChart" id="lineChart">
      </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  width: 490px;
  margin-top: 80px;
  .body{
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    .progress{
      width: 430px;
      height: 30px;
      display: flex;
      margin-left: 20px;
      align-items: center;
      background: url("@/assets/images/电站健康分析1.png") no-repeat center center;
      background-size: 100% 100%;
      .title{
        margin-left: 15px;
        width: 65px;
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
    .chart{
      display: flex;
      .pointer {
        margin-top: 100px;
        .pointerChart{
          width: 340px;
          height: 275px;
          background: url("@/assets/img//电站健康分析6.png") no-repeat center center;
          background-size: 100% 100%;
          display: flex;
          justify-content:center;
          align-items: center;
          .image{
            width: 300px;
            height: 236px;
            background: url("@/assets/img//电站健康分析7.png") no-repeat center center;
            background-size: 100% 100%;
            .content{
              width: 100%;
              height: 100%;
              position: relative;
              .circle{
                width: 100%;
                height: 100%;
                position: relative;
                img {
                  position: absolute;
                  top: 45%;
                  left: 34%;
                }
              }
              img{
                position: absolute;
                top: 50%;
                transition: transform 0.5s ease-out;
                transform-origin: left bottom; 
                left: 50%;
              }
            }
          }
        }
        .percent{
          font-size: 50px;
          color: #fff;
          font-family: "DRegular";
          text-align: center;
          span {
            font-size: 35px;
          }
        }
        .healthyHI{
          // background: url("@/assets/img/电站健康分析5.png") no-repeat center center;
          // background-size: 100% 100%;
          width: 100%;
          height: 125px;
          text-align: center;
          font-size: 45px;
          color: #95d4e6;
          font-family: "Light";
          div img {
            margin-top: -40px;
          }
        }
      }
      .lineChart{
        height: 230px;
        width: 490px;
      }
    }
  }
}
</style>
