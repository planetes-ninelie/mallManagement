<template>
  <div class="box">
    <header class="title">年度销售量对比</header>
    <div class="bg"></div>
    <div ref="chart" class="chart"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'

//月份
let months: number[] = []

//获取节点
let chart = ref()
onMounted(() => {
  //生成月份
  for (let i = 1; i <= 12; i++) {
    months.push(i)
  }

  let myCharts = echarts.init(chart.value)
  let option = {
    color: ['#80FFA5', '#00DDFF', '#37A2FF'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {
      right: 10,
      data: ['2021年', '2022年', '2023年'],
      textStyle: {
        color: 'white',
        fontSize: 14,
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: months,
        axisLabel: {
          color: 'white',
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: '销售件数',
        nameTextStyle: {
          color: 'white',
        },
        axisLabel: {
          color: 'white',
        },
      },
    ],
    series: [
      {
        name: '2021年',
        type: 'line',

        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(128, 255, 165)',
            },
            {
              offset: 1,
              color: 'rgb(1, 191, 236)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: [
          1400, 2320, 2101, 2264, 2100, 2340, 2250, 2600, 2450, 2510, 1890,
          1600,
        ],
      },
      {
        name: '2022年',
        type: 'line',
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(0, 221, 255)',
            },
            {
              offset: 1,
              color: 'rgb(77, 119, 255)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: [
          1300, 2020, 2301, 2464, 2500, 2640, 2850, 2900, 2050, 2810, 2390,
          2200,
        ],
      },
      {
        name: '2023年',
        type: 'line',
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(55, 162, 255)',
            },
            {
              offset: 1,
              color: 'rgb(116, 21, 219)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: [
          2000, 1800, 1601, 1964, 2200, 2540, 3000, 3200, 2970, 3310, 2790,
          2100,
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
    height: 80%;
  }
}
</style>
