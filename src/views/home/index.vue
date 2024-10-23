<template>
  <div>
    <el-card body-class="card">
      <img :src="avatarStore.initialImg" class="avatar" @click="avatarStore.setDialog(true)" />
      <div class="right">
        <h1 class="title">{{ getTime() }}好！{{ useUserStore().username }}</h1>
        <p>{{ setting.title }}</p>
      </div>
    </el-card>
    <div class="svg">
      <svg-icon name="welcome" width="500px" height="300px" class="svg-icon"></svg-icon>
    </div>
    <!-- 上传头像 -->
    <div>
      <!-- <el-dialog title="选择图片" v-model="dialogVisible" width="100%" height="100%" :before-close="handleClose" fullscreen> -->
      <!-- <blockquote class="layui-elem-quote">
          说明：左侧为原图，右侧为裁剪后的图片。
        </blockquote> -->
      <!-- <cropperImage></cropperImage> -->
      <!-- <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submit()">确 定</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span> -->
      <!-- </el-dialog> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
// import { ref } from 'vue'
//引用设置标题与logo配置文件
import setting from '@/setting'
import useUserStore from '@/store/modules/user'
import useAvatarStore from '@/store/modules/avatar'
import { getTime } from '@/utils/time'
//读取用户头像
let avatarStore = useAvatarStore()
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
    cursor: pointer;

    &:hover {
      width: 110px;
      height: 110px;
    }
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
