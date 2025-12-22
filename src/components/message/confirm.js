/**
 * messageGroup.js
 * 兼容 Vue 2.7 runtime-only 构建
 */

import Vue from 'vue'
import MessageGroup from './messageGroup.vue' // 你的 Vue 组件
// import { camelcaseToHyphen } from '../../utils/util'

MessageGroup.newInstance = function (props = {}) {
  const div = document.createElement('div')
  document.body.appendChild(div)

  // 使用 render 函数代替 template，兼容 runtime-only
  const messageVm = new Vue({
    data () {
      return { ...props }
    },
    render (h) {
      return h(MessageGroup, { props })
    }
  }).$mount(div)

  const instance = messageVm.$children[0] // 确保实例存在

  return {
    add (options) {
      if (instance) instance.add(options)
    },
    remove (options) {
      if (instance) instance.remove(options)
    },
    component: instance,
    destroy () {
      if (instance) instance.closeAll()
      setTimeout(() => {
        if (div.parentNode) div.parentNode.removeChild(div)
      }, 500)
    }
  }
}

export default MessageGroup
