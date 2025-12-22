<template>
  <div :class="classes">
    <input
      :id="name"
      v-model="currentValue"
      type="checkbox"
      :class="inputCheckClasses"
    >
    <label
      :for="name"
      :class="sizeClasses"
    />
  </div>
</template>

<script>
import { randomStr } from '../../utils/util'
const prefixCls = 'dpzvc-switch'
export default {
  name: 'SwitchBar',
  props: {
    id: {
      type: String
    },
    value: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'small',
      validator (val) {
        return ['small', 'large'].indexOf(val) > -1
      }
    }
  },
  data () {
    return {
      name: this.id,
      currentValue: this.value
    }
  },
  computed: {
    classes () {
      return [
        `${prefixCls}`
      ]
    },
    inputCheckClasses () {
      return [
        `${prefixCls}-checkbox`,
        'hidden'

      ]
    },
    sizeClasses () {
      return [
        `${prefixCls}-ui`,
        {
          small: this.size === 'small'
        }
      ]
    }
  },
  watch: {
    value (val) {
      this.currentValue = val
    },

    id (val) {
      this.name = val
    },

    currentValue (val) {
      this.$emit('input', val)
    }

  },
  mounted () {
    if (!this.id) {
      this.name = Date.now() + '_' + randomStr()
    }
  }
}
</script>
