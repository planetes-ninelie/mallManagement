<template>
  <el-button size="default" @click="updateRefresh" icon="Refresh" circle></el-button>
  <el-button size="default" @click="fullScreen" icon="FullScreen" circle></el-button>
  <el-popover placement="bottom" title="主题设置" :width="150" trigger="hover" content="">
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker @change="setColor" v-model="color" size="small" :teleported="false" show-alpha
          :predefine="predefineColors" />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch @change="changeDark" v-model="dark" size="small" class="mt-2" inline-prompt :active-icon="Sunrise"
          :inactive-icon="MoonNight" />
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button size="default" @click="" icon="Setting" circle></el-button>
    </template>
  </el-popover>

  <img :src="userStore.avatar" class="tabbar_right_avatar" />
  <!-- <img src="@/assets/images/avatar.jpg" class="tabbar_right_avatar" /> -->

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
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { MoonNight, Sunrise } from '@element-plus/icons-vue'

let layoutSettingStore = useLayOutSettingStore()

let userStore = useUserStore()
//获取路由器对象
let $router = useRouter()
//获取路由对象
let $route = useRoute()
//搜集开关数据
let dark = ref<boolean>(false)

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
//主题颜色设置
const color = ref('rgba(255, 69, 0, 0.68)')
//预定义颜色设置
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
//暗黑模式切换
const changeDark = () => {
  let html = document.documentElement
  dark.value ? (html.className = 'dark') : (html.className = '')
}
const setColor = () => {
  let html = document.documentElement
  html.style.setProperty('--el-color-primary', color.value)
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
