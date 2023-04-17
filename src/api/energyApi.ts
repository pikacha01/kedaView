import request from "./request"
import {stationList} from '@/api/data'

export const getStationListApi = (start: string, end: string) => {
  return request<stationList>(`/energy/plantList/${start}/${end}`, 'POST')
}