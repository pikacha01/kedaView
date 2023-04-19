import { defineStore } from 'pinia'
import { ref } from 'vue'
import { realTimePower, energyContribute } from "@/api/data"
import { getEnergyPhourApi, getPRApi, getContributeApi } from "@/api/energyApi"
export const headerDataStore = defineStore(
  'header-store',
  () => {
    const energyContribute = ref<energyContribute>()

    const getContributeData = async () => {
      const contribute = await getContributeApi()
      energyContribute.value = contribute
    }
    return {energyContribute,getContributeData}
  }
)