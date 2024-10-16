<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="loginForms"
        >
          <h1>Hello!</h1>
          <h2 class="animation">欢迎来到悦购后台管理</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              :loading="loading"
              class="login_btn"
              type="primary"
              size="default"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import useUserStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
//引入获取当前时间的函数
import { getTime } from '@/utils/time'

//引入用户相关的小仓库
let userStore = useUserStore()
//获取路由器
let $router = useRouter()
//定义变量控制按钮加载效果
let loading = ref(false)
//收集账号与密码的数据
let loginForm = reactive({ username: 'admin', password: '123456' })
//获取el-form组件
let loginForms = ref()
//获取路由
let $route = useRoute()

//登录按钮回调
const login = async () => {
  await loginForms.value.validate()
  loading.value = true
  try {
    await userStore.userLogin(loginForm)
    let redirect: any = $route.query.redirect
    $router.push({ path: redirect || '/' })
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `HI!${getTime()}好`,
    })
    loading.value = false
  } catch (error) {
    loading.value = false
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}

//自定义校验规则函数
const validatorUserName = (_rule: any, value: any, callback: any) => {
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('账号长度至少五位'))
  }
}

const validatorPassword = (_rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('密码长度至少六位'))
  }
}

//定义表单校验需要配置对象
const rules = {
  username: [{ trigger: 'change', validator: validatorUserName }],
  password: [{ trigger: 'change', validator: validatorPassword }],
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
}

.login_form {
  position: relative;
  width: 80%;
  top: 30vh;
  background-color: rgba($color: #6d5151, $alpha: 0.8);
  background-size: cover;
  padding: 40px;
  border-radius: 20px;

  h1 {
    color: white;
    font-size: 40px;
  }

  h2 {
    font-size: 20px;
    color: white;
    margin: 20px 0px;
  }

  .animation {
    position: relative;
    overflow: hidden;
    width: 0;
    white-space: nowrap;
    animation: width 3s steps(30) forwards;

    &::after {
      content: '';
      position: absolute;
      right: 0px;
      height: 20px;
      border-right: 2px solid #ffffff;
      animation: showInfinite 0.1s 30 both;

      @keyframes showInfinite {
        0%,
        50% {
          opacity: 1;
        }

        100% {
          opacity: 0;
        }
      }
    }

    @keyframes width {
      0% {
        width: 0;
      }

      100% {
        width: 210px;
      }
    }
  }

  &:last-child .animation::after {
    animation: showInfinite 0.1s 30 both;
  }

  .login_btn {
    width: 100%;
  }
}
</style>
