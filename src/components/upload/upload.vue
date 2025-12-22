<template>
  <div
    :class="classes"
    :style="styles"
  >
    <slot>
      <div :class="wrapperClasses">
        图片上传
      </div>
    </slot>
    <input
      ref="upload"
      type="file"
      :accept="accept"
      :multiple="multiple"
      @change="showPhoto"
    >
  </div>
</template>

<script>

// import EXIF from '../../lib/exif-js'
// import MegaPixImage from '../../lib/MegaPixImage'
import exifr from 'exifr'
import MegaPixImage from '../../lib/MegaPixImage'
import { JPEG } from '../../utils/util'
const prefixCls = 'dpzvc-upload'
export default {
  name: 'DpzVcUpload',
  props: {
    multiple: {

      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: 'image/*'
    },
    //            capture: {
    //                type: String,
    //                default: ''
    //            },
    styles: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      files: [],
      fileLength: 0
    }
  },
  computed: {
    classes () {
      return [
        `${prefixCls}`
      ]
    },
    wrapperClasses () {
      return [
        `${prefixCls}-wrapper`
      ]
    }
  },
  watch: {

    files (val) {
      this.$emit('on-change-file', val)
    }
  },

  methods: {
    async showPhoto (e) {
      this.$Indicator.snake({ text: '上传中' })
      this.files = []
      const fileList = e.target.files
      this.fileLength = fileList.length

      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i]

        try {
          // 读取方向
          const Orientation = await exifr.orientation(file)

          // 读取图片数据
          const dataURL = await new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = (err) => reject(err)
          })

          const img = new Image()
          img.src = dataURL

          await new Promise((resolve) => {
            img.onload = () => {
              // 调用你原来的 create 方法
              this.create(img, Orientation)
              resolve()
            }
          })
        } catch (err) {
          console.error('读取图片或 EXIF 失败', err)
        }
      }

      e.target.value = '' // 清空选择框
    },
    //    showPhoto1(e){
    //         this.$Indicator.snake({text:'上传中'});
    //         this.files = [];
    //         let file = e.target.files;
    //         this.fileLength = file.length;
    //         let that = this;
    //         let Orientation = null;

    //         for (let i = 0; i < file.length; i++) {

    //             EXIF.getData(file[i], function () {
    //                 EXIF.getAllTags(this);
    //                 Orientation = EXIF.getTag(this, 'Orientation');

    //             });

    //             let reader = new FileReader();
    //             reader.readAsDataURL(file[i]);

    //             reader.onload = function (e) {
    //                 let img = new Image();
    //                 img.src = e.target.result;

    //                 img.onload = function (e) {

    //                     that.create(img, Orientation);

    //                 }
    //             };
    //         }
    //         e.target.value = '';

    //     },
    create (file, Orientation) {
      const _this = this
      let data = null
      const img = new Image()
      const mpImg = new MegaPixImage(file)

      mpImg.render(img, { maxWidth: 600, quality: 0.8 })
      img.onload = function () {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(this, 0, 0, canvas.width, canvas.height)
        data = canvas.toDataURL('image/jpeg', 0.8)

        if (navigator.userAgent.match(/iphone/i)) {
          if (Orientation !== '' && Orientation !== 1) {
            switch (Orientation) {
            case 6:
              _this.rotateImg(this, 'left', canvas)
              break
            case 8:
              _this.rotateImg(this, 'right', canvas)
              break
            case 3:
              _this.rotateImg(this, 'right', canvas)
              _this.rotateImg(this, 'right', canvas)
              break
            }
          }
          data = canvas.toDataURL('image/jpeg', 0.8)
        }
        if (navigator.userAgent.match(/Android/i)) {
          const JPEGEncoder = JPEG.JPEGEncoder
          const encoder = new JPEGEncoder()
          data = encoder.encode(ctx.getImageData(0, 0, canvas.width, canvas.height), 80)
        }
        const result = {
          base64: data,
          clearBase64: data.substr(data.indexOf(',') + 1)
        }

        _this.files.push(result)

        if (_this.files.length === _this.fileLength) _this.$Indicator.remove()
      }
    },
    rotateImg (img, direction, canvas) {
      const minStep = 0
      const maxStep = 3
      if (img == null) return
      const height = img.height
      const width = img.width
      let step = 2
      if (step == null) {
        step = minStep
      }
      if (direction === 'right') {
        step++
        step > maxStep && (step = minStep)
      } else {
        step--
        step < minStep && (step = maxStep)
      }
      const degree = step * 90 * Math.PI / 180
      const ctx = canvas.getContext('2d')
      switch (step) {
      case 0:
        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        break
      case 1:
        canvas.width = height
        canvas.height = width
        ctx.rotate(degree)
        ctx.drawImage(img, 0, -height, canvas.height, canvas.width)
        break
      case 2:
        canvas.width = width
        canvas.height = height
        ctx.rotate(degree)
        ctx.drawImage(img, -width, -height, canvas.width, canvas.height)
        break
      case 3:
        canvas.width = height
        canvas.height = width
        ctx.rotate(degree)
        ctx.drawImage(img, -width, 0, canvas.height, canvas.width)
        break
      }
    }
  }
}

</script>
