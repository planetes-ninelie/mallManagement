<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="" />
    <p v-show="!LayOutSettingStore.fold">{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
//引用设置标题与logo配置文件
import setting from '@/setting'
import useLayOutSettingStore from '@/store/modules/setting'
//获取layout配置仓库
let LayOutSettingStore = useLayOutSettingStore()
</script>

<script lang="ts">
export default {
  name: 'Logo',
}
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: 50px;
  color: white;
  display: flex;
  align-items: center;
  padding: 10px;
  img {
    width: 40px;
    height: 40px;
  }
  p {
    font-size: $base-logo-title-fontSize;
    margin-left: 10px;
  }
}
</style>
