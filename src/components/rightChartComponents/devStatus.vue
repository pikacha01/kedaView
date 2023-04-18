<script setup lang="ts">
import {} from 'vue'
import ChartTitle from '../chartTitle.vue';

</script>

<template>
  <div class="devStatus">
    <ChartTitle title="设备工况统计" />
    <div class="box">
      <div class="chart" :id="`proChart`">
      </div>
      
    </div>
  </div>
</template>

<style scoped lang="less">
.devStatus {
  width: 1500px;
  height: 820px;
  .box{
    margin-top: 100px;
    width: 350px;
    .chart {
      width: 100%; 
      background: url("@/assets/img/设备工况统计1.png");
      height: 350px;
    }
  }
}
</style>
