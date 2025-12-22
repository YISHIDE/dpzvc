import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './components/app.vue'
import Routers from './router'
import Config from './config/config'
import dpzvc from './index'

// 安装自定义组件库
Vue.use(dpzvc)

Vue.use(VueRouter)

// 配置全局变量
Vue.prototype.$Config = Config

// 创建全局事件总线
// window.EventBus = new Vue()

// 路由配置
const router = new VueRouter({
  mode: process.env.NODE_ENV !== 'production' ? 'hash' : 'hash', // VueRouter 3 兼容写法
  routes: Routers
})
// 安全检测组件选项
// function detectComponentOptionsLoops (component, path = '') {
//   const issues = []
//   const currentPath = path || component.name || 'AnonymousComponent'

//   // 检查 computed 定义里是否有函数返回自身或 this 链可能循环
//   const computedKeys = component.computed ? Object.keys(component.computed) : []
//   computedKeys.forEach(key => {
//     const fn = component.computed[key]
//     if (typeof fn !== 'function') return
//     // 这里只做标记，不执行 fn，避免触发 RangeError
//     if (fn.toString().includes('this.' + key)) {
//       issues.push(`${currentPath} -> Computed "${key}" 可能自引用`)
//     }
//   })

//   // 检查 props 定义是否规范（只检查键名，不访问值）
//   const propsKeys = component.props ? Object.keys(component.props) : []
//   propsKeys.forEach(key => {
//     if (!/^[a-zA-Z0-9]+$/.test(key)) {
//       issues.push(`${currentPath} -> Prop "${key}" 非规范命名`)
//     }
//   })

//   // 遍历子组件
//   const subComponents = component.components || component.components || {}
//   Object.keys(subComponents).forEach(subName => {
//     const subComp = subComponents[subName]
//     if (subComp) {
//       issues.push(...detectComponentOptionsLoops(subComp, `${currentPath}.${subName}`))
//     }
//   })

//   return issues
// }

// // 路由前守卫
// router.beforeEach((to, from, next) => {
//   const matchedComponents = router.getMatchedComponents(to)
//   matchedComponents.forEach(comp => {
//     const loopErrors = detectComponentOptionsLoops(comp)
//     if (loopErrors.length) {
//       console.warn('[组件选项检测] 可能存在循环引用或问题:\n', loopErrors.join('\n'))
//     }
//   })
//   next()
// })

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  next()
})
// 根实例
const app = new Vue({
  // el: '#app',
  router,
  render: h => h(App)
})
app.$mount('#app')
