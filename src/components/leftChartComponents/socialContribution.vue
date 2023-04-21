<script setup lang="ts">
import {ref,onMounted} from 'vue'
import ChartTitle from '../chartTitle.vue';
import { leftDataStore } from '@/store'

const store = leftDataStore()

onMounted(async () => {
  await store.getContributeData()
})



</script>

<template>
  <div class="container">
    <ChartTitle title="社会贡献" />
    <div class="body">
      <div class="box" v-for="item in store.energyContribute" :key="item.title">
        <div class="text">
          年度
        </div>
        <div class="Number">
          {{ item.yearData > 10000 ? (item.yearData / 10000).toFixed(2)+"万" : item.yearData}}
        </div>
        <div class="text">
          累计
        </div>
        <div class="Number">
          {{ item.total > 10000 ? (item.total / 10000).toFixed(2)+"万" : item.total }}
        </div>
        <div class="image">
          <img :src=item.image alt="">
        </div>
        <div class="title">
          {{ item.title }}
        </div>
      </div>
      
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  width: 1600px;
  .body{
    margin-left: 50px;
    margin-top: 30px;
    display: flex;
    .box{
      width: 430px;
      height: 650px;
      background: url("@/assets/img/社会贡献1.png") no-repeat center center;
      background-size: 100% 100%;
      margin-top: 40px;
      display: flex;
      flex-direction: column;
      margin-right: 40px;
      align-items: center;
      .text {
        font-family: "Light";
        font-size: 50px;
        color: #96d6e8;
        margin-top: 20px;
      }
      .Number{
        font-family: "DRegular";
        font-size: 72px;
        color: #1bbeb9;
      }
      .image{
        margin-top: 20px;
      }
      .title{
        margin-top: 20px;
        width: 360px;
        height: 90px;
        font-family: "Light";
        text-align: center;
        line-height: 90px;
        color: #fff;
        font-size: 45px;
        background: url("@/assets/img/社会贡献5.png") no-repeat center center;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
