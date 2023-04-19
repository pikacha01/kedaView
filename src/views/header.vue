<script setup lang="ts">
import { onMounted} from 'vue'
import { headerDataStore } from '@/store'
const store = headerDataStore()

onMounted(() => {
})

const title = "科达智慧能源智能管控系统"

</script>

<template>
  <div class="header">
    <div class="container">
      <div class="title">
        <div class="left">
          <img src="@/assets/title/标题修饰2.png" alt="">
        </div>
        <div class="text">
          <div v-for="item in title" :key="title">{{ item }}</div>
        </div>
        <div class="right">
          <img src="@/assets/title/标题修饰1.png" alt="">
        </div>
      </div>
      <div class="rightHeader">
        <div class="date">
          <div class="time">
            14:54:45
          </div>
          <div class="weekend smallSize">
            2022/5/19 星期三
          </div>
        </div>
        <div class="separate">
          <img src="@/assets/title/标题竖线.png" alt="">
        </div>
        <div class="weateher">
          <div class="left">
            <img src="@/assets/title/天气.png" alt="">
          </div>
          <div class="right">
            <div>27℃</div>
            <div class="smallSize">晴转多云</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.header{
  position: absolute;
  width: 100%;
  background: url("@/assets/title/标题背景.png") no-repeat center center;
  z-index: 999;
  height: 308px;
  .container{
    background: url("@/assets/title/标题光晕.png") no-repeat center bottom;
    position: relative;
    height: 308px;
    padding-bottom: 90px;
    .title {
      position: absolute;
      top: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      left: 50%;
      transform: translate(-50%, -50%);
      .left {
        margin-right: 100px;
        padding-bottom: 40px;
      }
      .text {
        display: flex;
        justify-content: space-between;
        font-size: 120px;
        width: 2000px;
        color: #9FF6F4
      }
      .right{
        margin-left: 100px;
        padding-bottom: 40px;

      }
    }
    .rightHeader {
      float: right;
      font-size: 80px;
      color: #fff;
      display: flex;
      .separate{
        padding: 40px 80px 0 80px;
      }
      .smallSize{
        font-size: 40px;
      }
      .weateher{
        display: flex;
        justify-content: center;
        align-items: center;
        .left{
          margin-top: 40px;
          margin-right: 50px;
        }
        .right {
          margin-right: 100px;
        }
      }
    }
  }
}
</style>
