import { defineStore } from 'pinia'
import { ref } from 'vue'
import {  getPRApi, getContributeApi,getdevStatusApi } from "@/api/energyApi"
import {  energyContributeList } from "@/api/data"

export const leftDataStore = defineStore(
  'left-store',
  () => {
    // 社会贡献
    const energyContribute = ref<energyContributeList[]>([{
        yearData: 243.44,
        total: 0,
        title: "节约标煤(吨)",
        image:"/hmenergyview/img/社会贡献2.png"
      },{
        yearData: 892.24,
        total: 0,
        title:"CO2减排量(吨)",
        image:"/hmenergyview/img/社会贡献3.png"
      },{
        yearData: 0.67,
        total: 0,
        title: "等效植树量(棵)",
        image:"/hmenergyview/img/社会贡献4.png"
      }
    ])
    const getContributeData = async (stationId:number) => {
      const contribute = await getContributeApi(stationId)
      // energyContribute.value[0].yearData = contribute.coalYear as number
      energyContribute.value[0].total = contribute.coalTotal as number
      // energyContribute.value[1].yearData = contribute.co2Year as number
      energyContribute.value[1].total = contribute.co2Total as number
      // energyContribute.value[2].yearData = contribute.treeYear as number
      energyContribute.value[2].total = contribute.treeTotal as number
    }

    // 能效PR
    const PRTitle = ref<string[]>([])
    const PRValue = ref<string[]>([])
    const regex = /(\d{4})-(\d{2})-(\d{2})/;
    // PR进度条
    const PRProgress = ref<number>(0)
    const getPRdata = async (stationId:number) => {
      const tempX:string[] = [] 
      const tempY: string[] = [] 
      const res = await getPRApi(stationId)
      res.forEach(item => {
        const match = regex.exec(item.title);
        const day = match![3]
        tempX.push(day)
        tempY.push(item.value)
      })
      for (let i = res.length - 1; i >= 0; i--){
        if (Number(res[i].value) > 0) {
          PRProgress.value = Number(res[i].value)
          break
        }
        if (i === 0) {
          PRProgress.value = Number(res[i].value)
        }
      }
      if (tempX.length !== 0) {
        PRTitle.value = tempX
        PRValue.value = tempY
      }
    }

    // 获取警报统计
    const alarmReport = ref(0)
    const getalarmReport = async (stationId:number) => {
      // 昨日警报
      const res = await getdevStatusApi(stationId)
      alarmReport.value = 100 - res.alarm  / res.total * 100
    }


    return {
       energyContribute, getContributeData, getPRdata
      ,PRTitle,PRValue,getalarmReport,alarmReport,PRProgress}
  }
)