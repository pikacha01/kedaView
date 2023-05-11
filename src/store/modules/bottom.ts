import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getEnergyHourApi,getGenerateElectricityApi , getHourApi, getEnergyPowerApi,getVolumeApi,getStationWorkOrderApi } from "@/api/energyApi"
import { pieData } from "@/api/data"

export const bottomDataStore = defineStore("bottom-store", () => {

  // 发电量排行
  const generateXData = ref<string[]>()
  // 月数据
  const generateYData = ref<string[]>()
  // 年数据
  const generateXDataYear = ref<string[]>()
  // 3为月 4为年
  const getGenerateEnum = ref<number>(3)
  const getGenerateElectricity = async () => {
    const res =await  getGenerateElectricityApi(3)
    const data =await  getGenerateElectricityApi(4)
    generateXData.value = []
    generateYData.value = []
    generateXDataYear.value = []
    res.forEach(item => {
      generateXData.value?.unshift(item.value)
      generateYData.value?.unshift(item.title)
    })
    data.forEach(item => {
      generateXDataYear.value?.unshift(item.value)
    })
  }

  // 等效小时数
  const PRxData = ref<string[]>([])
  const PRyData = ref<string[]>([])
  const regex = /(\d{4})-(\d{2})-(\d{2})/;
  const getPR = async (stationId:number) => {
    const data = await getHourApi(stationId)
    PRxData.value = []
    PRyData.value = []
    data.forEach(item=> {
      const match = regex.exec(item.title);
      const day = match![3]
      PRxData.value.push(day)
      PRyData.value.push(item.value)
    })
  }

  // 24小时实时发电量
  const HourYData = ref<string[]>([])
  const HourXData = ref<string[]>([])
  const pattern =  /\b(\d{2}):/;
  const getHourElectric = async (stationId:number) => {
    const res = await getEnergyHourApi(stationId)
    HourXData.value = []
    HourYData.value = []
    res.forEach(item=> {
      const match = item.title.match(pattern)
      const day = match![1]
      HourXData.value.push(day)
      HourYData.value.push(item.value)
    })
  }

  // 实时发电功率
  const PowerX = ref<string[]>([])
  const PowerY = ref<string[]>([])
  const getEnergyPower = async (stationId:number) => {
    const res = await getEnergyPowerApi(stationId)
    PowerX.value = []
    PowerY.value = []
    res.forEach(item=> {
      const match = item.title.match(pattern)
      const day = match![1]
      PowerX.value.push(day)
      PowerY.value.push(item.value)
    })
  }


  // 获取饼图需要数据的方法
  function array2obj(array : pieData[], key:keyof pieData) {
    var resObj:any = {};
    for (var i = 0; i < array.length; i++) {
        resObj[array[i][key]] = array[i];
    }
    return resObj;
  }
  
  function getArrayValue(array: pieData[], key:keyof pieData) {
    var key = key || "value";
    var res:any = [];
    if (array) {
        array.forEach(function(t:any) {
            res.push(t[key]);
        });
    }
    return res;
  }
  function getData(data: pieData[], sumValue: number) {
    let res:{series:any,yAxis:any} = {
        series: [],
        yAxis: []
    };
    for (let i = 0; i < data.length; i++) {
        res.series.push({
            name: '',
            type: 'pie',
            clockWise: false, //顺时加载
            hoverAnimation: false, //鼠标移入变大
            radius: [73 - i * 15 + '%', 68 - i * 15 + '%'],
            center: ["30%", "55%"],
            label: {
                show: false
            },
            itemStyle: {
                label: {
                    show: false,
                },
                labelLine: {
                    show: false
                },
                borderWidth: 5,
            },
            data: [{
                // value: data[i].value * 0.75,
                value: data[i].value,
                name: data[i].name
            }, {
                value: sumValue - (data[i].value * 0.75),
                name: '',
                itemStyle: {
                    color: "rgba(0,0,0,0)",
                    borderWidth: 0
                },
                tooltip: {
                    show: false
                },
                hoverAnimation: false
            }]
        });
        res.series.push({
            name: '',
            type: 'pie',
            silent: true,
            z: 1,
            clockWise: false, //顺时加载
            hoverAnimation: false, //鼠标移入变大
            radius: [73 - i * 15 + '%', 68 - i * 15 + '%'],
            center: ["30%", "55%"],
            label: {
                show: false
            },
            itemStyle: {
                label: {
                    show: false,
                },
                labelLine: {
                    show: false
                },
                borderWidth: 5,
            },
            data: [{
                value: 7.5,
                itemStyle: {
                    color: "rgb(3, 31, 62)",
                    borderWidth: 0
                },
                tooltip: {
                    show: false
                },
                hoverAnimation: false
            }, {
                value: 2.5,
                name: '',
                itemStyle: {
                    color: "rgba(0,0,0,0)",
                    borderWidth: 0
                },
                tooltip: {
                    show: false
                },
                hoverAnimation: false
            }]
        });
        res.yAxis.push((data[i].value / sumValue * 100).toFixed(2) + "%");
    }
    return res;
  }
  

  // 获取电站容量
  const volumeValue = ref<pieData[]>([])
  const sumValue = ref<number>(0)
  const objData = ref<any>()
  const arrName = ref<any>()
  const optionData = ref<any>()
  const capacity  = ref<number>(0)
  const getVolume =async  (stationId:number) => {
    const res = await getVolumeApi(stationId)
    volumeValue.value = []
    volumeValue.value.push({
      name: "并网容量",
      value: res.installVolume
    })
    volumeValue.value.push({
      name: "在建容量",
      value: res.buildVolume
    })
    volumeValue.value.push({
      name: "未建容量",
      value: res.unbuildVolume
    })
    capacity.value = res.installVolume
    sumValue.value = volumeValue.value.reduce((acc,cur) => acc + cur.value,0)
    objData.value = array2obj(volumeValue.value, "name")
    arrName.value = getArrayValue(volumeValue.value, "name");
    optionData.value = getData(volumeValue.value,sumValue.value)
  }

  // 获取工单
  const workOrder = ref<pieData[]>([])
  const workOrderName = ref<string[]>([])
  const sumValueOrderName = ref<number>(0)
  const objDataWorkeOrder = ref<any>()
  const percentageComplete = ref<string>('')
  const getWorkOrder = async (stationId:number) => {
    const temp:pieData[] = []
    const res = await getStationWorkOrderApi(stationId)
    temp.push({
      name: "待处理工单",
      value: res.pending
    })
    temp.push({
      name: "处理中工单",
      value: res.processing
    })
    temp.push({
      name: "已处理工单",
      value: res.processed
    })
    temp.push({
      name: "已关闭工单",
      value: res.close
    })
    workOrder.value = temp
    
    sumValueOrderName.value = workOrder.value.reduce((acc, cur) => acc + cur.value, 0)
    if (!res.goodCount || !res.processed) {
      percentageComplete.value = "0"
    } else {
      percentageComplete.value = ((res.goodCount / res.processed) * 100).toFixed(2)
    }
    workOrderName.value = getArrayValue(workOrder.value, "name")
    objDataWorkeOrder.value = array2obj(workOrder.value, "name")
  }
  
  return {
    generateXData, generateYData, getGenerateEnum, getGenerateElectricity,percentageComplete,capacity,PowerX,PowerY,
    getPR, HourYData, PRyData, PRxData, getVolume, volumeValue, sumValue, objData, getHourElectric,getEnergyPower,
    arrName,optionData,getWorkOrder,workOrderName,workOrder,objDataWorkeOrder,sumValueOrderName,HourXData,generateXDataYear
  }
})