import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getdevStatusApi,getalarmReportApi } from '@/api/energyApi'
import { devStatus,pieData } from '@/api/data'

export const rightDataStore = defineStore(
  'right-store',
  () => {
    // 设备工况统计
    const devStatusData = ref<pieData[]>([])
    const devStatusTotal = ref<number>(0)
    const getDevStatus = async () => {
      devStatusData.value = []
      devStatusTotal.value = 0
      const res = await getdevStatusApi()
      devStatusData.value.push({
        name: "正常设备",
        value: res.normal
      })
      devStatusData.value.push({
        name: "离线设备",
        value: res.offline
      })
      devStatusData.value.push({
        name: "告警设备",
        value: res.alarm
      })
      devStatusTotal.value = res.total
    }

    // 设备告警趋势
    const alarmxData = ref<string[]>([])
    const alarmyData = ref<string[]>([])
    const type = ref<number>(3)
    const regex = /(\d{4})-(\d{2})-(\d{2})/;
    const getAlarmReport = async () => {
      alarmxData.value = []
      alarmyData.value = []
      const data = await getalarmReportApi(type.value)
      data.forEach(item=> {
        const match = regex.exec(item.title);
        const day = match![3]
        alarmxData.value.push(day)
        alarmyData.value.push(item.value)
      })
    }

    return {
      getDevStatus, devStatusData, devStatusTotal, alarmxData, alarmyData,
      getAlarmReport,type
    }
  }
)