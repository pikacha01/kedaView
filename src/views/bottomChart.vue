<script setup lang="ts">
import {} from 'vue'
import ElectricityRank from '@/components/bottomChartComponents/electricityRank.vue';
import RPefficiency from '@/components/bottomChartComponents/RPefficiency.vue';
</script>

<template>
  <div class="bottomAllChart addZIndex">
    <ElectricityRank />
    <RPefficiency />
  </div>
</template>

<style scoped lang="less">
.bottomAllChart {
  position: absolute;
  width: 100%;
  height: 800px;
  bottom: 5%;
  display: flex;
  align-items: center;
}
</style>
