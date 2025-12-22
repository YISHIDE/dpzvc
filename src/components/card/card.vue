<template>
  <div
    :class="classes"
    :style="{width:width}"
  >
    <div :class="headerClass">
      <slot name="header" />
    </div>
    <div :class="contentClass">
      <slot>
        <div class="main" />
      </slot>
    </div>
    <div :class="footerClass">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>

const prefixCls = 'dpzvc-card'
export default {
  name: 'DpzVcCard',
  props: {
    width: {
      type: String,
      default: '100%'
    }
  },

  data () {
    return {

    }
  },
  computed: {
    classes () {
      return [
        `${prefixCls}`
      ]
    },
    headerClass () {
      return [
        `${prefixCls}-header`,
        'dpzvc-1px-bottom'
      ]
    },
    contentClass () {
      return [
        `${prefixCls}-content`
      ]
    },
    footerClass () {
      return [
        `${prefixCls}-footer`,
        'dpzvc-1px-top'
      ]
    }
  }
}
</script>
