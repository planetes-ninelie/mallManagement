<template>
  <div class="box">
    <span class="title">未来14天客户趋势量</span>
    <span class="bg"></span>
    <div ref="chart" class="chart"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'

//x轴标签
let months: number[] = []

//获取节点
let chart = ref()
onMounted(() => {
  //生成x轴标签
  for (let i = 1; i <= 14; i++) {
    months.push(i)
  }

  let myCharts = echarts.init(chart.value)
  let option = {
    color: ['#80FFA5'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
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
        name: '人次',
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
        name: '访问量',
        type: 'line',

        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255, 158, 68)',
            },
            {
              offset: 1,
              color: 'rgb(255, 70, 131)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: [
          140, 232, 210, 226, 110, 234, 225, 260, 245, 251, 189, 160, 120, 110,
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
    margin-left: 2.5%;
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
