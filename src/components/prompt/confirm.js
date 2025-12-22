/**
 * Created by admin on 2025/12/10
 * Rewritten for Vue 2.7 + Vue CLI (runtime-only)
 */

import Vue from 'vue'
import Prompt from '../prompt/prompt.vue'

Prompt.newInstance = (properties = {}) => {
  // 1. 创建构造器
  const PromptConstructor = Vue.extend(Prompt)

  // 2. 初始化 props（等价你之前 data + v-model）
  const instance = new PromptConstructor({
    propsData: {
      // 外部传入
      ...properties,

      // 默认值（保持你原来的语义）
      visible: false,
      text: '',
      placeholderText: '请输入',
      width: '70%',
      title: '',
      okText: '确定',
      cancleText: '取消',
      loading: false,
      showCancle: true,
      spec: '',
      message: '',
      validator: null,
      onOk: () => {},
      onCancle: () => {}
    }
  })

  // 3. 挂载到 DOM
  instance.$mount()
  document.body.appendChild(instance.$el)

  // 4. 移除逻辑（统一）
  const destroy = () => {
    instance.visible = false
    setTimeout(() => {
      instance.$destroy()
      instance.$el && document.body.removeChild(instance.$el)
      instance.onRemove && instance.onRemove()
    }, 300)
  }

  return {
    /**
     * 显示 Prompt
     */
    show (props = {}) {
      Object.keys(props).forEach(key => {
        instance[key] = props[key]
      })
      instance.visible = true
    },

    /**
     * 关闭 Prompt
     */
    remove () {
      instance.visible = false
      instance.buttonLoading = false
      destroy()
    },

    component: instance
  }
}

export default Prompt
