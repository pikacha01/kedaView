<script setup lang="ts">
import { onMounted } from 'vue'
import { headerDataStore,bottomDataStore,leftDataStore,mapDataStore } from '@/store'

const store = headerDataStore()
const bottomStore = bottomDataStore()
const leftStore = leftDataStore()
const mapStpre = mapDataStore()

onMounted(() => {
  bottomStore.getVolume(mapStpre.selectStation)
  store.getKpi(mapStpre.selectStation)
})
</script>

<template>
  <div class="bodyContainer addZIndex">
    <div class="power">
      <div class="bottom">
        <div class="first">
          <div class="nomalFont">实时功率</div>
          <div class="nomalFont">{{ Number(store.HourKpi?.powerNow) > 10000 ? '万' : '' }}KW</div>
          <div>
            <span class="numberFont FontColor">{{ Number(store.HourKpi?.powerNow) > 10000? (Number(store.HourKpi?.powerNow)/10000).toFixed(2)  : (Number(store.HourKpi?.powerNow)).toFixed(2) }}</span>
          </div>
        </div>
        <div class="second">
          <div class="nomalFont">能效PR</div>
          <div class="nomalFont">%</div>
          <div>
            <span class="numberFont">{{ leftStore.PRProgress.toFixed(2) }} </span>
          </div>
        </div>
        <div class="third">
          <div class="nomalFont">当日最大功率</div>
          <div class="nomalFont">{{ Number(store.HourKpi?.maxPowerToday) > 10000 ? '万' : '' }}kW</div>
          <div>
            <span class="numberFont ">{{ Number(store.HourKpi?.maxPowerToday) > 10000? (Number(store.HourKpi?.maxPowerToday)/10000).toFixed(2) : (Number(store.HourKpi?.maxPowerToday)).toFixed(2)}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="electron">
      <div class="bottom">
        <div class="first">
          <div class="nomalFont">当日电量</div>
          <div class="nomalFont">{{ Number(store.HourKpi?.energyToday) > 10000 ? '万' : '' }}kwh</div>
          <div>
            <span class="numberFont FontColor">{{ Number(store.HourKpi?.energyToday) > 10000? (Number(store.HourKpi?.energyToday)/10000).toFixed(2) : (Number(store.HourKpi?.energyToday)/10000).toFixed(2)}}</span>
          </div>
        </div>
        <div class="second">
          <div class="nomalFont">当月电量</div>
          <div class="nomalFont">{{ Number(store.HourKpi?.energyMonth) > 10000 ? '万' : '' }}kwh</div>
          <div>
            <span class="numberFont">{{ Number(store.HourKpi?.energyMonth) > 10000? (Number(store.HourKpi?.energyMonth)/10000).toFixed(2) : (Number(store.HourKpi?.energyMonth)/10000).toFixed(2)}}</span>
          </div>
        </div>
        <div class="third">
          <div class="nomalFont">当年电量</div>
          <div class="nomalFont">{{ Number(store.HourKpi?.energyYear) > 10000 ? '万' : '' }}kwh</div>
          <div>
            <span class="numberFont">{{ Number(store.HourKpi?.energyYear) > 10000? (Number(store.HourKpi?.energyYear)/10000).toFixed(2) : (Number(store.HourKpi?.energyYear)/10000).toFixed(2)}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.bodyContainer{
  position: absolute;
  left: 50%;
  top: 20%;
  transform: translate(-50%, -50%);
  display: flex;
  .power{
    width: 342px;
    height: 96px;
    background-color: rgba(4, 53, 64, 0.8);
    margin-right: 15px;
    text-align: center;
  }
  .electron {
    width: 342px;
    height: 96px;
    margin-left: 15px;
    background-color: rgba(4, 53, 64, 0.8);
  }
    .center{
      width: 100%;
      text-align: center;
    }
    .bottom{
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      text-align: center;
    }
  .nomalFont{
    font-family: "Light";
    font-size: 15px;
    color: #96d6e8;
  }
  .first {
    padding-left: 30px;
  }
  .third {
    padding-right: 30px;
  }
  .weightFont{
    font-size: 85px;
    font-family: "DRegular";
    color: #f6ff00;
    padding-left: 30px;
    padding-right: 30px;  
  }
  .numberFont{
    font-size: 22px;
    font-family: "DRegular";
    color: #23f8ef;
  }
  .pdLeft30{
    padding-left: 20px;
  }
}
.FontColor {
  color: #f6ff00 !important;
}
</style>
