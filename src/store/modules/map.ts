import { defineStore } from 'pinia'
import { ref , computed} from 'vue'
import { getStationListApi } from '@/api/energyApi'
import {stationList,stationListInfo} from '@/api/data'
interface stationListDetail {
  position: string[],
  name: string,
  volume: number,
  address: string,
  factory: string,
  health: string,
  sn: string,
  status: string,
  todayPower: string,
  totalPower: string
}

export const mapDataStore = defineStore(
  'map-store',
  () => {
    const stationListData = ref<stationList>({
      data: [],
      start: 0,
      end: 20,
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
            totalPower: item.totalPower
          })
        })
      }
      return tempList
    })
    const getStationList =async () => {
      const res = await getStationListApi(''+stationListData.value.start,''+stationListData.value.end)
      res.data?.forEach(item => {
        stationListData.value.data?.push(item)
      })
      stationListData.value.start = res.start
      stationListData.value.end = res.end
      stationListData.value.total = res.total
      console.log(stationListData.value.start)
      console.log(stationListData.value.end)
      if (stationListData.value.data!.length < stationListData.value.total) {
        stationListData.value.start += 20
        stationListData.value.end += 20
        getStationList()
      }
    }
    return {stationListData ,getStationList,stationList}
  }
)