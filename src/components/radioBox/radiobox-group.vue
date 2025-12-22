<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script>

import { findComponentsDownward } from '../../utils/util'
const prefixCls = 'dpzvc-radioBoxGroup'
export default {
  name: 'RadioBoxGroup',
  props: {
    value: {
      type: [String, Boolean, Number]
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currentValue: this.value,
      children: findComponentsDownward(this, 'RadioBox')
    }
  },
  computed: {
    classes () {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-vertical`]: this.vertical
        }
      ]
    }
  },
  watch: {
    value () {
      this.updateModel()
    }
  },
  mounted () {
    this.updateModel()
  },
  methods: {
    change (data) {
      this.currentValue = data.value
      this.updateModel()
      this.$emit('input', data.value)
      this.$emit('on-change', data.value)
      this.$emit('on-form-change', data.value)
    },
    updateModel () {
      const value = this.value
      this.children = findComponentsDownward(this, 'RadioBox')
      this.children.forEach((child) => {
        child.model = value === child.label
        child.isGroup = true
      })
    }
  }
}
</script>

<style scoped>
    .dpzvc-radioBoxGroup-vertical {
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
</style>
