<template>
  <div class="top">
    <div class="left">
      <span class="lbtn" @click="goHome">首页</span>
    </div>
    <div class="center">
      <div class="title">智慧旅游可视化大数据平台</div>
    </div>
    <div class="right">
      <span class="rbtn">数据统计</span>
      <span class="time">当前时间：{{ time }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

//获取路由器对象
let $router = useRouter()
//获取当前时间
let time = ref<string>('')
let timer = ref(0)

onMounted(() => {
  timer.value = setInterval(() => {
    let getNow = new Date()
    time.value = getNow.toLocaleString()
  }, 1000)
})

onBeforeUnmount(() => {
  clearInterval(timer.value)
})
//点击首页按钮
const goHome = () => {
  $router.push('/')
}
</script>

<style scoped lang="scss">
.top {
  width: 100%;
  height: 50px;
  display: flex;

  .left {
    flex: 1;
    background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: cover;

    .lbtn {
      width: 150px;
      height: 40px;
      float: right;
      background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
      background-size: 100% 100%;
      line-height: 40px;
      text-align: center;
      color: white;
      font-size: 20px;
    }
  }

  .center {
    flex: 2;

    .title {
      width: 100%;
      height: 75px;
      background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 75px;
      color: white;
      font-size: 30px;
    }
  }

  .right {
    flex: 1;
    background: url(../../images/dataScreen-header-right-bg.png) no-repeat;
    background-size: cover;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .rbtn {
      width: 150px;
      height: 40px;
      float: left;
      background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
      background-size: 100% 100%;
      line-height: 40px;
      text-align: center;
      color: white;
      font-size: 20px;
    }

    .time {
      color: white;
      margin-right: 10px;
      font-size: 20px;
    }
  }
}
</style>
