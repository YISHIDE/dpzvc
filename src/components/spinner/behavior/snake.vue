<template>
  <div
    class="dpzvc-spinner-snake"
    :style="spinnerStyle"
  />
</template>

<script>
import props from '../props'

export default {
  name: 'DpzVcSnake',
  mixins: [props],
  computed: {
    spinnerStyle () {
      const style = {}

      if (this.size) {
        const size = Math.ceil(this.size / 8)

        style.height = this.size + 'px'
        style.width = this.size + 'px'
        style.borderWidth = size + 'px'
      }

      if (this.color) {
        style.borderTopColor = this.color
        style.borderLeftColor = this.color
        style.borderBottomColor = this.color
      }

      return style
    }
  }
}
</script>
