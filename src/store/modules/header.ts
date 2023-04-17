import { defineStore } from 'pinia'
import { ref } from 'vue'
import { realTimePower, energyContribute } from "@/api/data"
import { getEnergyPhourApi, getPRApi, getContributeApi } from "@/api/energyApi"
export const headerDataStore = defineStore(
  'header-store',
  () => {
    const poverRealTime = ref<realTimePower[]>([])
    const energyContribute = ref<energyContribute>()
    const getPoverRealTime = async () => {
      const res = await getEnergyPhourApi()
      const data = await getPRApi()
      
    }

    const getContributeData = async () => {
      const contribute = await getContributeApi()
      energyContribute.value = contribute
    }
    return {poverRealTime,getPoverRealTime,energyContribute,getContributeData}
  }
)