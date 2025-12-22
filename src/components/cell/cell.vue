<template>
  <a
    :href="toLink"
    :class="classes"
  >
    <span
      v-if="hasMask"
      :class="maskClass"
    />
    <div :class="leftClasses">
      <slot name="left" />
    </div>
    <div :class="wrapperClasses">
      <div :class="titleClass">
        <slot name="icon" />
        <slot name="title">
          <span v-text="title" />
          <span
            :class="labelClass"
            v-text="label"
          />
        </slot>
      </div>
      <div :class="valueClass">
        <slot name="value">
          <span v-text="value">说明</span>
        </slot>
      </div>
    </div>
    <div :class="rightClasses">
      <slot name="right" />
    </div>
  </a>
</template>

<script>

const prefixCls = 'dpzvc-cell'
export default {
  name: 'DpzVcCell',
  props: {
    title: String,
    value: {},
    label: String,
    link: String,
    hasMask: Boolean
  },
  computed: {
    toLink () {
      if (this.link && this.$router) {
        const matchLink = this.$router.match(this.link)
        if (!matchLink.matched.length) return this.link

        // eslint-disable-next-line vue/no-async-in-computed-properties
        this.$nextTick(() => {
          this.$el.addEventListener('click', this.handleClick, false)
        })
      }

      return this.link
    },
    classes () {
      return [
        `${prefixCls}`
      ]
    },
    maskClass () {
      return [
        `${prefixCls}-mask`
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
    },
    wrapperClasses () {
      return [
        `${prefixCls}-main`,
        'dpzvc-1px-top'
      ]
    },
    titleClass () {
      return [
        `${prefixCls}-main-title`
      ]
    },
    valueClass () {
      return [
        `${prefixCls}-main-value`
      ]
    },
    labelClass () {
      return [
        `${prefixCls}-main-label`
      ]
    }
  },
  methods: {
    handleClick (e) {
      e.preventDefault()
      this.$router.push(this.link)
    }
  }

}
</script>
