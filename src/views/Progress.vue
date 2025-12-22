<template>
  <div class="Progress">
    <DpProgress
      v-model="progress"
      :bar-height="barHeight"
    />
  </div>
</template>

<script>
export default {
  name: 'ViewDpProgress',
  data () {
    return {
      progress: 0,
      barHeight: 5
    }
  },
  mounted () {
    this.timer = setInterval(() => {
      this.progress += 1
      if (this.progress >= 100) {
        clearInterval(this.timer)
        this.time = null
      }
    }, 100)
  }
}
</script>

<style lang="less" scoped>
    .Progress {
        padding-top: 50px;
    }
</style>
