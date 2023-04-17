import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getGenerateElectricityApi , getPRApi, getEnergyPhourApi } from "@/api/energyApi"
import {  } from "@/api/data"

export const bottomDataStore = defineStore("bottom-store", () => {

  // 发电量排行
  const generateXData = ref<string[]>()
  const generateYData = ref<string[]>()
  const getGenerateEnum = ref<number>(3)
  const getGenerateElectricity = async () => {
    generateXData.value = []
    generateYData.value = []
    const res =await  getGenerateElectricityApi(getGenerateEnum.value)
    res.forEach(item => {
      generateXData.value?.push(item.value)
      generateYData.value?.push(item.title)
    })
  }

  // 能效PR
  const PRxData = ref<string[]>([])
  const PRyData = ref<string[]>([])
  const HourYData = ref<string[]>([])
  const regex = /(\d{4})-(\d{2})-(\d{2})/;
  const getPR = async () => {
    PRxData.value = []
    PRyData.value = []
    HourYData.value = []
    const data = await getPRApi()
    const res = await getEnergyPhourApi()
    data.forEach(item=> {
      const match = regex.exec(item.title);
      const day = match![3]
      PRxData.value.push(day)
      PRyData.value.push(item.value)
    })
    res.forEach(item => HourYData.value?.push(item.value))
  }

  return {
    generateXData, generateYData, getGenerateEnum, getGenerateElectricity,
    getPR,HourYData,PRyData,PRxData
    
  }
})