<template>
  <el-button size="small" @click="" icon="Refresh" circle></el-button>
  <el-button size="small" @click="" icon="FullScreen" circle></el-button>
  <el-button size="small" @click="" icon="Setting" circle></el-button>
  <img src="../../../public/logo.png" class="tabbar_right_avatar" alt="">

  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      admin
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出</el-dropdown-item>
        <el-dropdown-item>Action 2</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">

</script>

<style scoped>
.tabbar_right_avatar {
  margin: 0 5px 0 20px;
  width: 24px;
  height: 24px;
}
</style>