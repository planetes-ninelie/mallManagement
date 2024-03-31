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
          <h1>hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
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
import { User, Lock } from '@element-plus/icons-vue';
import { reactive,ref } from 'vue';
import useUserStore from "@/store/modules/user";
import { useRouter } from 'vue-router';
import { ElNotification } from 'element-plus';
//引入获取当前时间的函数
import { getTime } from '@/utils/time';


//引入用户相关的小仓库
let userStore = useUserStore();
//获取路由器
let $router = useRouter();
//定义变量控制按钮加载效果
let loading = ref(false);
//收集账号与密码的数据
let loginForm = reactive({ username: '', password: '' });
//获取el-form组件
let loginForms = ref();

//登录按钮回调
const login = async() => {
  await loginForms.value.validate();
  
  loading.value = true
  try {
    await userStore.userLogin(loginForm);
    $router.push('/')
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `HI!${getTime()}`
    })
    loading.value = false;
  } catch (error) {
    loading.value = false;
    ElNotification({
      type:'error',
      message: (error as Error).message
    })
  }
}

//定义表单校验需要配置对象
const rules = {
  username:[
    { required: true, message: '账号不能为空', trigger:'blur' },
    { required: true, min: 6, message: '账号长度至少6位数', trigger:'change' },
    { required: true, max: 10, message: '账号长度至多10位数', trigger:'change' }
  ],
  password:[
    { required: true, message: '密码不能为空', trigger:'blur' },
    { required: true, min: 6, message: '密码长度至少6位数', trigger:'change' },
    { required: true, max: 15, message: '密码长度至多15位数', trigger:'change' }
  ]
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
  background: url('@/assets/images/login_form.png') no-repeat;
  background-size: cover;
  padding: 40px;
  h1 {
    color: while;
    font-size: 40px;
  }
  h2 {
    font-size: 20px;
    color: white;
    margin: 20px 0px;
  }
  .login_btn {
    width: 100%;
  }
}
</style>
