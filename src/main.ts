import { createApp } from 'vue'
import App from './App.vue'

// 全局css 注入
import '@/styles/index.less'

// router 注册
import { RzRouter } from '@/router'

// 引入element-plus样式
import 'element-plus/dist/index.css'

// 全局组件注册
import components from '@/components/index'

// 引入svg注册脚本
import 'virtual:svg-icons-register'

import 'jsoneditor'
createApp(App).use(components).use(RzRouter).mount('#app')
