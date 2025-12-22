<template>
  <div
    :class="classes"
    :style="styles"
  >
    <label
      v-if="type !== 'textarea'"
      :class="inputClasses"
      :style="inputStyles"
    >
      <input
        :type="type"
        :autofocus="autofocus"
        :value="currentVal"
        :placeholder="placeholder"
        :readonly="readonly"
        :maxlength="maxlength"
        :autocomplete="autocomplete"
        :name="name"
        :disabled="disable"
        @input="changeInput"
        @blur="blurInput"
        @focus="focusInput"
        @keyup.enter="enterInput"
        @change="onChangeInput"
      >
    </label>

    <label
      v-else
      :class="textareaClasses"
    >
      <textarea
        :type="type"
        :autofocus="autofocus"
        :value="currentVal"
        :placeholder="placeholder"
        :readonly="readonly"
        :maxlength="maxlength"
        :name="name"
        :rows="rows"
        :disabled="disable"
        @input="changeInput"
        @blur="blurInput"
        @focus="focusInput"
        @keyup.enter="enterInput"
        @change="onChangeInput"
      />
    </label>
  </div>
</template>

<script>
import Input from '../../mixin/input'
const prefixCls = 'dpzvc-textBar'
export default {
  name: 'TextBar',
  mixins: [Input],
  props: {
    rows: {
      type: Number
    },
    autofocus: {
      type: Boolean,
      default: true
    },

    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: [String, Number],
      default: ''
    },

    placeholder: {
      type: [String, Number],
      default: '请输入'
    },
    inputStyles: {
      type: Object

    },
    maxlength: {
      type: Number
    },
    name: String,
    readonly: {
      type: Boolean,
      default: false
    }

  },
  data () {
    return {
      currentVal: this.value
    }
  },
  computed: {
    classes () {
      return [
        `${prefixCls}`
      ]
    },
    inputClasses () {
      return [
        `${prefixCls}-input`
      ]
    },
    textareaClasses () {
      return [
        `${prefixCls}-textarea`
      ]
    }
  },
  watch: {
    value (val) {
      this.currentVal = val
    },
    currentVal (val) {
      this.$emit('input', val)
      this.$emit('on-input', val)
    }

  },

  mounted () {

  },
  methods: {
    changeInput (e) {
      this.currentVal = e.target.value

      this.$emit('input', this.currentVal)
      this.$emit('on-input', e)
    },

    enterInput (e) {
      this.$emit('on-enter', e)
    }

  }
}
</script>
