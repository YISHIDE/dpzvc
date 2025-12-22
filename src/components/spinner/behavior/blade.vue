<template>
  <div
    class="dpzvc-spinner-blade"
    :style="spinnerStyle"
  >
    <div
      v-for="(i,key) in 12"
      :key="key"
      class="blade"
      :class="'blade-' + i"
      :style="bladeStyle"
    />
  </div>
</template>

<script type="text/ecmascript-6">
import props from '../props'

export default {
  name: 'DpzVcBlade',
  mixins: [props],
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    bladeStyle () {
      if (this.color) {
        return {
          backgroundColor: this.color
        }
      }
    }
  }
}
</script>
