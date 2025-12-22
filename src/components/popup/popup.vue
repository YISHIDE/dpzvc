<template>
  <div :class="classes">
    <transition name="dpzvc-ani-fade">
      <div
        v-show="visible"
        v-if="mask"
        class="dpzvc-popup-mask"
        @click="close"
        @touchmove.prevent
      />
    </transition>
    <transition :name="'dpzvc-ani-'+position">
      <div
        v-show="visible"
        :class="popupClasses"
        :style="contentStyle"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>

const prefixCls = 'dpzvc-popup'
export default {
  name: 'DpzVcPopup',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'bottom'
    },
    showMask: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    width: {
      type: [Number, String],
      default: '100%'
    },
    height: {
      type: [Number, String]
    },
    styles: {
      type: Object,
      default () {
        return {}
      }
    }

  },
  data () {
    return {
      visible: this.value,
      mask: this.showMask
    }
  },
  computed: {
    classes () {
      return [
        `${prefixCls}`
      ]
    },
    popupClasses () {
      return [
        `${prefixCls}-${this.position}`,
        `${prefixCls}-content`
      ]
    },
    contentStyle () {
      let height = ''

      if (this.height != null) {
        height = this.height
      } else {
        switch (this.position) {
        case 'top':
          height = 'auto'
          break
        default:
          height = '100%'
        }
      }

      return Object.assign({}, this.styles, {
        width: this.width,
        height

      })
    }
  },
  watch: {
    value (val) {
      this.visible = val
    },
    visible (val) {
      this.$emit('input', val)
    },
    showMask (val) {
      this.mask = val
    },
    mask (val) {
      switch (this.position) {
      case 'top':
        return false
      default:
        return val
      }
    }
  },
  methods: {
    close () {
      if (this.maskClosable && this.showMask) this.visible = false
    }
  }
}
</script>
