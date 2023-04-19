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