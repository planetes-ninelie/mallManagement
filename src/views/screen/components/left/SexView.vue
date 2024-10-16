<template>
  <div class="box">
    <p class="title">客户画像</p>
    <P class="bg"></P>
    <div class="avatar">
      <div class="man">
        <p>男士</p>
        <img src="../../images/man.png" alt="" />
      </div>
      <div class="woman">
        <p>女士</p>
        <img src="../../images/woman.png" alt="" />
      </div>
    </div>
    <div class="bottom">
      <div class="rate">
        <p>男士{{ manRate }}%</p>
        <p>女士{{ womanRate }}%</p>
      </div>
      <div class="chart" ref="chart"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

let manRate = ref<number>(55)
let womanRate = ref<number>(100 - manRate.value)
//获取节点
let chart = ref()
onMounted(() => {
  let myCharts = echarts.init(chart.value)
  myCharts.setOption({
    title: {
      left: '40%',
    },
    xAxis: {
      show: false,
      min: 0,
      max: 100,
    },
    yAxis: {
      show: false,
      type: 'category',
    },
    series: [
      {
        type: 'bar',
        data: [manRate.value],
        barWidth: 20,
        z: 100,
        itemStyle: {
          color: '#007AFE',
          borderRadius: 20,
        },
      },
      {
        type: 'bar',
        data: [100],
        barWidth: 20,
        barGap: '-100%',
        itemStyle: {
          color: '#FF4B7A',
          borderRadius: 20,
        },
      },
    ],
    grid: {
      left: 0,
      top: 0,
      right: 0,
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

  .avatar {
    margin-top: 25px;
    display: flex;
    justify-content: space-evenly;
    height: 120px;

    .man {
      height: 115px;
      width: 115px;
      background: url(../../images/man-bg.png) no-repeat;
      display: flex;
      flex-direction: column;
      align-items: center;

      p {
        font-size: 20px;
      }

      img {
        height: 70px;
        width: 70px;
        margin-top: 10px;
      }
    }

    .woman {
      height: 110px;
      width: 110px;
      background: url(../../images/woman-bg.png) no-repeat;
      display: flex;
      flex-direction: column;
      align-items: center;

      p {
        font-size: 20px;
      }

      img {
        height: 70px;
        width: 70px;
        margin-top: 10px;
      }
    }
  }

  .bottom {
    height: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5px;

    .rate {
      width: 60%;
      height: 25px;
      display: flex;
      justify-content: space-between;
    }

    .chart {
      width: 70%;
      height: 25px;
    }
  }
}
</style>
