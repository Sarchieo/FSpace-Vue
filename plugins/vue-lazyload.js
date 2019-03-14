import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

// or with options
Vue.use(VueLazyload, {
  error: require('~/assets/img/error.png'), //图片加载失败时使用的图片源
  // loading: require('~/assets/img/loading.gif'), //图片加载的路径
  attempt: 2
})
