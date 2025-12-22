<template>
  <label :class="classes">
    <span :class="wrapperClasses">
      <span :class="innerClasses" />
      <input
        v-if="!isGroup"
        type="checkbox"
        :disabled="disable"
        :checked="currentValue"
        class="dpzvc-checkbox-input noselect "
        @change="change"
      >
      <input
        v-else
        v-model="model"
        type="checkbox"
        :disabled="disable"
        :value="label"
        class="dpzvc-checkbox-input noselect "
        @change="change"
      >
    </span>
    <slot v-if="show"><span ref="slot">{{ label }}</span></slot>
  </label>
</template>

<script>
import { findComponentUpward } from '../../utils/util'
import Emitter from '../../mixin/emitter'
const prefixCls = 'dpzvc-checkbox'
export default {
  name: 'CheckBox',
  mixins: [Emitter],
  props: {

    disable: {
      type: Boolean,
      default: false
    },
    value: {
      type: Boolean,
      default: false
    },
    label: {
      type: [String, Number, Boolean]

    }

  },
  data () {
    return {
      model: [],
      isGroup: false,
      show: true,
      currentValue: this.value,
      parent: findComponentUpward(this, 'checkBoxGroup')

    }
  },
  computed: {
    classes () {
      return [
        `${prefixCls}`
      ]
    },
    wrapperClasses () {
      return [
        `${prefixCls}-wrapper`,
        {
          [`${prefixCls}-checked`]: this.currentValue,
          [`${prefixCls}-disable`]: this.disable
        }
      ]
    },
    innerClasses () {
      return [
        `${prefixCls}-inner`
      ]
    }
  },

  watch: {

    value (val) {
      this.currentValue = val
    }
  },
  mounted () {
    this.parent = findComponentUpward(this, 'CheckBoxGroup')
    if (this.parent) {
      this.isGroup = true
    }

    if (!this.isGroup) {
      this.currentValue = this.value
      if (this.$refs.slot && this.$refs.slot.innerHtml === '') {
        this.show = false
      }
    }
  },
  methods: {
    change (e) {
      if (this.disable) return
      const checked = e.target.checked
      this.currentValue = checked
      this.$emit('input', checked)
      if (this.isGroup) {
        this.parent.change(this.model)
      } else {
        this.$emit('on-change', checked)
        this.dispatch('on-form-change', checked)
      }
    }
  }
}
</script>
