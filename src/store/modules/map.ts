import { defineStore } from 'pinia'
import { ref , computed} from 'vue'
import { getStationListApi,getWeatherApi } from '@/api/energyApi'
import {stationList,weather,stationListDetail} from '@/api/data'


export const mapDataStore = defineStore(
  'map-store',
  () => {
    const stationListData = ref<stationList>({
      data: [],
      start: 0,
      end: 50,
      total: 0
    })
    const stationList = computed(() => {
      const tempList : stationListDetail[] = []
      if (stationListData.value.data) {
        stationListData.value.data.forEach(item => {
          tempList.push({
            position: [item.lon, item.lat],
            name: item.name,
            volume: item.volume,
            address: item.address,
            factory: item.factory,
            health: item.health,
            sn: item.sn,
            status: item.status,
            todayPower: item.todayPower,
            totalPower: item.totalPower,
            id: item.id,
            weather: item.weather,
            weatherStatus: item.weatherStatus,
            pic: item.pic
          })
        })
      }
      return tempList
    })
    const getStationList =async () => {
      const res = await getStationListApi('' + stationListData.value.start, '' + stationListData.value.end)
      res.data?.forEach(item => {
        if (item.address === '广东省佛山市顺德区万家乐热水厨电科技产业园') {
          stationListData.value.data?.push(item)
        }
      })
      stationListData.value.start = res.start
      stationListData.value.end = res.end
      stationListData.value.total = res.total
      // if (stationListData.value.data!.length < stationListData.value.total) {
      //   stationListData.value.start += 20
      //   stationListData.value.end += 20
      //   getStationList()
      // }
      if (stationListData.value.data.length === 0) {
        stationListData.value.start += 20
        stationListData.value.end += 20
        getStationList()
      }
    }

    // 选择电站 默认为0 0为全部
    const selectStation = ref<any>("859916425202499587")

    // 当前城市天气
    const currentWeather = ref<weather>()
    // 展示的天气
    const showWeather = ref<weather>()

    // 获取当前城市天气 
    const getCurrentWeather =async (code: number) => {
      const res = await getWeatherApi(code) 
      currentWeather.value = res
      showWeather.value = res
    }
    return {stationListData ,getStationList,stationList,selectStation,getCurrentWeather,showWeather,currentWeather}
  }
)