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
      const res = await getdevStatusApi()
      if (devStatusData.value.length === 0) {
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
      } else {
        devStatusData.value[0].value = res.normal
        devStatusData.value[1].value = res.offline
        devStatusData.value[2].value = res.alarm
        devStatusData.value =  devStatusData.value
      }
      
      devStatusTotal.value = res.total
    }

    // 设备告警趋势
    const alarmxData = ref<string[]>([])
    const alarmyData = ref<string[]>([])
    const type = ref<number>(3)
    const pattern =  /\b(\d{2}):/;
    const regex = /(\d{4})-(\d{2})-(\d{2})/;
    const getAlarmReport = async () => {
      const tempX : string[] =  []
      const tempY : string[] =  []
      const data = await getalarmReportApi(type.value)
      data.forEach(item => {
        let day =''
        if (type.value === 3) {
          day = item.title.slice(5,7)
        } else {
          const match = regex.exec(item.title);
          day = match![3]
        }
        tempX.push(day)
        tempY.push(item.value)
      })
      alarmxData.value = tempX
      alarmyData.value = tempY
    }

    return {
      getDevStatus, devStatusData, devStatusTotal, alarmxData, alarmyData,
      getAlarmReport,type
    }
  }
)