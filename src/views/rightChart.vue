<script setup lang="ts">
import { onMounted ,} from 'vue'
import DevStatus from '@/components/rightChartComponents/devStatus.vue';
import AlarmReport from '@/components/rightChartComponents/alarmReport.vue';

</script>

<template>
  <div class="rightChart addZIndex">
    <DevStatus />
    <AlarmReport />
  </div>
</template>

<style scoped lang="less">
.rightChart{
  position: absolute;
  top: 10%;
  right: 1%;
}
</style>
