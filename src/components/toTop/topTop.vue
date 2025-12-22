<template>
  <div
    v-show="back"
    :class="classes"
    :style="positionStyles"
    @click="toTop"
  >
    <slot>
      <div :class="wrapperClasses" />
    </slot>
  </div>
</template>

<script>

import { scrollTop } from '../../utils/util'
const prefixCls = 'dpzvc-toTop'
export default {
  name: 'ToTop',
  props: {
    distance: {
      type: Number,
      default: 200
    },
    bottom: {
      type: [Number, String],
      default: 30
    },
    right: {
      type: [Number, String],
      default: 30
    },
    duration: {
      type: Number,
      default: 1000
    }
  },
  data () {
    return {
      back: false
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
        `${prefixCls}-wrapper`
      ]
    },
    positionStyles () {
      return {
        bottom: this.bottom + 'px',
        right: this.right + 'px'
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.scroll, false)
    window.addEventListener('resize', this.scroll, false)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.scroll, false)
    window.removeEventListener('resize', this.scroll, false)
  },
  methods: {
    toTop () {
      scrollTop(window, window.pageYOffset, 0, this.duration)
    },
    scroll () {
      this.back = window.pageYOffset > this.distance
    }
  }
}
</script>
