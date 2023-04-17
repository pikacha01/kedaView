import request from "./request"
import { stationList, realTimePower, energyContribute} from '@/api/data'
// 获取电站位置
export const getStationListApi = (start: string, end: string) => {
  return request<stationList>(`/energy/plantList/${start}/${end}`, 'POST')
}

// 获取实时功率
export const getEnergyPhour = () => {
  return request<realTimePower[]>('/energy/phour')
}
// 获取实时PR
export const getPR = () => {
  return request<realTimePower[]>('/energy/pr')
}
// 获取社会贡献
export const getContribute = () => {
  return request<energyContribute>('/energy/contribute')
}