<template>
  <div>

  </div>
</template>

<script setup lang="ts">
//引入组合式API函数之生命周期函数
import { onMounted } from 'vue';
//获取仓库
import useUserStore from '@/store/modules/user';
let userStore = useUserStore();

onMounted(() => {
  userStore.userInfo
})


</script>

<style scoped>

</style>
