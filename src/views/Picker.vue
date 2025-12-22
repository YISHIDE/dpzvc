<template>
  <div class="Picker">
    <Picker
      v-model="AreaVisible"
      type="AreaPicker"
      @sure="pickerSure"
      @cancle="pickerCancle"
    />
    <Picker
      v-model="DateVisible"
      type="DatePicker"
      date-value="2018/1/1"
      @sure="pickerSure"
      @cancle="pickerCancle"
    />

    <div class="item">
      <VButton
        width="40%"
        @click="DateVisible = true"
      >
        日期选择器
      </VButton>
      <VButton
        width="40%"
        @click="AreaVisible = true"
      >
        地区选择器
      </VButton>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewPicker',
  data () {
    return {
      AreaVisible: false,
      DateVisible: false
    }
  },
  methods: {
    pickerSure (value) {
      console.log(value)
      this.$Modal.confirm({ body: value.formArea || value.formatDate })
    },
    pickerCancle () {
      this.$Message.show({ text: '您选择了取消' })
    }

    // TODO    NormalPicker
  }
}
</script>

<style lang="less" scoped>
    .Picker {
        position: relative;
        height: 100%;

        .item {
            box-sizing: border-box;
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 50px 0;
        }
    }
</style>
