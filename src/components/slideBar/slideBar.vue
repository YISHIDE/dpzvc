<template>
  <div
    :class="classes"
    :style="getStyles"
  >
    <div
      ref="header"
      :class="headerClasses"
    >
      <div
        ref="wrapper"
        :class="wrapperClasses"
        :style="{width:isFlex ? 'auto' : items.length * getItemWidth + 'px'}"
      >
        <div
          v-for="(item,key) in items"
          :key="key"
          :class="['dpzvc-slideBar-child',startIndex == key ? 'active':'',!isFlex ? 'normalChild':'']"
          :style="{textAlign:textAlign,width:getItemWidth+'px',height:scrollHeight,lineHeight:scrollHeight}"
          @click="changeBar(key,$event)"
        >
          <slot :name="'slide-bar-header-'+key">
            <a class="content ellipse-fir">{{ item.name }}</a>
          </slot>
        </div>
      </div>

      <div
        :class="absoluteClass"
        :style="getScrollStyle"
      />
    </div>
    <div
      :class="containerClass"
      :style="{height:height}"
    >
      <div
        ref="content"
        :class="contentClasses"
        :style="getContainerStyle"
      >
        <div
          v-for="(item,index) in items"
          :key="index"
          :class="['dpzvc-slideBar-content-item',startIndex == index ? 'active':'' ]"
          :style="{width:clientWidth+'px'}"
        >
          <slot :name="'slot-item-'+index" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const prefixCls = 'dpzvc-slideBar'
export default {
  props: {
    scrollHeight: {
      type: [String, Number],
      default: '30px'
    },
    height: {
      type: [String, Number],
      default: '100%'
    },
    styles: {
      type: Object,
      default: () => {
      }
    },
    childWidth: {
      type: Number,
      default: 70
    },
    scrollColor: {
      type: String,
      default: '#036eb8'
    },
    textAlign: {
      type: String,
      default: 'center'
    },
    flex: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'normal'
    },
    onChange: {
      type: Function
    },
    list: {
      type: Array,
      default: () => [{ name: '1' }, { name: '2' }, { name: '3' }, { name: '4' }]
    },
    index: {
      type: [Number, String],
      default: 0
    },
    distanceIndex: {
      type: Number,
      default: 1.5
    },
    canDrag: {
      type: Boolean,
      default: true
    }
    //            isFixedHeader: {
    //                type: Boolean,
    //                default: false
    //            }
  },
  data () {
    return {
      translateX: 0,
      scrollWidth: 0,
      clientWidth: 0,
      startIndex: this.index,
      startTranslateX: 0,
      startX: 0,
      currentX: 0,
      dragging: false,
      distance: 0,
      items: this.list,
      fixed: false,
      isFlex: this.flex
    }
  },
  computed: {
    getItemWidth () {
      return this.isFlex ? this.clientWidth / this.items.length : this.childWidth
    },
    classes () {
      return [
        `${prefixCls}`
      ]
    },
    headerClasses () {
      return [
        `${prefixCls}-header`,
        {
          fixed: this.fixed
        }
      ]
    },
    wrapperClasses () {
      return [
        `${prefixCls}-wrapper`,
        this.isFlex ? `${prefixCls}-flex` : `${prefixCls}-slide`,
        {
          normal: this.type === 'normal' && this.isFlex,
          vertical: this.type === 'vertical' && this.isFlex
        }
      ]
    },
    contentClasses () {
      return [
        `${prefixCls}-content`,
        {
          [`${prefixCls}-dragging`]: this.dragging
        }
      ]
    },
    absoluteClass () {
      return [
        `${prefixCls}-wrapper-absolute`
      ]
    },
    containerClass () {
      return [
        `${prefixCls}-container`
      ]
    },
    getStyles () {
      const style = {}
      const customStyle = this.styles ? this.styles : {}
      //                let fixedStyle = {paddingTop: this.fixed ? this.scrollHeight : 0}
      Object.assign(style, customStyle)
      return style
    },
    getContainerStyle () {
      return {
        width: `${this.clientWidth * this.items.length}px`,
        transform: `translate3d(${this.translateX}px,0,0)`
      }
    },
    getScrollStyle () {
      return {
        width: `${this.getItemWidth}px`,
        transform: `translate3d(${this.startIndex * this.getItemWidth}px,0,0)`,
        backgroundColor: this.scrollColor
      }
    },
    wrapperWidth () {
      return this.isFlex ? 'auto' : `${this.getItemWidth * this.items.length}px`
    },
    maxIndex () {
      return this.items.length - 1
    }
  },
  watch: {
    index (val) {
      this.startIndex = val
    },
    startIndex (val) {
      this.translateX = -val * this.clientWidth
    },
    list (val) {
      this.items = val
    }
  },
  mounted () {
    this.clientWidth = this.$el.clientWidth
    this.translateX = -this.startIndex * this.clientWidth
    this.onScroll()
    this.bindEvents()
  },
  beforeDestroy () {
    this.unbindEvents()
  },
  methods: {
    changeBar (index, event) {
      if (this.startIndex === index) return
      this.startIndex = index
      this.translateX = -this.startIndex * this.clientWidth
      this.$emit('on-change', index)
    },
    onTouchStart (e) {
      this.startTranslateX = this.translateX
      this.distance = 0
      this.startX = e.touches[0].clientX
      this.dragging = true
    },
    onTouchMove (e) {
      this.currentX = e.touches[0].clientX
      if (this.distanceIndex) this.distance = (this.currentX - this.startX) / this.distanceIndex
      else this.distance = this.currentX - this.startX
      this.translateX = this.startTranslateX + this.distance
    },
    onTouchEnd (e) {
      if (this.distance < 0 && Math.abs(this.distance) > this.clientWidth / 2) {
        this.onSlideLeft()
      } else if (this.distance > 0 && Math.abs(this.distance) > this.clientWidth / 2) {
        this.onSlideRight()
      } else {
        this.translateX = this.startTranslateX
      }
      this.dragging = false
    },
    onSlideLeft () {
      if (++this.startIndex > this.maxIndex) {
        this.startIndex--
        this.translateX = this.startTranslateX
      } else {
        this.translateX = this.startTranslateX - this.clientWidth
      }
      this.$emit('on-change', this.startIndex)
    },
    onSlideRight () {
      if (--this.startIndex < 0) {
        this.startIndex++
        this.translateX = this.startTranslateX
      } else {
        this.translateX = this.startTranslateX + this.clientWidth
      }
      this.$emit('on-change', this.startIndex)
    },
    onScroll (e) {
      this.$el.getBoundingClientRect().top <= 0 ? this.fixed = true : this.fixed = false
    },
    onResize () {
      this.clientWidth = this.$el.clientWidth
    },
    bindEvents () {
      if (this.canDrag) {
        this.$refs.content.addEventListener('touchstart', this.onTouchStart)
        this.$refs.content.addEventListener('touchmove', this.onTouchMove)
        this.$refs.content.addEventListener('touchend', this.onTouchEnd)
      }
      window.addEventListener('resize', this.onResize)
    },
    unbindEvents () {
      this.$refs.content.removeEventListener('touchstart', this.onTouchStart)
      this.$refs.content.removeEventListener('touchmove', this.onTouchMove)
      this.$refs.content.removeEventListener('touchend', this.onTouchEnd)
      //                window.removeEventListener('scroll', this.onScroll);
      window.removeEventListener('resize', this.onResize)
    }
  }
}
</script>
