<template>
  <Popup
    v-model="visible"
    height="284px"
    position="bottom"
  >
    <div :class="wrapperClass">
      <div :class="contentClass">
        <Area-picker
          v-if="type==='AreaPicker'"
          :styles="styles"
          :value-separator="valueSeparator"
          :address-value="addressValue"
        />

        <Date-picker
          v-if="type==='DatePicker'"
          :year="year"
          :month="month"
          :day="day"
          :value-separator="valueSeparator"
          :date-value="dateValue"
        />

        <Normal-picker
          v-if="type==='NormalPicker'"
          :list="list"
          :init-arr="initArr"
        />
      </div>
    </div>
  </Popup>
</template>

<script>

import areaProps from './area-picker/props'
import dateProps from './date-picker/props'
import normalProps from './normal-picker/props'
import Popup from '../popup'
import AreaPicker from './area-picker/area-picker.vue'
import DatePicker from './date-picker/date-picker.vue'
import NormalPicker from './normal-picker/normal-picker.vue'
const LIST = ['DatePicker', 'AreaPicker', 'NormalPicker']
const prefixCls = 'dpzvc-picker'
export default {
  name: 'DpzVcPicker',

  components: {
    AreaPicker,
    DatePicker,
    NormalPicker,
    Popup
  },
  mixins: [areaProps, dateProps, normalProps],
  props: {
    type: {
      type: String,
      default: 'DatePicker',
      validator (val) {
        return LIST.indexOf(val) > -1
      }
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      visible: this.value
    }
  },
  computed: {
    wrapperClass () {
      return [
        `${prefixCls}-wrapper`
      ]
    },
    contentClass () {
      return [
        `${prefixCls}-content`
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
  created () {
    this.$on('ok', (val) => {
      this.visible = false
      this.$emit('sure', val)
    })

    this.$on('fail', () => {
      this.visible = false
      this.$emit('cancle')
    })

    this.$on('scroll', (val) => {
      this.$emit('normal-change', val)
    })
  },
  mounted () {
    //            console.log(DatePicker)
  }
}
</script>
