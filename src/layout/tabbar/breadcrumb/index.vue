<template>
  <!-- 顶部左侧静态 -->
  <el-icon class="tabbar_left_icon" @click="changeIcon" :size="18">
    <component :is="LayOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <!-- 左侧的面包屑 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <!-- 面包动态展示路由名字与标题 -->
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      class="tabbar_left_breadcrumb"
      v-show="!item.meta.hidden"
      :to="item.path"
    >
      <!-- 图标 -->
      <el-icon :size="18">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <!-- 面包屑展示匹配路由标题 -->
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
//引入路由对象
import { useRoute } from 'vue-router'

//引入layout配置相关的仓库
import useLayOutSettingStore from '@/store/modules/setting'

//获取layout配置相关的仓库
let LayOutSettingStore = useLayOutSettingStore()

//获取路由对象
let $route = useRoute()

//定义图标的方法
const changeIcon = () => {
  //图标进行切换
  LayOutSettingStore.fold = !LayOutSettingStore.fold
}
</script>

<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>

<style scoped lang="scss">
.tabbar_left_icon {
  margin-right: 10px;
}

.tabbar_left_breadcrumb {
  i {
    margin-right: 2px;
  }

  span {
    font-size: 18px;
  }
}
</style>
