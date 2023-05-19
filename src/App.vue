<script setup lang="ts">
import Home from './views/index.vue'
import ScaleBox from '@/components/scaleBox.vue'
import { onMounted,onUnmounted,watch } from 'vue'
import { mapDataStore, leftDataStore, rightDataStore, headerDataStore, bottomDataStore } from '@/store'
import axios from 'axios'
const leftStore = leftDataStore()
const rightStore = rightDataStore()
const headerStore = headerDataStore()
const bottomStore = bottomDataStore()
const mapStore = mapDataStore()

let time : any = null
onMounted(async() => {
  time = setInterval(async () => {
    bottomStore.getGenerateElectricity()
    bottomStore.getEnergyPower(mapStore.selectStation)
    bottomStore.getWorkOrder(mapStore.selectStation)
    bottomStore.getVolume(mapStore.selectStation)
    bottomStore.getHourElectric(mapStore.selectStation)
    bottomStore.getPR(mapStore.selectStation)
    leftStore.getContributeData(mapStore.selectStation)
    leftStore.getPRdata(mapStore.selectStation)
    leftStore.getalarmReport(mapStore.selectStation)
    rightStore.getAlarmReport(mapStore.selectStation)
    rightStore.getDevStatus(mapStore.selectStation)
    headerStore.getKpi(mapStore.selectStation)
    mapStore.stationListData.data = []
    mapStore.stationListData.start= 0
    mapStore.stationListData.end = 50
    mapStore.getStationList()
    // headerStore.getTitle()
  }, 1000 * 60 * 60)



  watch(() => {
    return mapStore.selectStation
  }, () => {
    bottomStore.getEnergyPower(mapStore.selectStation)
    bottomStore.getWorkOrder(mapStore.selectStation)
    bottomStore.getVolume(mapStore.selectStation)
    bottomStore.getHourElectric(mapStore.selectStation)
    bottomStore.getPR(mapStore.selectStation)
    leftStore.getContributeData(mapStore.selectStation)
    leftStore.getPRdata(mapStore.selectStation)
    leftStore.getalarmReport(mapStore.selectStation)
    rightStore.getAlarmReport(mapStore.selectStation)
    rightStore.getDevStatus(mapStore.selectStation)
    headerStore.getKpi(mapStore.selectStation)
  })
  getCurrentWeather()
  
})
onUnmounted(() => {
  window.clearInterval(time)
  time = null
})
// 获取当前城市天气
const getCurrentWeather = async () => {
  const res = await axios.get("https://restapi.amap.com/v3/ip?key=fdae184fbb3a4af81f0147fd551ba7a7")
  mapStore.getCurrentWeather(res.data.adcode)
}

</script>

<template>
  <ScaleBox>
    <Home></Home>
  </ScaleBox>
</template>

<style scoped>
</style>
