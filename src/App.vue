<script setup lang="ts">
import Home from './views/index.vue'
import ScaleBox from '@/components/scaleBox.vue'
import { onMounted,onUnmounted } from 'vue'
import { mapDataStore,leftDataStore,rightDataStore,headerDataStore,bottomDataStore } from '@/store'
const leftStore = leftDataStore()
const rightStore = rightDataStore()
const headerStore = headerDataStore()
const bottomStore = bottomDataStore()
const mapStore = mapDataStore()

let time : any = null
onMounted(() => {
  time = setInterval(() => {
    bottomStore.getGenerateElectricity()
    bottomStore.getWorkOrder()
    bottomStore.getVolume()
    bottomStore.getHourElectric()
    bottomStore.getPR()
    leftStore.getContributeData()
    leftStore.getPRdata()
    leftStore.getalarmReport()
    rightStore.getAlarmReport()
    rightStore.getDevStatus()
    mapStore.stationListData.data = []
    mapStore.stationListData.start= 0
    mapStore.stationListData.end = 50
    mapStore.getStationList()
    headerStore.getTitle()
  },1000*60*60)
})
onUnmounted(() => {
  window.clearInterval(time)
  time = null
})
</script>

<template>
  <ScaleBox>
    <Home></Home>
  </ScaleBox>
</template>

<style scoped>
</style>
