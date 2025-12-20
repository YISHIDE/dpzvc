import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './components/app.vue';
import Routers from './router';
import Config from './config/config';
import dpzvc from './index';

// 安装自定义组件库
Vue.use(dpzvc);

Vue.use(VueRouter);

// 配置全局变量
Vue.prototype.$Config = Config;

// 创建全局事件总线
window.EventBus = new Vue();

// 路由配置
const router = new VueRouter({
  mode: process.env.NODE_ENV !== 'production' ? 'hash' : 'history', // VueRouter 3 兼容写法
  routes: Routers
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});
// 根实例
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});