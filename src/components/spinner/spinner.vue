<template>
  <component
    :is="spinner"
    :type="type"
    :size="size"
    :color="color"
  />
</template>

<script>
import SpinnerBlade from './behavior/blade.vue'
import SpinnerSnake from './behavior/snake.vue'
import SpinnerDoubleBounce from './behavior/double-bounce.vue'
import SpinnerTripleBounce from './behavior/triple-bounce.vue'
import SpinnerFadingCircle from './behavior/fading-circle.vue'

const SPINNERS = [
  'blade',
  'snake',
  'double-bounce',
  'triple-bounce',
  'fading-circle'
]

const parseSpinner = function (index) {
  index = index || 0

  if (/^\d+$/.test(index)) {
    if (SPINNERS.length <= index) {
      console.warn(`'${index}' spinner not found, use the default spinner.`)
      index = 0
    }
    return SPINNERS[index]
  }

  if (SPINNERS.indexOf(index) === -1) {
    console.warn(`'${index}' spinner not found, use the default spinner.`)
    index = SPINNERS[0]
  }
  return index
}

export default {
  name: 'DpzVcSpinner',
  components: {
    SpinnerBlade,
    SpinnerSnake,
    SpinnerDoubleBounce,
    SpinnerTripleBounce,
    SpinnerFadingCircle
  },
  props: {
    size: {
      type: [Number, String],
      default: 30
    },
    type: {
      type: [String, Number],
      default: 'snake'

    },
    color: {
      type: String,
      default: '#39f'
    }
  },
  computed: {
    spinner () {
      return `spinner-${parseSpinner(this.type)}`
    }
  }

}
</script>
