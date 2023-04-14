<script setup lang="ts">
import {} from 'vue'

</script>

<template>
  <div class="bodyContainer addZIndex">
    <div class="power">
      <div class="up">
        <span class="nomalFont">实时功率</span>
        <span class="weightFont">105.95</span>
        <span class="nomalFont">万KW</span>
      </div>
      <div class="center">
        <img src="@/assets/img/中间弹窗4.png">
      </div>
      <div class="bottom">
        <div class="first">
          <div class="nomalFont">能效PR</div>
          <div>
            <span class="numberFont">87</span>
            <span class="nomalFont pdLeft30">%</span>
          </div>
        </div>
        <div class="separator">
          <img src="@/assets/img/中间弹窗5.png">
        </div>
        <div class="second">
          <div class="nomalFont">当然最大功率</div>
          <div>
            <span class="numberFont">130.51</span>
            <span class="nomalFont pdLeft30">万kW</span>
          </div>
        </div>
        <div class="separator">
          <img src="@/assets/img/中间弹窗5.png">
        </div>
        <div class="third">
          <div class="nomalFont pdLeft30">昨日最大功率</div>
          <div>
            <span class="numberFont">129.68</span>
            <span class="nomalFont pdLeft30">万kW</span>
          </div>
        </div>
      </div>
    </div>
    <div class="electron">
      <div class="up">
        <span class="nomalFont">当日电量</span>
        <span class="weightFont">105.95</span>
        <span class="nomalFont">万kwh</span>
      </div>
      <div class="center">
        <img src="@/assets/img/中间弹窗3.png">
      </div>
      <div class="bottom">
        <div class="first">
          <div class="nomalFont">当月电量</div>
          <div>
            <span class="numberFont">5068.52</span>
            <span class="nomalFont pdLeft30">万kwh</span>
          </div>
        </div>
        <div class="separator">
          <img src="@/assets/img/中间弹窗5.png">
        </div>
        <div class="second">
          <div class="nomalFont">当季电量</div>
          <div>
            <span class="numberFont">13205.22</span>
            <span class="nomalFont pdLeft30">万kW</span>
          </div>
        </div>
        <div class="separator">
          <img src="@/assets/img/中间弹窗5.png">
        </div>
        <div class="third">
          <div class="nomalFont">当年电量</div>
          <div>
            <span class="numberFont">14147.55</span>
            <span class="nomalFont pdLeft30">万kwh</span>
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
      margin-left: 100px;
      display: flex;
      align-items: center;
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
