<template>
  <div class="swipe">
    <Swipe
      :multiple="false"
      :list="files"
    >
      <template slot-scope="props">
        <!-- <div> -->
        <img :src="props.item.image">
        <!-- </div> -->
      </template>
    </Swipe>
  </div>
</template>

<script>
// TODO multiple
export default {
  name: 'ViewSwipe',
  data () {
    return {
      files: [{ id: 521, ad_id: 10, name: '\u73a9\u8f6c\u5927\u6570\u636e\u5206\u6790\uff01Spark2.X+Python \u7cbe\u534e\u5b9e\u6218\u8bfe\u7a0b', image: 'https://www.189.cn/upfiles/189v2/jt/images/2024/0/ce687527-56e0-4c0f-89f7-2688a45441ea.jpg', background: { color: '' }, link: 'https://edu.hellobi.com/course/222', sort: 0, meta: '', created_at: '2017-12-21 09:48:29', updated_at: '2017-12-21 09:48:29', deleted_at: null }, { id: 506, ad_id: 10, name: '\u6570\u636e\u5206\u6790\u62a5\u544a\u5236\u4f5c\u79d8\u7c4d\u5347\u7ea7\u7248', image: 'https://www.189.cn/upfiles/189v2/jt/images/2020/9/5436bb73-fdd8-414e-9e15-32fae4996e37.jpg', background: { color: '' }, link: 'https://edu.hellobi.com/course/132', sort: 1, meta: '', created_at: '2017-10-31 09:43:15', updated_at: '2017-12-21 09:46:16', deleted_at: null }, { id: 504, ad_id: 10, name: '\u72ec\u4e00\u65e0\u4e8c\u7684\u6570\u636e\u4ed3\u5e93\u5efa\u6a21\u6307\u5357\u7cfb\u5217\u6559\u7a0b\u5347\u7ea7\u7248 \uff08\u8fde\u8f7d\u4e2d\uff09', image: 'https://www.189.cn/upfiles/189v2/jt/images/2019/9/0223427c-7e00-4521-91f7-56dce455766b.jpg', background: { color: '' }, link: 'https://edu.hellobi.com/course/102', sort: 2, meta: '', created_at: '2017-10-18 09:35:05', updated_at: '2017-12-21 09:50:03', deleted_at: null }]

    }
  }
}
</script>

<style lang="less" scoped>
    .Swipe {
        padding-top: 100px;
        width: 100%;
    }
</style>
