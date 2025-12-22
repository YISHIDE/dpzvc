<template>
  <div class="ActionSheet">
    <VButton
      width="50%"
      @click="visible = true"
    />
    <ActionSheet
      v-model="visible"
      :items="actionSheet"
    />
  </div>
</template>

<script>
export default {
  name: 'ViewActionSheet',
  data () {
    return {
      visible: false,
      actionSheet: [
        { text: '提交' },
        { text: '确定' }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
    .ActionSheet {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
</style>
