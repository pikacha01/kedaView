import { defineStore } from 'pinia'
import { ref } from 'vue'
import { realTimePower, energyContribute } from "@/api/data"
import { getEnergyPhour, getPR, getContribute } from "@/api/energyApi"
export const headerDataStore = defineStore(
  'header-store',
  () => {
    const poverRealTime = ref<realTimePower[]>([])
    const energyContribute = ref<energyContribute>()
    const getPoverRealTime = async () => {
      const res = await getEnergyPhour()
      const data = await getPR()
      
    }

    const getContributeData = async () => {
      const contribute = await getContribute()
      energyContribute.value = contribute
    }
    return {poverRealTime,getPoverRealTime,energyContribute,getContributeData}
  }
)