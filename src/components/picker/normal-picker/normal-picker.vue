<template>
  <div :class="classes">
    <div class="header">
      <div
        class="left"
        @click="cancle"
      >
        取消
      </div>
      <div
        class="right"
        @click="sure"
      >
        确定
      </div>
    </div>
    <div class="main">
      <template v-if="shadowList.length">
        <picker-slot
          v-for="(item,key) in shadowList"
          :key="item.target"
          :target="item.target"
          :init-item="initItems[key]"
          :list="item.list"
          @change="change"
        />
      </template>
    </div>
  </div>
</template>

<script>
import Emitter from '../../../mixin/emitter'
import PickerSlot from '../picker-slot.vue'
import props from './props'
const prefixCls = 'dpzvc-normal-picker'
export default {
  name: 'NormalPicker',

  components: {
    PickerSlot
  },
  mixins: [Emitter, props],
  data () {
    return {
      initItems: this.initArr.length ? this.initArr : this.list.map((item) => { return item.list[0].code }),
      normal: {}
    }
  },
  computed: {
    classes () {
      return [
        `${prefixCls}`
      ]
    },
    shadowList () {
      const list = this.list
      for (let i = 0, listLength = list.length; i < listLength; i++) {
        if (Object.prototype.hasOwnProperty.call(list[i], 'list') && list[i].list.length) {
          for (let j = 0, childLength = list[i].list.length; j < childLength; j++) {
            if (!Object.prototype.hasOwnProperty.call(list[i].list[j], 'value')) return []
            // if (!list[i].list[j].hasOwnProperty('value')) return []

            // if (!list[i].list[j].hasOwnProperty('code')) {
            if (!Object.prototype.hasOwnProperty.call(list[i].list[j], 'code')) {
              list[i].list[j].code = list[i].list[j].value
            }

            // if (!list[i].list[j].hasOwnProperty('target')) {
            if (!Object.prototype.hasOwnProperty.call(list[i].list[j], 'target')) {
              list[i].list[j].target = list[i].target
            }

            list[i].list[j].index = j
          }
        }
      }

      return list
    }
  },
  watch: {
    initArr (val) {
      this.initItems = this.initArr.length ? this.initArr : this.list.map((item) => { return item.list[0].value })
    }
  },
  methods: {
    cancle () {
      this.dispatch('DpzVcPicker', 'fail')
    },
    sure () {
      this.dispatch('DpzVcPicker', 'ok', this.normal)
    },
    change (target, current) {
      this.$nextTick(() => {
        for (let i = 0; i < this.shadowList.length; i++) {
          if (this.shadowList[i].target === target) {
            for (let j = 0; i < this.shadowList[i].length; j++) {
              if (current.code === this.shadowList[i].list[j].code) {
                this.$set(this.initItems, i, this.shadowList[i].list[j].code)
                break
              }
            }
          }
        }
        this.normal = Object.assign({}, this.normal, { [target]: current })

        this.dispatch('DpzVcPicker', 'scroll', current)
      })
    }
  }
}
</script>
