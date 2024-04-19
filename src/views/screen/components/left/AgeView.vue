<template>
  <div class="box">
    <p class="title">年龄比例</p>
    <P class="bg"></P>

    <div id="chart" class="chart">

    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.box {
  width: 100%;

  .title {
    color: white;
    font-size: 25px;
    margin-left: 5%;
  }

  .bg {
    width: 80px;
    height: 10px;
    margin-top: 10px;
    margin-left: 20px;
    background: url(../../images/dataScreen-title.png) no-repeat;
    background-size: 100% 100%;
  }

}
</style>