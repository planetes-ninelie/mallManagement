<template>
  <div>
    <el-card body-class="card">
      <img :src="avatar" class="avatar" />
      <div class="right">
        <h1 class="title">{{ getTime() }}好！{{ useUserStore().username }}</h1>
        <p>{{ setting.title }}</p>
      </div>
    </el-card>
    <div class="svg">
      <svg-icon name="welcome" width="500px" height="300px" class="svg-icon"></svg-icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
//引用设置标题与logo配置文件
import setting from '@/setting'
import useUserStore from '@/store/modules/user'
import { getTime } from '@/utils/time'
//读取用户头像
let avatar = useUserStore().avatar
</script>

<style lang="scss">
.card {
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: left;

  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .right {
    padding: 20px;
    .title {
      font-size: 20pt;
      font-weight: bolder;
      margin-bottom: 15px;
    }
  }
}

.svg {
  display: flex;
  justify-content: center;
  .svg-icon {
    margin-top: 100px;
  }
}
</style>
