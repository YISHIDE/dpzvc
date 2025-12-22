<template>
  <div class="RadioBox">
    <p>radio组合</p>
    <div class="item">
      <Radio-group v-model="radio">
        <Radio label="中国" />
        <Radio label="美国" />
        <Radio label="日本" />
      </Radio-group>
    </div>

    <div class="item">
      value:{{ radio }}
    </div>
    <p>单个Radio</p>
    <Radio
      v-model="checked"
      label="苹果"
    />
    <div class="item">
      checked:{{ checked }}
    </div>
    <p>禁用的Radio</p>
    <div class="item">
      <Radio
        label="玩具"
        disable
      />
    </div>
  </div>
</template>

<script>

export default {
  name: 'ViewRadioBox',
  data () {
    return {
      checked: false,
      radio: '',

      visible: true,
      Radioed: false
    }
  }

}
</script>

<style lang="less" scoped>
    .RadioBox {
        padding-top: 100px;
        p {
            width: 100%;
            font-weight: bold;
            font-size: 16px;
            margin: 20px 0;
        }

        .item{
            width: 100%;
            display: flex;
            justify-content: center;

        }
    }
</style>
