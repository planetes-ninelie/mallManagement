<template>
  <div class="left-container">
    <Tourist class="tourist" />
    <SexView class="sex" />
    <AgeView class="age" />
  </div>
</template>

<script setup lang="ts">
import AgeView from './AgeView.vue'
import SexView from './SexView.vue'
import Tourist from './TouristView.vue'
</script>

<style scoped lang="scss">
.left-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  color: white;

  .tourist {
    width: 95%;
    flex: 1.5;
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
    background-size: 100% 100%;
    margin: 2.5%;
  }

  .sex {
    width: 95%;
    flex: 1;
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
    background-size: 100% 100%;
    margin: 2.5%;
  }

  .age {
    width: 95%;
    flex: 1;
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
    background-size: 100% 100%;
    margin: 2.5%;
  }
}
</style>