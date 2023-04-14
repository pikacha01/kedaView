<script setup lang="ts">
import {} from 'vue'
import ChartTitle from './chartTitle.vue';
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
            <img src="@/assets/img/电站健康分析4.png" alt="">
          </div>
          <div class="percent">100<span style="font-size: 45px;">%</span></div>
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
