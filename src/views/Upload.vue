<template>
  <div class="Upload">
    <Upload
      ref="upload"
      :multiple="true"
      @on-change-file="onChangeFile"
    />

    <template v-if="files.length">
      <img
        v-for="(item,index) in files"
        :key="index"
        :src="item.base64"
      >
    </template>
  </div>
</template>

<script>
export default {
  name: 'ViewUpload',
  data () {
    return {
      files: []
    }
  },
  methods: {
    onChangeFile (files) {
      this.files = files
    }
  }

}
</script>

<style lang="less" scoped>
    .Upload {
        height:100%;
        .upload-box {
            width:200px;
            height:100px;
            background: #008cee;
            color: #ffffff;
            text-align: center;
            line-height: 100px;
        }
    }
</style>
