import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getdevStatusApi } from '@/api/energyApi'
import { devStatus } from '@/api/data'

export const rightDataStore = defineStore(
  'right-store',
  () => {
    // 设备工况统计
    const devStatusData = ref<devStatus>()
    const devStatusTotal = ref<number>(0)
    const getDevStatus = async () => {
      const res = await getdevStatusApi()
      devStatusData.value = res 
    }

    return { getDevStatus,devStatusData }
  }
)