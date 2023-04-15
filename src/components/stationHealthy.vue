<script setup lang="ts">
import {computed,ref} from 'vue'
import ChartTitle from './chartTitle.vue';
// const percentage = computed(()=>{
//   return `80`
// })
const percentage = ref(80)
</script>

<template>
  <div class="container">
    <ChartTitle title="电站健康分析" />
    <div class="body">
      <div class="progress">
        <div class="title">
          能效PR
        </div>
        <div class="content">
          <div class="strip">
            <img src="@/assets/img/电站健康分析4.png" :style="{width: percentage+'%'}" alt="">
          </div>
          <div class="percent">{{ percentage }}<span style="font-size: 45px;">%</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  width: 1600px;
  .body{
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    .progress{
      width: 100%;
      height: 90px;
      display: flex;
      align-items: center;
      .title{
        width:250px;
        font-family: Medium;
        background: url("@/assets/img/电站健康分析1.png") no-repeat center center;
        background-size: 100% 100%;
        font-size: 45px;
        color: #c4ebf6;
        text-align: center;
        height: 100%;
        line-height: 90px;
      }
      .content {
        width: 1185px;
        background: url("@/assets/img/电站健康分析2.png") no-repeat center center;
        background-size: 100% 100%;
        height: 90px;
        display: flex;
        align-items: center;
        
        .strip{
          width: 940px;
          height: 55px;
          background: url("@/assets/img/电站健康分析3.png") no-repeat center center;
          background-size: 100% 100%;
          margin-left: 25px;
          transition: width 0.5s ease-out;
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
            background: url("@/assets/img/电站健康分析2.png") no-repeat center center;
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
  }
}
</style>
