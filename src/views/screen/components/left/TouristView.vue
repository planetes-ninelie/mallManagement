<template>
  <div class="box">
    <p class="title">实时游客统计</p>
    <P class="bg"></P>
    <p class="right">
      可预约统计量：
      <span>999</span>
    </p>
    <div class="count-num">
      <p class="num" v-for="item in arr" :key="item">{{ item }}</p>
      <p class="num" >人</p>
    </div>
    <div ref="charts" class="charts"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import 'echarts-liquidfill'
import { onMounted, ref } from 'vue'

let count = ref<number>(114115);
let arr = count.value.toString().split("");

//获取节点
let charts = ref()
onMounted(() => {
  let myCharts = echarts.init(charts.value)
  myCharts.setOption({
    xAxis: {},
    yAxis: {},
    series: [
      {
        type: 'liquidFill',
        waveAnimation: true,
        animationDuration: 0,
        animationDurationUpdate: 0,
        data: [0.6, 0.4],
        radius: '80%',
      },
    ],
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  })
})
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  .title {
    color: white;
    font-size: 25px;
    margin-top: 2.5%;
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

  .right {
    float: right;
    margin-right: 20px;
    color: white;
    font-size: 20px;
    margin-bottom: 2.5%;
  }

  .count-num {
    height: 50px;
    width: 90%;
    margin: 10px auto;
    display: flex;
    background-color: black;

    .num {
      flex: 1;
      font-size: 35px;
      line-height: 50px;
      text-align: center;
      align-items: center;
      margin: 0 2px;
      background: url(../../images/total.png) no-repeat;
    }
  }
  .charts {
    height: 60%;
  }
}
</style>
