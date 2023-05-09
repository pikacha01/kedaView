<script setup lang="ts">
import {} from 'vue'
defineProps<{
  title: string,
  subTitle?: string,
  firstOption?: string,
  secondOption?: string
  isChecked?: boolean
}>()
</script>

<template>
  <div class="charTitle">
    <div class="title">
      <div>
        <img src="@/assets/images/小标题修饰.png">
      </div>
      <div class="text">{{ title }}</div>
    </div>
    <div class="subTitle" v-if="subTitle">
      {{ subTitle }}
    </div>
    <div class="changeDate" >
      <div :style="`background: ${isChecked? '#006773' : '#014c55' };color: ${isChecked? '#00FFF0' : '#96D6E8' }`" class="firstOption" v-if="firstOption">{{ firstOption }}</div>
      <div :style="`background: ${!isChecked? '#006773' : '#014c55' } ; color: ${!isChecked? '#00FFF0' : '#96D6E8' }`"  class="secondOption" v-if="secondOption">{{ secondOption }}</div>
    </div>
  </div>
</template>

<style scoped lang="less">
.charTitle {
  display: flex;
  align-items: center;
  font-family: HRegular;
  width: 490px;
  .title{
    font-weight: 400;
    display: flex;
    font-size: 18px;
    align-items: center;
    height: 18px;
    color: #00FFF4;
    div{
      height: 18px;
      display: flex;
      align-items: center;
        img {
          line-height: 18px;
        }
    } 
    .text{
      margin-left: 10px;
      line-height: 18px;
    }
  }
  .subTitle{
    margin-left: 15px;
    color:#96D6E8;
    font-size: 18px;
    padding-left: 15px;
    border-left: 1px solid rgba(119, 124, 126, 0.5);;
    height: 18px;
    line-height: 18px;
  }
  .changeDate{
    display: flex;
    align-items: center;
    height: 100%;
    color: #00FFF0;
    font-size: 15px;
    margin-left: auto;
    .firstOption{
      height: 24px;
      width: 34px;
      text-align: center;
      line-height: 24px;
      border-radius: 6px 0px 0px 6px;
    }
    .secondOption{
      height: 24px;
      width: 34px;
      text-align: center;
      line-height: 24px;
      border-radius: 0px 6px 6px 0px;
    }
  }
}
</style>
