<template>
  <div class="box">
    <Map class="map"></Map>
    <Tourist class="tourist"></Tourist>
  </div>
</template>

<script setup lang="ts">
import Map from './Map.vue'
import Tourist from './Tourist.vue'
</script>

<style scoped lang="scss">
.box {
  height: 100%;
  .map {
    height: 70%;
  }
  .tourist {
    margin-top: 2.5%;
    height: 26%;
    background: url(../../images/dataScreen-main-cb.png) no-repeat;
    background-size: cover;
  }
}
</style>
