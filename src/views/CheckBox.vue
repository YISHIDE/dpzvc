<template>
  <div class="CheckBox">
    <p>checkbox组合</p>
    <div class="item">
      <CheckBox-group v-model="data">
        <CheckBox label="中国" />
        <CheckBox label="美国" />
        <CheckBox label="日本" />
      </CheckBox-group>
    </div>

    <div class="item">
      value:{{ data }}
    </div>
    <p>单个checkbox</p>
    <div class="item">
      <CheckBox
        v-model="checked"
        label="苹果"
      />
    </div>
    <div class="item">
      checked:{{ checked }}
    </div>
    <p>禁用的checkbox</p>
    <div class="item">
      <CheckBox
        label="玩具"
        disable
      />
    </div>
  </div>
</template>

<script>

export default {
  name: 'ViewCheckBox',
  data () {
    return {
      data: ['中国'],
      visible: true,
      checked: false
    }
  }

}
</script>

<style lang="less" scoped>
    .CheckBox {
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
