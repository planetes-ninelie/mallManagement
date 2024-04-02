<template>

  <!-- 顶部左侧静态 -->
  <el-icon class="tabbar_left_icon">
    <Expand />
  </el-icon>
  <!-- 左侧的面包屑 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  </el-breadcrumb>

</template>

<script setup lang="ts">

</script>

<style scoped>
.tabbar_left_icon {
  margin-right: 10px;
}
</style>