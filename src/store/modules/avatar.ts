import { defineStore } from 'pinia'
import type { AvatarState } from './types/type.ts'

const useAvatarStore = defineStore('Avatar', {
  state: (): AvatarState => {
    return {
      initialImg:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      dialogVisible: false,
    }
  },
  actions: {
    //获取头像
    async setAvatar(initialImg: string) {
      if (initialImg) {
        this.initialImg = initialImg
      }
    },
    //获取组件
    async setDialog(dialogVisible: boolean) {
      this.dialogVisible = dialogVisible
    },
  },
  getters: {},
})

export default useAvatarStore
