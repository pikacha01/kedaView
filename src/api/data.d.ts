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

// 实时功率
export interface realTimePower {
  title: string
  value: string
}
// 社会贡献
export interface energyContribute {
  co2Total: number,
  co2Year: number,
  coalTotal: number,
  coalYear: number,
  treeTotal: number,
  treeYear: number
}