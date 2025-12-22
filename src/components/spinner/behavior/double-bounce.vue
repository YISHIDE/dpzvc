<template>
  <div
    class="dpzvc-spinner-double-bounce"
    :style="spinnerStyle"
  >
    <div
      v-for="(i,key) in 2"
      :key="key"
      class="bounce"
      :class="'bounce-' + i"
      :style="bounceStyle"
    />
  </div>
</template>

<script>
import props from '../props'

export default {
  mixins: [props],
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    bounceStyle () {
      if (this.color) {
        return {
          backgroundColor: this.color
        }
      }
    }
  }
}
</script>
