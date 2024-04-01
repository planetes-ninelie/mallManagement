<template>
  <template v-for="(item, index) in menuList" :key="item.path">
    <!-- 没有子路由 -->
    <el-menu-item v-if="!item.children" :index="item.path">
      <template #title>
        <span>标 &nbsp;</span>
        <span>{{ item.meta.title }}</span>
      </template>
    </el-menu-item>
    <!-- 有子路由但只有一个 -->
    <el-menu-item v-if="item.children && item.children.length == 1" :index="item.children[0].path">
      <template #title>
        <span>标 &nbsp;</span>
        <span>{{ item.children[0].meta.title }}</span>
      </template>
    </el-menu-item>
    <!-- 有子路由且个数大于一个 -->
    <el-menu-item>
      
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
//获取父组件传递过来的全部路由数组
defineProps(['menuList'])


</script>

<style scoped>

</style>