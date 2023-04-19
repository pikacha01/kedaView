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
      start: 0,
      end: 0,
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
      const res = await getStationListApi('0','100')
      stationListData.value.data = res.data
      stationListData.value.start = res.start
      stationListData.value.end = res.end
      stationListData.value.total = res.total
    }
    return {stationListData ,getStationList,stationList}
  }
)