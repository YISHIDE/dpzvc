<template>
  <div>
    <Popup
      v-model="visible"
      position="bottom"
      :styles="{background:'transparent'}"
    >
      <div :class="classes">
        <ul :class="wrapperClasses">
          <li
            v-for="(item,key) in actions"
            :key="key"
            :class="wrapperActionClass"
            @click="emit(item,key)"
          >
            <span>{{ item.text }}</span>
          </li>
        </ul>
        <a
          v-if="cancleText"
          href="javascript:;"
          :class="cancleClass"
          @click="visible = false"
        >{{ cancleText }}</a>
      </div>
    </Popup>
  </div>
</template>

<script>

import Popup from '../popup'
const prefixCls = 'dpzvc-actionSheet'

export default {
  name: 'ActionSheet',
  components: {
    Popup
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    items: Array,
    cancleText: {
      type: String,
      default: '取消'
    }
  },

  data () {
    return {
      actions: this.items,
      visible: this.value
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
    wrapperActionClass () {
      return [
        `${prefixCls}-wrapper-action`
      ]
    },
    cancleClass () {
      return [
        `${prefixCls}-cancle`
      ]
    }
  },
  watch: {
    value (val) {
      this.visible = val
    },

    visible (val) {
      this.$emit('input', val)
    }
  },

  methods: {
    emit (item, index) {
      if (item.onClick && typeof item.onClick === 'function') {
        item.onClick(item, index)
      }

      this.visible = false
    }

  }

}
</script>
