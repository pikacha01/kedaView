<script setup lang="ts">
import {} from 'vue'
import SocialContribution from '@/components/socialContribution.vue';
</script>

<template>
  <div class="leftChart addZIndex">
    <SocialContribution />
  </div>
</template>

<style scoped lang="less">
.leftChart{
  position: absolute;
  top: 10%;
  left: 1%;
}
</style>
