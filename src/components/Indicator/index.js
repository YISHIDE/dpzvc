/**
 * Indicator - Vue 2.7 CLI 适配版
 */

import Vue from 'vue'
import Indicator from './Indicator.vue'

let instance = null

function createInstance (props = {}) {
  const IndicatorConstructor = Vue.extend(Indicator)

  const vm = new IndicatorConstructor({
    propsData: {
      size: 45,
      type: 'snake',
      color: '#ffffff',
      text: '加载中...',
      ...props
    }
  })

  vm.$mount()
  document.body.appendChild(vm.$el)

  vm.visible = false

  vm.$on('remove', () => {
    destroyInstance()
  })

  return vm
}

function destroyInstance () {
  if (!instance) return
  instance.$destroy()
  if (instance.$el && instance.$el.parentNode) {
    instance.$el.parentNode.removeChild(instance.$el)
  }
  instance = null
}

function open (options = {}) {
  if (!instance) {
    instance = createInstance(options)
  }

  Object.keys(options).forEach(key => {
    instance.$props[key] = options[key]
  })

  instance.$props.value = true
}

function close () {
  if (!instance) return
  instance.$props.value = false
  destroyInstance()
}

/* ================== 对外 API ================== */

Indicator.open = open

Indicator.remove = close

Indicator.snake = function (props = {}) {
  props.type = 'snake'
  open(props)
}

Indicator.blade = function (props = {}) {
  props.type = 'blade'
  open(props)
}

Indicator.circle = function (props = {}) {
  props.type = 'fading-circle'
  open(props)
}

Indicator.bounce = function (props = {}) {
  props.type = 'double-bounce'
  open(props)
}

export default Indicator
