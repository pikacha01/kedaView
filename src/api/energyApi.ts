import request from "./request"
import { title,kpi, stationList, realTimePower, energyContribute ,date, VolumeCapacity, operationManage,devStatus,weather} from '@/api/data'

// 获取电站位置
export const getStationListApi = (start: string, end: string) => {
  return request<stationList>(`/heimaEnergy/plantList/${start}/${end}`, 'POST')
}

// 获取实时功率
export const getEnergyPowerApi = (stationId: number) => {
  return request<realTimePower[]>('/heimaEnergy/power/'+stationId)
}
// 获取实时功率
export const getEnergyHourApi= (stationId: number) => {
  return request<realTimePower[]>('/heimaEnergy/energy/'+stationId)
}
// 获取实时PR
export const getPRApi = (stationId: number) => {
  return request<realTimePower[]>('/heimaEnergy/pr/'+stationId)
}
// 获取社会贡献
export const getContributeApi = (stationId: number) => {
  return request<energyContribute>('/heimaEnergy/contribute/'+stationId)
}
// 发电量排名
export const getGenerateElectricityApi= (type : date) => {
  return request<realTimePower[]>(`/heimaEnergy/energyReport/${type}`)
}
//获取警报统计
export const getalarmReportApi = (type: date,stationId: number) => {
  return request<realTimePower[]>(`/heimaEnergy/alarmReport/${type}/${stationId}`)
}
// 获取电站容量
export const getVolumeApi = (stationId: number) => {
  return request<VolumeCapacity>(`/heimaEnergy/volume/${stationId}`)
}
// 获取电站工单
export const getStationWorkOrderApi = (stationId: number) => {
  return request<operationManage>(`/heimaEnergy/workOrder/${stationId}`)
}
//获取设备工况
export const getdevStatusApi = (stationId: number) => {
  return request<devStatus>(`/heimaEnergy/devStatus/${stationId}`)
}
// 获取24小时实时功率
export const getKpiApi = (stationId: number) => {
  return request<kpi>(`/heimaEnergy/kpi/${stationId}`)
}
//获取15小时等效小时
export const getHourApi = (stationId: number) => {
  return request<realTimePower[]>(`/heimaEnergy/phour/${stationId}`)
}
// 获取标题
export const getTitleApi = () => {
  return request<title>('/heimaEnergy/screenTitle')
}
// 获取当前城市天气
export const getWeatherApi = (code:number) => {
  return request<weather>(`/heimaEnergy/weather/${code}`)
}