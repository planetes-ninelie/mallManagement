import pinia from '@/store'
import useUserStore from '@/store/modules/user'

const userStore = useUserStore(pinia)
export const isHasButton = (app: any) => {
  //全局自定义指令
  app.directive('has', {
    mounted(el: any, options: any) {
      if (!userStore.buttons.includes(options.value)) {
        el.parentNode.removeChild(el)
      }
    },
  })
}
