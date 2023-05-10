// 获取电站列表
export interface stationListInfo  {
  lat: string,
  lon: string,
  name: string,
  volume: number,
  address: string,
  factory: string,
  health: string,
  sn: string,
  status: string,
  todayPower: string,
  totalPower: string,
  weather: string,
  weatherStatus: string,
  id: number
}
export interface stationList {
  data: stationListInfo[],
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
export interface energyContributeList {
  yearData: number,
  total: number,
  title: string,
  image: string
}

export enum date {
  1, //小时
  2, //天
  3, //月
  4 //年
}

// 电站容量
export interface VolumeCapacity {
  buildVolume: number;
  installVolume: number;
  unbuildVolume: number;
}
// 饼图接口
export interface pieData {
  name: string,
  value: number,
  [key?: string]: any; 
}

// 工单管理
export interface operationManage {
  close: number,
  pending: number,
  processed: number
  processing: number,
  goodCount: number
}

// 设备工况
export interface devStatus {
  alarm: number,
  normal: number,
  offline: number,
  total: number,
  [key: string]: number,
}

// 24小时功率
export interface kpi {
  energyMonth: string | number,
  energyQuarter: string | number,
  energyToday: string | number,
  energyTotal: string | number,
  energyYear: string | number,
  maxPowerToday: string | number,
  maxPowerYesterday: string | number,
  powerNow: string | number ,
  [key: string]: number | string,

}

export interface title{
  msg : string,
  status: number,
  data: string
}