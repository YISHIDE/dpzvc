<template>
  <div
    :class="classes"
    :style="styles"
  >
    <slot name="left" />
    <div :class="outerClass">
      <div
        :class="runawayClass"
        :style="runawayStyle"
      />
      <div
        :class="progressClass"
        :style="progressStyle"
      />
    </div>
    <slot name="right" />
  </div>
</template>

<script>

const prefixCls = 'dpzvc-progress'
export default {
  name: 'DpzVcProgress',

  props: {
    styles: {
      type: Object,
      default () {
        return {}
      }
    },
    value: {
      type: [Number, String],
      default: '0'
    },
    barHeight: {
      type: [String, Number],
      default: '3'
    }

  },
  data () {
    return {
      width: this.value
    }
  },
  computed: {
    classes () {
      return [
        `${prefixCls}`
      ]
    },
    outerClass () {
      return [
        `${prefixCls}-outer`
      ]
    },
    runawayClass () {
      return [
        `${prefixCls}-runaway`
      ]
    },
    progressClass () {
      return [
        `${prefixCls}-progress`
      ]
    },
    runawayStyle () {
      return { height: this.barHeight + 'px' }
    },
    progressStyle () {
      return { height: this.barHeight + 'px', width: this.width + '%' }
    }
  },
  watch: {
    value (val) {
      this.width = val >= 100 ? 100 : val
    }
  }

}
</script>
