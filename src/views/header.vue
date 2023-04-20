<script setup lang="ts">
import { onMounted , ref, onUnmounted } from 'vue'
import { headerDataStore } from '@/store'
const store = headerDataStore()

let now = new Date();
let year = ref(now.getFullYear());
let month = ref(now.getMonth() + 1);
let date = ref(now.getDate());
let day = ref(now.getDay());
let hour = ref<any>(now.getHours());
let minute = ref<any>(now.getMinutes());
let second = ref<any>(now.getSeconds());
// 将星期转换为中文
let days = ["日", "一", "二", "三", "四", "五", "六"];
let weekend = ref(days[day.value]);

let time : any = null
onMounted(() => {
  store.getTitle()
  time = setInterval(() => {
    now = new Date();
    year.value = now.getFullYear();
    month.value = now.getMonth() + 1;
    date.value =now.getDate();
    day.value = now.getDay();
    hour.value = now.getHours();
    if (hour.value < 10) {
      hour.value = '0' + hour.value
    }
    minute.value = now.getMinutes();
    if (minute.value < 10) {
      minute.value = '0' + minute.value
    }
    second.value = now.getSeconds();
    if (second.value < 10) {
      second.value = '0' + second.value
    }
    weekend.value = days[day.value]
  },500)
})

onUnmounted(() => {
  window.clearInterval(time)
  time = null
})


</script>

<template>
  <div class="header">
    <div class="container">
      <div class="title">
        <div class="left">
          <img src="@/assets/title/标题修饰2.png" alt="">
        </div>
        <div class="text">
          <div v-for="(item) in store.titleContent">{{ item }}</div>
        </div>
        <div class="right">
          <img src="@/assets/title/标题修饰1.png" alt="">
        </div>
      </div>
      <div class="rightHeader">
        <div class="date">
          <div class="time">
            {{ hour }}:{{ minute }}:{{ second }}
          </div>
          <div class="weekend smallSize">
            {{ year }}/{{ month }}/{{ date }} 星期{{ weekend }}
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
