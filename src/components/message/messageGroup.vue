<template>
  <div
    class="dpzvc-message-group"
    :style="styles"
  >
    <Message
      v-for="(message) in messages"
      :key="message.name"
      :duration="message.duration"
      :show-left="message.showLeft"
      :right-hide="message.rightHide"
      :name="message.name"
      :type="message.type"
      :text="message.text"
      :position="message.position"
    />
  </div>
</template>

<script>

import Message from './message.vue'

// const prefixCls = 'dpzvc-message-group'

export default {
  name: 'MessageGroup',
  components: {
    Message
  },
  props: {
    styles: {
      type: Object,
      default: () => {
        return {

        }
      }
    }
  },
  data () {
    return {
      messages: []
    }
  },
  methods: {
    add (props) {
      const _prop = Object.assign({}, {
        text: '',
        showLeft: false,
        rightHide: true,
        duration: 1.5

      }, props)

      this.messages.push(_prop)
    },

    remove (name) {
      const messages = this.messages

      messages.forEach((item, index) => {
        if (item.name === name) {
          this.messages.splice(index, 1)
        }
      })
    },
    closeAll () {
      this.messages = []
    }
  }
}
</script>
