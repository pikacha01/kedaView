<script setup lang="ts">
import {} from 'vue'
defineProps<{
   title: string, 
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
  </div>
</template>

<style scoped lang="less">
.charTitle {
  display: flex;
  align-items: center;
  .title{
    font-weight: 400;
    display: flex;
    font-size: 56px;
    font-family: HRegular;
    align-items: center;
    color: #fff;
    .text{
      margin-left: 25px;
      padding-bottom: 15px;
    }
  }
}
</style>
