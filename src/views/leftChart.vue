<script setup lang="ts">
import {} from 'vue'
import SocialContribution from '@/components/leftChartComponents/socialContribution.vue';
import StationHealthy from '@/components/leftChartComponents/stationHealthy.vue';
</script>

<template>
  <div class="leftChart addZIndex">
    <SocialContribution />
    <!-- <StationHealthy /> -->
  </div>
</template>

<style scoped lang="less">
.leftChart{
  position: absolute;
  top: 10%;
  left: 1%;
}
</style>
