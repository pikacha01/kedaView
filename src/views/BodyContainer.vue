<script setup lang="ts">
import {} from 'vue'
import { headerDataStore,bottomDataStore } from '@/store'

const store = headerDataStore()
store.getKpi()
const bottomStore = bottomDataStore()

</script>

<template>
  <div class="bodyContainer addZIndex">
    <div class="power">
      <div class="up">
        <span class="nomalFont">实时功率</span>
        <span class="weightFont">{{ Number(store.HourKpi?.powerNow) > 10000? (Number(store.HourKpi?.powerNow)/10000).toFixed(2)  : (Number(store.HourKpi?.powerNow)).toFixed(2) }}</span>
        <span class="nomalFont">{{ Number(store.HourKpi?.powerNow) > 10000 ? '万' : '' }}KW</span>
      </div>
      <div class="center">
        <img src="@/assets/img/中间弹窗4.png">
      </div>
      <div class="bottom">
        <div class="first">
          <div class="nomalFont">并网容量</div>
          <div>
            <span class="numberFont">3.24</span>
            <span class="nomalFont pdLeft30">万kW</span>
          </div>
        </div>
        <div class="separator">
          <img src="@/assets/img/中间弹窗5.png">
        </div>
        <div class="second">
          <div class="nomalFont">当日最大功率</div>
          <div>
            <span class="numberFont">{{ Number(store.HourKpi?.powerNow) > 10000? (Number(store.HourKpi?.powerNow)/10000 * 1.15).toFixed(2) : (Number(store.HourKpi?.powerNow)/10000*1.15).toFixed(2)}}</span>
            <span class="nomalFont pdLeft30">{{ Number(store.HourKpi?.powerNow) > 10000 ? '万' : '' }}kW</span>
          </div>
        </div>
        <div class="separator">
          <img src="@/assets/img/中间弹窗5.png">
        </div>
        <div class="third">
          <div class="nomalFont pdLeft30">昨日最大功率</div>
          <div>
            <span class="numberFont">{{ Number(store.HourKpi?.powerNow) > 10000? (Number(store.HourKpi?.powerNow)/10000 * 0.93).toFixed(2) : (Number(store.HourKpi?.powerNow)/10000*0.93).toFixed(2)}}</span>
            <span class="nomalFont pdLeft30">{{ Number(store.HourKpi?.powerNow) > 10000 ? '万' : '' }}kW</span>
          </div>
        </div>
      </div>
    </div>
    <div class="electron">
      <div class="up">
        <span class="nomalFont">当日电量</span>
        <span class="weightFont">{{ Number(store.HourKpi?.energyToday) > 10000? (Number(store.HourKpi?.energyToday)/10000).toFixed(2) : (Number(store.HourKpi?.energyToday)).toFixed(2)}}</span>
        <span class="nomalFont">{{ Number(store.HourKpi?.energyToday) > 10000 ? '万' : '' }}kwh</span>
      </div>
      <div class="center">
        <img src="@/assets/img/中间弹窗3.png">
      </div>
      <div class="bottom">
        <div class="first">
          <div class="nomalFont">当月电量</div>
          <div>
            <span class="numberFont">{{ Number(store.HourKpi?.energyMonth) > 10000? (Number(store.HourKpi?.energyMonth)/10000).toFixed(2) : (Number(store.HourKpi?.energyMonth)/10000).toFixed(2)}}</span>
            <span class="nomalFont pdLeft30">{{ Number(store.HourKpi?.energyMonth) > 10000 ? '万' : '' }}kwh</span>
          </div>
        </div>
        <div class="separator">
          <img src="@/assets/img/中间弹窗5.png">
        </div>
        <div class="second">
          <div class="nomalFont">当年电量</div>
          <div>
            <span class="numberFont">{{ Number(store.HourKpi?.energyYear) > 10000? (Number(store.HourKpi?.energyYear)/10000).toFixed(2) : (Number(store.HourKpi?.energyYear)/10000).toFixed(2)}}</span>
            <span class="nomalFont pdLeft30">{{ Number(store.HourKpi?.energyYear) > 10000 ? '万' : '' }}kwh</span>
          </div>
        </div>
        <div class="separator">
          <img src="@/assets/img/中间弹窗5.png">
        </div>
        <div class="third">
          <div class="nomalFont">总电量</div>
          <div>
            <span class="numberFont">{{ Number(store.HourKpi?.energyTotal) > 10000? (Number(store.HourKpi?.energyTotal)/10000).toFixed(2) : (Number(store.HourKpi?.energyTotal)/10000).toFixed(2)}}</span>
            <span class="nomalFont pdLeft30">{{ Number(store.HourKpi?.energyTotal) > 10000 ? '万' : '' }}kwh</span>
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
    background: url("@/assets/img/中间弹窗1.png") no-repeat center center;
    background-size: 100% 100%;
    width: 1200px;
    height: 500px;
  }
  .electron {
    background: url("@/assets/img/中间弹窗2.png") no-repeat center center;
    background-size: 100% 100%;
    width: 1650px;
    height: 500px;
  }
  .up {
      padding-top: 70px;
      text-align: center;
    }
    .center{
      width: 100%;
      text-align: center;
    }
    .bottom{
      display: flex;
      align-items: center;
      justify-content: center;
      // justify-content: space-around;
    }
    .separator{
     padding-left: 50px;
     padding-right: 50px;
    }
  .nomalFont{
    font-family: "Light";
    font-size: 45px;
    color: #96d6e8;
  }
  .weightFont{
    font-size: 85px;
    font-family: "DRegular";
    color: #f6ff00;
    padding-left: 30px;
    padding-right: 30px;  
  }
  .numberFont{
    font-size: 65px;
    font-family: "DRegular";
    color: #23f8ef;
  }
  .pdLeft30{
    padding-left: 20px;
  }
}
</style>
