/**
 * confirm.js - 适配 Vue 2.7 runtime-only
 */
import Vue from 'vue';
import Modal from './modal.vue';
import VButton from '../button';
import { camelcaseToHyphen } from '../../utils/util';

const prefixCls = 'dpzvc-modal';

Modal.newInstance = function(properties = {}) {
  // 创建一个新的 Vue 构造函数
  const ModalConstructor = Vue.extend({
    components: { Modal, VButton },
    data() {
      return Object.assign({
        visible: false,
        width: '70%',
        body: '',
        title: '',
        okText: '确定',
        cancleText: '取消',
        loading: false,
        buttonLoading: false,
        showCancle: true,
        showHead: true,
        onOk: () => {},
        onCancle: () => {},
        onRemove: () => {}
      }, properties);
    },
    render(h) {
      const footer = [
        this.showCancle
          ? h('v-button', { 
              props: { type: 'primary', radius: false }, 
              on: { click: this.cancle } 
            }, this.cancleText)
          : null,
        h('v-button', { 
          props: { type: 'normal', radius: false, loading: this.buttonLoading }, 
          on: { click: this.ok } 
        }, this.okText)
      ];

      return h(Modal, {
        props: {
          value: this.visible,
          width: this.width,
          showHead: this.showHead,
          footerHide: false
        },
        on: {
          'on-ok': this.ok,
          'on-cancle': this.cancle
        }
      }, [
        h('div', { slot: 'header', domProps: { innerHTML: this.title }, class: `${prefixCls}-header-inner ellipse-fir` }),
        h('div', { slot: 'body', domProps: { innerHTML: this.body }, class: `${prefixCls}-body-inner` }),
        h('template', { slot: 'footer' }, footer)
      ]);
    },
    methods: {
      cancle() {
        this.visible = false;
        this.onCancle();
        this.remove();
      },
      ok() {
        if (this.loading) {
          this.buttonLoading = true;
        } else {
          this.visible = false;
          this.remove();
        }
        this.onOk();
      },
      remove() {
        this.visible = false;
        setTimeout(() => this.destroy(), 300);
      },
      destroy() {
        this.$destroy();
        if (this.$el && this.$el.parentNode) {
          this.$el.parentNode.removeChild(this.$el);
        }
        this.onRemove();
      }
    }
  });

  // 实例化并挂载到 DOM
  const div = document.createElement('div');
  document.body.appendChild(div);
  const instance = new ModalConstructor().$mount(div);

  return {
    show(props = {}) {
      Object.keys(props).forEach(key => {
        if (key in instance) {
          instance[key] = props[key];
        }
      });
      instance.visible = true;
    },
    remove() {
      instance.remove();
    },
    component: instance
  };
};

export default Modal;

