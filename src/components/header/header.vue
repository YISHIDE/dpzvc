<template>
  <div
    v-if="visible"
    :class="classes"
  >
    <header>
      <div
        class="left"
        @click="back"
      >
        <slot name="left">
          <span class="arrow" /><span class="text">返回</span>
        </slot>
      </div>
      <div class="title dpzvc-nowrap">
        {{ title }}
      </div>
      <div class="right">
        <slot name="right">
          <div />
        </slot>
      </div>
    </header>
    <div
      v-if="fixed"
      class="header-place"
    />
  </div>
</template>

<script>
const prefixCls = 'dpzvc-header'

export default {
  name: 'DpzVcHeader',
  props: {
    value: {
      type: Boolean,
      default: true
    },
    fixed: {
      type: Boolean,
      default: true
    },
    title: String,
    wechat: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      visible: this.value,
      isWechat: this.wechat
    }
  },
  computed: {
    classes () {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-fixed`]: !!this.fixed
        }
      ]
    },
    isWeixin () {
      return window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) === 'micromessenger'
    },
    isPcWeixin () {
      return window.navigator.userAgent.toLowerCase().match(/WindowsWechat/i) === 'windowswechat'
    }
  },
  // watch: {
  //   value (val) {
  //     this.visible = val
  //   },
  //   visible (val) {
  //     this.$emit('input', val)
  //   },
  //   wechat (val) {
  //     this.isWechat = val
  //   },
  //   isWechat (val) {
  //     this.$emit('input', val)
  //   }
  // },
  mounted () {
    if ((this.isWeixin || this.isPcWeixin) && !this.isWechat) this.visible = false
  },
  methods: {
    back () {
      this.$router ? this.$router.back() : window.history.back()
    }
  }
}
</script>
