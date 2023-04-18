<script setup lang="ts">
import { onMounted ,} from 'vue'
import DevStatus from '@/components/rightChartComponents/devStatus.vue';
import { rightDataStore } from '@/store'
const store = rightDataStore()

onMounted(() => {
  store.getDevStatus()
})
</script>

<template>
  <div class="rightChart addZIndex">
    <DevStatus />
  </div>
</template>

<style scoped lang="less">
.rightChart{
  position: absolute;
  top: 10%;
  right: 1%;
}
</style>
