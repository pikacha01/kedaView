import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getdevStatusApi,getalarmReportApi } from '@/api/energyApi'
import { devStatus,pieData } from '@/api/data'

export const rightDataStore = defineStore(
  'right-store',
  () => {
    // 设备工况统计
    const devStatusData = ref<pieData[][]>([])
    const devStatusTotal = ref<number>(0)
    const getDevStatus = async (stationId:number) => {
      const res = await getdevStatusApi(stationId)
      if (devStatusData.value.length === 0) {
        devStatusData.value.push([{
          name: "正常设备",
          value: res.normal
        }, {
          name: "总和",
          value: res.total - res.normal
        }])
        devStatusData.value.push([{
          name: "离线设备",
          value: res.offline
        },{
          name: "总和",
          value: res.total - res.offline
        }])
        devStatusData.value.push([{
          name: "告警设备",
          value: res.alarm
        },{
          name: "总和",
          value: res.total - res.alarm
        }])
      } else {
        devStatusData.value[0][0] = {
          name: "正常设备",
          value: res.normal
        }
        devStatusData.value[1][0].value = res.offline
        devStatusData.value[2][0].value = res.alarm
        devStatusData.value[0][1].value = res.total - res.normal
        devStatusData.value[1][1].value = res.total - res.offline
        devStatusData.value[2][1].value = res.total - res.alarm
        devStatusData.value =  devStatusData.value
      }
      
      devStatusTotal.value = res.total
    }

    // 设备告警趋势
    const alarmxData = ref<string[]>([])
    // 日数据
    const alarmyDataDay = ref<string[]>([])
    // 月份数据
    const alarmyDataMonth = ref<string[]>([])
    const type = ref<number>(3)
    const regex = /(\d{4})-(\d{2})-(\d{2})/;
    const getAlarmReport = async (stationId:number) => {
      const tempX : string[] =  []
      const tempY : string[] =  []
      const tempYDay : string[] =  []
      const data = await getalarmReportApi(3,stationId)
      const res = await getalarmReportApi(2,stationId)
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
      res.forEach(item => {
        tempYDay.push(item.value)
      })
      alarmxData.value = tempX
      alarmyDataMonth.value = tempY
      alarmyDataDay.value = tempYDay
    }

    return {
      getDevStatus, devStatusData, devStatusTotal, alarmxData, alarmyDataMonth,
      getAlarmReport,type,alarmyDataDay
    }
  }
)