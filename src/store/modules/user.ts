import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from '@/api/user/type'
import type { UserState } from './types/type'
//引入操作本地储存的工具方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
//引入常量路由
import { constantRoute, asyncRoute, anyRoute } from '@/router/routes'
//引入深拷贝方法
import cloneDeep from 'lodash/cloneDeep'
import router from '@/router'

//过滤异步路由的方法
function filterAsyncRoute(asyncRoute: any, routes: any) {
  return asyncRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}

//创建用户小仓库
const useUserStore = defineStore('User', {
  //小仓库存储数据的地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(), //用户唯一标识token
      menuRoutes: constantRoute, //仓库储存生成菜单需要数组
      username: '',
      userId: '',
      avatar: '',
      buttons: [],
    }
  },
  //异步 | 逻辑的地方
  actions: {
    //用户登录的方法
    async userLogin(data: loginFormData) {
      const result: loginResponseData = await reqLogin(data)
      if (result.code == 200) {
        this.token = result.data as string
        SET_TOKEN(result.data as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //获取用户信息方法
    async userInfo() {
      //获取用户信息进行存储仓库当中
      const result: userInfoResponseData = await reqUserInfo()
      //如果获取用户信息成功，存储一下用户信息
      if (result.code == 200) {
        this.username = result.data.username
        this.avatar = result.data.avatar
        this.buttons = result.data.buttons
        this.userId = result.data.userId
        const userAsyncRoutes = filterAsyncRoute(
          cloneDeep(asyncRoute),
          result.data.routes,
        )
        this.menuRoutes = [...constantRoute, ...userAsyncRoutes, ...anyRoute]
        ;[...userAsyncRoutes, ...anyRoute].forEach((route: any) => {
          router.addRoute(route)
        })
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //退出登录
    async userLogout() {
      const result: any = await reqLogout()
      if (result.code == 200) {
        this.token = ''
        this.username = ''
        this.avatar = ''
        this.menuRoutes = []
        this.userId = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})

export default useUserStore
