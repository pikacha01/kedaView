<script setup lang="ts">
import { onMounted,onUnmounted,watch } from 'vue'
import ChartTitle from '../chartTitle.vue';
import * as echarts from "echarts";
import { bottomDataStore,mapDataStore } from '@/store';
const store = bottomDataStore()

const mapStore = mapDataStore()
let echart = echarts

let chart : any = null

onMounted(async () => {
  await store.getVolume(mapStore.selectStation)
  cakeChart();
  circulation();
  watch(() => {
    return store.volumeValue
  }, () => {
    const option: any = chart.getOption()// 获取当前配置项
    if (!option) {
      return 
    }
    option.series[0].data = store.volumeValue
    chart.setOption(option)
  })
});

// 实现动态效果
let index = 0
let timer: any = null

function circulation() {
  timer && window.clearTimeout(timer);
  if (store.volumeValue.length === 0) return;
  // 取消高亮指定的数据图形
  chart.dispatchAction({
    type: "downplay",
    seriesIndex: 0,
    dataIndex: index === 0 ? 2 : index - 1,
  });
  chart.dispatchAction({
    type: "highlight",
    seriesIndex: 0,
    dataIndex: index,
  });
  if (index >= store.volumeValue.length - 1) {
    index = 0;
  } else {
    index = index + 1;
  }
  timer = window.setTimeout(function () {
    circulation();
  }, 3000);
}

onUnmounted(() => {
  echart.dispose(chart);
});


function cakeChart() {
  chart = echart.init(document.getElementById("pieChart") as HTMLElement);
  chart.setOption({
    legend: {
      show: true,
      data: store.volumeValue,
      formatter: function (name: string) {
        let data : any = null
        store.volumeValue.forEach(item => {
          if (item.name === name) {
            data = item
          }
        })
        if (store.sumValue === 0) {
        return "   {text|" + name + "}     {value|"+ 25  +"%}      {title|" + (data.value) + "} {title|kw}"
          
        }
        return "   {text|" + name + "}     {value|"+ ((data.value / store.sumValue * 100).toFixed(2)) +"%}      {title|" + (data.value) + "} {title|kw}"
      },
      itemGap: 15,
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
      top: "30%",
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
            formatter: (params : any) => {
              return `${params.name}` + `\n\n${params.percent === undefined ? 25 : params.percent}%`
            },
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
        color: ["#36befc","#1975ff","#0bdea5"],
        data: store.volumeValue
      }
    ]
  }),
  window.onresize = function() {
    //自适应大小
    chart.resize()
  };
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
  margin-left: 10px;
  width: 490px;
  height: 100%;
  .pieChart {
    width: 490px;
    height: 230px;
    background: url('@/assets/images/运维管理分析4.png') no-repeat 9% center, 
  }
}
</style>
