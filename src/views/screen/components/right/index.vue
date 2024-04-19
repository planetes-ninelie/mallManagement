<template>
  <div class="left-container">
    <Scene class="scene" />
    <Tourist class="tourist" />
    <Order class="order" />
  </div>
</template>

<script setup lang="ts">
import Order from './OrderView.vue'
import Scene from './SceneView.vue'
import Tourist from './TouristContrastView.vue'
</script>

<style scoped lang="scss">
.left-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  color: white;

  .scene {
    width: 95%;
    flex: 1.5;
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
    background-size: 100% 100%;
    margin: 2.5%;
  }

  .order {
    width: 95%;
    flex: 1;
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
    background-size: 100% 100%;
    margin: 2.5%;
  }

  .tourist {
    width: 95%;
    flex: 1;
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
    background-size: 100% 100%;
    margin: 2.5%;
  }
}
</style>