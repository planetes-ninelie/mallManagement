import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo } from '@/api/user'
import type { loginForm, loginResponseData } from '@/api/user/type'
import type { UserState } from './types/type'
//引入操作本地储存的工具方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
//引入常量路由
import { constantRoute } from '@/router/routes'

//创建用户小仓库
let useUserStore = defineStore('User', {
  //小仓库存储数据的地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(), //用户唯一标识token
      menuRoutes: constantRoute, //仓库储存生成菜单需要数组(路由)
      username: 'kokomi',
      avatar: 'https://pic.imgdb.cn/item/64b855b71ddac507ccb22554.png'
    }
  },
  //异步 | 逻辑的地方
  actions: {
    //用户登录的方法
    async userLogin(data: loginForm) {
      let result: loginResponseData = await reqLogin(data)
      if (result.code == 200) {
        this.token = result.data.token as string
        SET_TOKEN(result.data.token as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
    //获取用户信息方法
    async userInfo() {
      //获取用户信息进行存储仓库当中
      let result = await reqUserInfo();
      //如果获取用户信息成功，存储一下用户信息
      if (result.code == 200) {
        this.username = result.data.checkUser.username;
        this.avatar = result.data.checkUser.avatar;
      } else {

      }
    },
    //退出登录
    userLogout() {
      this.token = '';
      this.username = '';
      this.avatar = '';
      REMOVE_TOKEN();
    }
  },
  getters: {},
})

export default useUserStore
