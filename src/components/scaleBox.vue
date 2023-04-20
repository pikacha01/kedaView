<script setup lang="ts">
import { onMounted, ref } from 'vue'
// 适应窗口变化
const scale = ref("")
const width = ref(7680)
const ScaleBox = ref<null | HTMLDivElement>(null)
const height = ref(3240)
const getScale = () => {
      let wh = window.innerHeight / height.value;
      let ww = window.innerWidth / width.value;
      console.log(ww < wh ? ww : wh);
      return ww < wh ? ww : wh;
}
const setScale = () => {
  if(window.innerHeight ==9680){
        height.value = 9680
      }else{
        height.value = 3240

      }
      scale.value = ""+getScale();
      if (ScaleBox.value) {
        ScaleBox.value.style.setProperty("--scale", scale.value);
      }
}
const debounce =(fn : Function, delay: number)=> {
      let delays = delay || 500;
      let timer : any
      return function (this: unknown) {
        let th = this;
        let args = arguments;
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(function () {
          timer = null;
          fn.apply(th, args);
        }, delays);
      };
    }
onMounted(() => {
  setScale()
  window.addEventListener("resize", debounce(setScale,500));
})
</script>

<template>
  <div
    class="ScaleBox"
    ref="ScaleBox"
    :style="{
      width: width + 'px',
      height: height + 'px',
    }"
  >
    <slot></slot>
  </div>
</template>

<style scoped lang="less">
#ScaleBox {
  --scale: 1;
}
.ScaleBox {
  position: absolute;
  transform: scale(var(--scale)) translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  transform-origin: 0 0;
  left: 50%;
  top: 50%;
  transition: 0.3s;
  z-index: 999;
}
</style>
