import request from "./request"
import { title,kpi, stationList, realTimePower, energyContribute ,date, VolumeCapacity, operationManage,devStatus} from '@/api/data'
// 获取电站位置
export const getStationListApi = (start: string, end: string) => {
  return request<stationList>(`/energy/plantList/${start}/${end}`, 'POST')
}

// 获取实时功率
export const getEnergyPowerApi = () => {
  return request<realTimePower[]>('/energy/power')
}
// 获取实时功率
export const getEnergyHourApi= () => {
  return request<realTimePower[]>('/energy/energy/0')
}
// 获取实时PR
export const getPRApi = () => {
  return request<realTimePower[]>('/energy/pr/0')
}
// 获取社会贡献
export const getContributeApi = () => {
  return request<energyContribute>('/energy/contribute/0')
}
// 发电量排名
export const getGenerateElectricityApi= (type : date) => {
  return request<realTimePower[]>(`/energy/energyReport/${type}`)
}
//获取警报统计
export const getalarmReportApi = (type: date) => {
  return request<realTimePower[]>(`/energy/alarmReport/${type}/0`)
}
// 获取电站容量
export const getVolumeApi = () => {
  return request<VolumeCapacity>(`/energy/volume/0`)
}
// 获取电站工单
export const getStationWorkOrderApi = () => {
  return request<operationManage>(`/energy/workOrder/0`)
}
//获取设备工况
export const getdevStatusApi = () => {
  return request<devStatus>(`/energy/devStatus/0`)
}
// 获取24小时实时功率
export const getKpiApi = () => {
  return request<kpi>(`/energy/kpi/0`)
}
//获取15小时等效小时
export const getHourApi = () => {
  return request<realTimePower[]>('/energy/phour/0')
}
// 获取标题
export const getTitleApi = () => {
  return request<title>('/energy/screenTitle')
}