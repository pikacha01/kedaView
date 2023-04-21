<script setup lang="ts">
import {} from 'vue'
import ElectricityRank from '@/components/bottomChartComponents/electricityRank.vue';
import RPefficiency from '@/components/bottomChartComponents/RPefficiency.vue';
import RealTimePower from '@/components/bottomChartComponents/RealTimePower.vue';
import PowerStationCapacity from '@/components/bottomChartComponents/powerStationCapacity.vue';
import OperationManage from '@/components/bottomChartComponents/operationManage.vue'
import RealTime from '@/components/bottomChartComponents/realTime.vue';
</script>

<template>
  <div class="bottomAllChart addZIndex">
    <ElectricityRank />
    <RPefficiency />
    <RealTimePower />
    <RealTime />
    <!-- <PowerStationCapacity /> -->
    <OperationManage />
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
