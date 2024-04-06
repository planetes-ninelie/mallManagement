<template>
  <el-button
    size="default"
    @click="updateRefresh"
    icon="Refresh"
    circle
  ></el-button>
  <el-button
    size="default"
    @click="fullScreen"
    icon="FullScreen"
    circle
  ></el-button>
  <el-button size="default" @click="" icon="Setting" circle></el-button>
  <img :src="userStore.avatar" class="tabbar_right_avatar" />

  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
//获取骨架的小仓库
import useLayOutSettingStore from '@/store/modules/setting'
//获取用户相关的小仓库
import useUserStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'

let layoutSettingStore = useLayOutSettingStore()

let userStore = useUserStore()
//获取路由器对象
let $router = useRouter()
//获取路由对象
let $route = useRoute()

//刷新按钮点击回调
const updateRefresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}
//全屏按钮点击的回调
const fullScreen = () => {
  //DOM对象的一个属性，可以用来判断当前是不是全屏属性
  let full = document.fullscreenElement
  if (!full) {
    //全屏模式
    document.documentElement.requestFullscreen()
  } else {
    //退出全屏模式
    document.exitFullscreen()
  }
}

//退出登录点击回调
const logout = async () => {
  //清空仓库用户相关信息
  await userStore.userLogout()
  //跳转登录页面
  $router.push({
    path: '/login',
    query: { redirect: $route.path },
  })
}
</script>

<script lang="ts">
export default {
  name: 'Setting',
}
</script>

<style scoped>
.tabbar_right_avatar {
  margin: 0 10px 0 20px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
</style>
