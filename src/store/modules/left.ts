import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getEnergyPhour, getPR, getContribute } from "@/api/energyApi"
import {  energyContributeList,realTimePower } from "@/api/data"

export const leftDataStore = defineStore(
  'left-store',
  () => {
    const getPoverRealTime = async () => {
      const res = await getEnergyPhour()
      
    }
    // 社会贡献
    const energyContribute = ref<energyContributeList[]>([{
        yearData: 0,
        total: 0,
        title: "节约标煤(吨)",
        image:"src/assets/img/社会贡献2.png"
      },{
        yearData: 0,
        total: 0,
        title:"CO2减排量(吨)",
        image:"src/assets/img/社会贡献3.png"
      },{
        yearData: 0,
        total: 0,
        title: "等效植树量(棵)",
        image:"src/assets/img/社会贡献4.png"
      }
    ])
    const getContributeData = async () => {
      const contribute = await getContribute()
      energyContribute.value[0].yearData = contribute.coalYear as number
      energyContribute.value[0].total = contribute.coalTotal as number
      energyContribute.value[1].yearData = contribute.co2Year as number
      energyContribute.value[1].total = contribute.co2Total as number
      energyContribute.value[2].yearData = contribute.treeYear as number
      energyContribute.value[2].total = contribute.treeTotal as number
    }

    // 能效PR
    const PRTitle = ref<string[]>([])
    const PRValue = ref<string[]>([])
    const regex = /(\d{4})-(\d{2})-(\d{2})/;
    const getPRdata = async () => {
      PRTitle.value = []
      PRValue.value = []
      const res = await getPR()
      res.forEach(item => {
        const match = regex.exec(item.title);
        const day = match![3]
        PRTitle.value.push(day)
        PRValue.value.push(item.value)
      })
    }


    return {
      getPoverRealTime, energyContribute, getContributeData, getPRdata
      ,PRTitle,PRValue}
  }
)