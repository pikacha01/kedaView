<script setup lang="ts">
import {} from 'vue'
defineProps<{
  title: string,
  subTitle?: string,
  firstOption?: string,
  secondOption?: string,
  isChecked?: boolean
}>()
</script>

<template>
  <div class="charTitle">
    <div class="title">
      <div>
        <img src="@/assets/img/小标题修饰.png">
      </div>
      <div class="text">{{ title }}</div>
    </div>
    <div class="subTitle" v-if="subTitle">
      {{ subTitle }}
    </div>
    <div class="changeDate" >
      <div class="firstOption" v-if="firstOption" :style="{ 'background': `url(src/assets/img/${isChecked ? 'tab1.png' : 'tab2.png'}) no-repeat center center` }" @click="$emit
      ('changeFirstOption')">{{ firstOption }}</div>
      <div class="secondOption" v-if="secondOption" :style="{ 'background': `url(src/assets/img/${isChecked ? 'tab2.png' : 'tab1.png'}) no-repeat center center` }" @click="$emit('changeSecondOption')">{{ secondOption }}</div>
    </div>
  </div>
</template>

<style scoped lang="less">
.charTitle {
  display: flex;
  align-items: center;
  font-family: HRegular;
  width: 1425px;
  .title{
    font-weight: 400;
    display: flex;
    font-size: 56px;
    align-items: center;
    height: 100px;
    color: #fff;
    div{
      height: 100px;
        img {
          line-height: 100px;
        }
    } 
    .text{
      margin-left: 25px;
      line-height: 100px;
    }
  }
  .subTitle{
    margin-left: 65px;
    color:#777c7e;
    font-size: 56px;
    padding-left: 60px;
    border-left: 1px solid rgba(119, 124, 126, 0.5);;
    height: 70px;
    line-height: 70px;
  }
  .changeDate{
    display: flex;
    align-items: center;
    height: 100%;
    color: #00FFF0;
    font-size: 45px;
    margin-left: auto;
    .firstOption{
      height: 75px;
      width: 130px;
      background: url("@/assets/img/tab1.png") no-repeat center center; 
      text-align: center;
      cursor: pointer;
      line-height: 75px;
    }
    .secondOption{
      height: 75px;
      width: 130px;
      background: url("@/assets/img/tab2.png") no-repeat center center; 
      text-align: center;
      line-height: 75px;
      cursor: pointer;
    }
  }
}
</style>
