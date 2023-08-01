import { defineStore } from 'pinia'
import { ref } from 'vue'
import { energyContribute, kpi } from "@/api/data"
import { getContributeApi,getKpiApi,getTitleApi } from "@/api/energyApi"
export const headerDataStore = defineStore(
  'header-store',
  () => {
    const energyContribute = ref<energyContribute>()
    // 获取社会贡献
    const getContributeData = async (stationId:number) => {
      const contribute = await getContributeApi(stationId)
      energyContribute.value = contribute
    } 

    // 获取24小时实时功率
    const HourKpi = ref<kpi>({
      energyMonth: "0",
      energyQuarter: "0",
      energyToday: "0",
      energyTotal: "0",
      energyYear: "0",
      maxPowerToday: "0",
      maxPowerYesterday: "0",
      powerNow: "0",
    })
    const getKpi = async (stationId:number) => {
      const res = await getKpiApi(stationId)
      HourKpi.value = res
    }

    // 获取大屏标题
    const titleContent = ref<string>('逐意云智慧能源智能管控系统')
    const getTitle = async () => {
      // const res = await getTitleApi()
      titleContent.value = '逐意云智慧能源智能管控系统'
    }

    return {energyContribute,getContributeData,getKpi,HourKpi,getTitle,titleContent }
  }
)