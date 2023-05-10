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
  width: 500px;
  .body{
    display: flex;
    .box{
      width: 118px;
      height: 180px;
      background: url("@/assets/images/社会贡献1.png") no-repeat center center;
      background-size: 100% 100%;
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      margin-right: 45px;
      align-items: center;
      .text {
        font-family: "Light";
        font-size: 15px;
        color: #96d6e8;
        margin-top: 10px;
      }
      .Number{
        font-family: "DRegular";
        font-size: 22px;
        color: #23F8EF;
      }
      .image{
        margin-top: 10px;
        img {
          width: 36px;
          height: 36px;
        }
      }
      .title{
        width: 110px;
        height: 34px;
        font-family: "Light";
        text-align: center;
        line-height: 34px;
        color: #96D6E8;
        font-size: 14px;
        background: url("@/assets/images/社会贡献5.png") no-repeat center center;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
