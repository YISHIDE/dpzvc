<template>
  <div>
    <transition name="dpzvc-ani-fade">
      <div
        v-show="visible"
        class="dpzvc-modal-mask"
        @click="mask"
        @touchstart.prevent
        @touchmove.prevent
        @touchend.prevent
      />
    </transition>

    <transition name="dpzvc-ani-scale">
      <div
        v-show="visible"
        class="dpzvc-modal "
        :style="getWrapperStyle"
      >
        <div
          v-if="isHead"
          class="dpzvc-modal-header"
        >
          <slot name="header">
            <div
              slot="header"
              class="dpzvc-modal-header-inner ellipse-fir"
            >
              {{ title }}
            </div>
          </slot>
        </div>
        <div class="dpzvc-modal-body">
          <slot name="body">
            {{ body }}
          </slot>
        </div>
        <div
          v-if="!footerHide"
          class="dpzvc-modal-footer"
        >
          <slot name="footer">
            <v-button
              v-if="cancleText"
              type="primary"
              @click="close"
            >
              {{ cancleText }}
            </v-button>
            <v-button
              type="normal"
              :loading="buttonLoading"
              @click="ok"
            >
              {{ okText }}
            </v-button>
          </slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Emitter from '../../mixin/emitter'
import VButton from '../button'

export default {
  name: 'DpzVcModal',

  components: {
    VButton
  },
  mixins: [Emitter],

  props: {
    value: {
      type: Boolean,
      default: false
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    title: {
      type: String
    },
    width: {
      type: String,
      default: '70%'
    },
    okText: {
      type: String,
      default () {
        return '确定'
      }
    },
    cancleText: {
      type: String,
      default () {
        return '取消'
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    styles: {
      type: Object
    },
    showHead: {
      type: Boolean,
      default: true
    },
    footerHide: {
      type: Boolean,
      default: false
    },
    body: String
  },
  data () {
    return {
      isHead: this.showHead,
      visible: this.value,
      buttonLoading: false
    }
  },
  computed: {
    getWrapperStyle () {
      const style = {}

      const styleWidth = {

        width: `${this.width}`
      }

      const customStyle = this.styles ? this.styles : {}

      Object.assign(style, styleWidth, customStyle)

      return style
    }

  },
  watch: {
    value (val) {
      this.visible = val
    },
    showHead (val) {
      this.isHead = val
    }
  },
  methods: {
    close () {
      this.visible = false
      this.$emit('on-cancle')
    },
    mask () {
      if (!this.maskClosable && !this.buttonLoading) {
        this.close()
      }
    },
    ok () {
      if (this.loading) {
        this.buttonLoading = true
      } else {
        this.visible = false
      }

      this.$emit('on-ok')
    }
  }

}
</script>
