<template>
  <div class="box">
    <p class="title">热门风景排行</p>
    <P class="bg"></P>
    <div class="table-header">
      <span class="rank">排名</span>
      <span class="name">景区</span>
      <span class="num">预约数量</span>
    </div>
    <div class="table" v-for="(item,index) in table" :key="index">
      <img class="rank-bg" :src="item.src" alt="">
      <span class="rank">NO.{{ item.rank }}</span>
      <span class="name">{{ item.name }}</span>
      <div class="num">
        <div class="chart" ref="chart"></div>
        <span>{{ item.num }}w</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { ref, onMounted, reactive } from 'vue';

let table = reactive([
  { rank: 1, name: '峨眉山', num: 8, src: 'https://pic.imgdb.cn/item/662399f90ea9cb1403df85df.png', color:'#13227A' },
  { rank: 2, name: '香格里拉', num: 6, src: 'https://pic.imgdb.cn/item/662398ee0ea9cb1403dd189c.png', color: '#D4237A' },
  { rank: 3, name: '黄山', num: 4, src: 'https://pic.imgdb.cn/item/662398ed0ea9cb1403dd1815.png', color: '#1296DB' },
  { rank: 4, name: '万里长城', num: 3, src: 'https://pic.imgdb.cn/item/662398ee0ea9cb1403dd18ca.png', color:'#2C2C2C' },
  { rank: 5, name: '广州塔', num: 2, src: 'https://pic.imgdb.cn/item/662398ee0ea9cb1403dd190e.png', color: '#A4A4A4' }
])

//获取节点
let chart = ref()
onMounted(() => {
  for(let i = 0;i < chart.value.length; i++) {
    let myCharts = echarts.init(chart.value[i])
    myCharts.setOption({
      title: {
        left: '40%'
      },
      xAxis: {
        show: false,
        min: 0,
        max: 10
      },
      yAxis: {
        show: false,
        type: 'category'
      },
      series: [
        {
          type: 'bar',
          data: [table[i].num],
          barWidth: 20,
          z: 100,
          itemStyle: {
            color: table[i].color,
            borderRadius: 20
          }
        }
      ],
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      }
    })
  } 
})
</script>

<style scoped lang="scss">
.box {
  height: 80%;

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

  .table-header {
    display: flex;
    text-align: center;
    font-size: 18px;
    margin: 30px 10px 10px 10px;
    padding: 10px;
    background: url(../../images/line-bg.png) no-repeat;
    background-size: cover;
    color: #FFB700;
    font-weight: bolder;

    .rank {
      margin-top: 5px;
      flex: 1;

    }

    .name {
      margin-top: 5px;
      flex: 1.5;
    }

    .num {
      margin-top: 5px;
      flex: 3;
    }
  }

  .table {
    display: flex;
    width: 90%;
    height: 20px;
    font-size: 15px;
    line-height: 20px;
    margin: 5%;
    text-align: center;

    .rank-bg {
      float: left;
      height: 20px;
      width: 60px;
      position: fixed;
      margin-left: 5px;
      z-index: 0;
      transform: rotate(180deg);
    }

    .rank {
      flex: 1;
      z-index: 10;

    }

    .name {
      flex: 1.5;
    }

    .num {
      flex: 3;
      display: flex;
      justify-content: space-between;

      .span {
        width: 10%
      }

      .chart {
        width: 90%;
        height: 100%;
      }
    }
  }
}
</style>
