import request from "./request"
import { stationList, realTimePower, energyContribute ,date} from '@/api/data'
// 获取电站位置
export const getStationListApi = (start: string, end: string) => {
  return request<stationList>(`/energy/plantList/${start}/${end}`, 'POST')
}

// 获取实时功率
export const getEnergyPhourApi = () => {
  return request<realTimePower[]>('/energy/phour')
}
// 获取实时PR
export const getPRApi = () => {
  return request<realTimePower[]>('/energy/pr')
}
// 获取社会贡献
export const getContributeApi = () => {
  return request<energyContribute>('/energy/contribute')
}
// 发电量排名
export const getGenerateElectricityApi= (type : date) => {
  return request<realTimePower[]>(`/energy/energyReport/${type}`)
}
//获取
export const getalarmReportApi = (type: date) => {
  return request<realTimePower[]>(`/energy/alarmReport/${type}`)
}