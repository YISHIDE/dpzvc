<template>
  <transition name="dpzvc-ani-scale">
    <div :class="classes">
      <div
        v-if="showLeft"
        :class="leftClasses"
      >
        <slot name="message-left">
          <Spinner
            size="65"
            type="blade"
            color="#ffffff"
          />
        </slot>
      </div>
      <p :class="wrapperClasses">
        {{ text }}
      </p>
      <div
        v-if="!rightHide"
        :class="rightClasses"
      >
        <slot name="message-right" />
      </div>
    </div>
  </transition>
</template>

<script>
import Spinner from '../spinner'
const prefixCls = 'dpzvc-message'
// const defaultDuration = 1
export default {
  name: 'DpzMessage',
  components: {
    Spinner
  },
  props: {
    name: {
      type: [String, Number],
      required: true
    },
    text: {
      type: [Number, String],
      default: ''
    },

    duration: {
      type: Number,
      default: 1.5
    },
    showLeft: {
      type: Boolean,
      default: false
    },
    rightHide: {
      type: Boolean,
      default: true
    },
    // TODO
    type: {
      type: String,
      default: 'normal',
      validator: (val) => {
        return ['success', 'loading', 'error', 'normal', 'warning', 'danger'].indexOf(val) > -1
      }
    },
    onClose: {
      type: Function,
      default: function () {

      }
    },
    position: {
      type: String,
      default: 'top'
    }
  },

  data () {
    return {}
  },
  computed: {
    classes () {
      return [

        `${prefixCls}`,
        `${prefixCls}-position-${this.position}`
      ]
    },
    wrapperClasses () {
      return [
        `${prefixCls}-text`
      ]
    },
    leftClasses () {
      return [
        `${prefixCls}-left`
      ]
    },
    rightClasses () {
      return [
        `${prefixCls}-right`
      ]
    }

  },

  mounted () {
    this.closeTimer()

    if (this.duration !== 0) {
      this.timer = setTimeout(() => {
        this.close()
      }, this.duration * 1000)
    }
  },
  beforeDestroy () {
    this.closeTimer()
  },

  methods: {

    close () {
      this.closeTimer()
      this.$parent.remove(this.name)
      this.onClose()
    },
    closeTimer () {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
    }

  }

}
</script>
