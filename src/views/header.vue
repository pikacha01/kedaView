<script setup lang="ts">
import { onMounted , ref, onUnmounted } from 'vue'
import { headerDataStore,mapDataStore } from '@/store'
const store = headerDataStore()
const mapStore = mapDataStore()

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
        <div class="text">
          <div v-for="(item) in store.titleContent">{{ item }}</div>
        </div>
      </div>
      <div class="rightHeader">
        <div class="date">
          <div class="weekend smallSize">
            {{ year }}/{{ month }}/{{ date }} 星期{{ weekend }}
          </div>
          <div class="time">
            {{ hour }}:{{ minute }}:{{ second }}
          </div>
        </div>
        <div class="separate">
          <img src="@/assets/images/标题竖线.png" alt="">
        </div>
        <div class="weateher">
          <div class="left">
            <img src="@/assets/images/天气.png" alt="">
          </div>
          <div class="right">
            <div>
              <span>
                {{ mapStore.stationListData.data[0]?.weather }}</span>
              <span style="margin-left: 15px;">
                {{ mapStore.stationListData.data[0]?.weatherStatus }}
              </span>
            </div>
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
  background: url("@/assets/images/标题背景.png") no-repeat center center;
  z-index: 999;
  height: 94px;
  .container{
    position: relative;
    height: 94px;
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
        font-size: 30px;
        width: 500px;
        color: #9FF6F4
      }
      .right{
        margin-left: 100px;
        padding-bottom: 40px;

      }
    }
    .rightHeader {
      float: right;
      font-size: 26px;
      color: #96D6E8;
      display: flex;
      margin-top: 7px;
      .separate{
        padding: 12px 25px 0 17px;
      }
      .smallSize{
        font-size: 14px;
        text-align: center;
        color: #83BAC8;
      }
      .weateher{
        display: flex;
        justify-content: center;
        align-items: center;
        .left{
          margin-right: 13px;
        }
        .right {
          margin-right: 23px;
          font-size: 22px;
        }
      }
    }
  }
}
</style>
