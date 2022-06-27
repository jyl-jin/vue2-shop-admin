import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false
// 可以看出来当前是开发环境还是生产环境
console.log(process.env);

// 全局组件
// 引入
import CategorySelect from '@/components/CategorySelect'
// 按钮
import HitButton from '@/components/hitButton'
// 挂载
Vue.component(CategorySelect.name,CategorySelect)
Vue.component(HitButton.name,HitButton)


// 引入接口
import API from '@/api'
Vue.prototype.$API=API
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
