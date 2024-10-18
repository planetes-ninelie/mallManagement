<template>
  <div class="box">
    <header class="title">销售渠道数据统计</header>
    <div class="bg"></div>
    <div ref="chart" class="chart"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
//获取节点
let chart = ref()
onMounted(() => {
  let myCharts = echarts.init(chart.value)

  let option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a}<br> {b}: {c} ({d}%)',
    },
    legend: {
      top: 0,
      right: 10,
      data: ['官网', '微信小程序', '其他渠道', '公众号'],
      width: 230,
      textStyle: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 100,
      },
    },
    series: [
      {
        top: 30,
        left: 5,
        name: '浏览量',
        type: 'pie',
        selectedMode: 'single',
        radius: [0, '30%'],
        label: {
          show: false,
          position: 'inner',
          fontSize: 14,
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 4848, name: '官网' },
          { value: 1835, name: '微信小程序' },
          { value: 2110, name: '公众号' },
          { value: 1251, name: '其他渠道' },
        ],
      },
      {
        top: 30,
        left: 5,
        name: '预约量',
        type: 'pie',
        radius: ['45%', '60%'],
        labelLine: {
          length: 30,
        },
        label: {
          formatter: '{b|{b}}\n{per|{d}%}  ',
          borderColor: '#8C8D8E',
          borderWidth: 1,
          borderRadius: 5,
          padding: 8,
          rich: {
            b: {
              color: '#fff',
              fontSize: 14,
            },
            per: {
              color: '#fff',
              backgroundColor: '#4C5058',
              padding: [3, 4],
              borderRadius: 4,
            },
          },
        },
        data: [
          { value: 1048, name: '官网' },
          { value: 335, name: '微信小程序' },
          { value: 310, name: '公众号' },
          { value: 251, name: '其他渠道' },
        ],
      },
    ],
  }
  myCharts.setOption(option)
})
</script>

<style scoped lang="scss">
.box {
  width: 100%;

  .title {
    color: white;
    font-size: 18px;
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

  .chart {
    margin-top: 10px;
    height: 85%;
  }
}
</style>
