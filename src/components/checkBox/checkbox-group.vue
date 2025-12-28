<template>
  <div
    :class="[
      'dpzvc-checkBoxGroup',
      vertical ? 'dpzvc-checkBoxGroup-vertical' : '',
    ]"
  >
    <slot />
  </div>
</template>

<script>

import { findComponentsDownward } from '../../utils/util'
import Emitter from '../../mixin/emitter'
export default {
  name: 'CheckBoxGroup',
  mixins: [Emitter],
  props: {
    value: {
      type: Array,
      default: () => []
    },
    single: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    }

  },
  data () {
    return {
      currentValue: this.value,
      childrens: []
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
      this.currentValue = data
      // alert(data)
      this.$emit('input', data)
      this.$emit('on-change', data)
      this.dispatch('on-form-change', data)
    },
    updateModel () {
      const model = this.value
      this.childrens = findComponentsDownward(this, 'checkBox')
      if (this.childrens) {
        this.childrens.forEach((child) => {
          child.model = model
          child.currentValue = model.indexOf(child.label) >= 0
          child.isGroup = true
        })
      }
    }
  }
}
</script>

<style scoped>
.dpzvc-checkBoxGroup-vertical {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
