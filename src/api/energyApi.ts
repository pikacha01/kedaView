import request from "./request"
// 获取电站列表
interface stationList {
    data: [
      {
        lat: string,
        lon: string,
        name: string
      }
    ],
    end: number,
    start: number,
    total: number
}

export const getStationList = (start: string, end: string) => {
  return request<stationList>(`/energy/plantList/${start}/${end}`, 'POST')
}