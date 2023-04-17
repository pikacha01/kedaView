// 获取电站列表
export interface stationListInfo  {
    lat: string,
    lon: string,
    name: string,
    volume: number
}
export interface stationList {
  data?: stationListInfo[],
  end: number,
  start: number,
  total: number
}