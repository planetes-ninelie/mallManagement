import { createApp } from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//忽略当前文件ts类型的检测否则有红色提示(打包会失败)
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'virtual:svg-icons-register'

import globalComponent from '@/components'
import '@/styles/index.scss'
import router from '@/router'
import pinia from './store'

const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})

app.use(globalComponent)
app.use(pinia)
app.use(router)
app.mount('#app')
