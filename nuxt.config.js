const pkg = require('./package')

module.exports = {
  mode: 'universal',
  
  head: {
    title: '一块医药',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: pkg.version, name: pkg.name, content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/ice/3.6.3/Ice.js' },
      { src: 'http://114.116.149.145:9999/iceInterfaces.js' }
      // { src: 'https://www.onekdrug.com/iceInterfaces.js' }
    ] 
  },

  loading: { color: '#fff' },

  css: [
    'ant-design-vue/dist/antd.less',
    'element-ui/lib/theme-chalk/index.css',
    'assets/main.css'
  ],

  /*
  ** 插件配置
  */
  plugins: [
    { src: '~/plugins/antd-ui.js', ssr: true },
    { src: '~/plugins/vue-lazyload.js', ssr: true },
    { src: '~/plugins/element-ui', ssr: false },
    { src: '~/plugins/fs-plugin.js', ssr: false },
    { src: '~/plugins/fingerprint2.js', ssr: false },
    { src: '~/plugins/commom.js', ssr: false },
    { src: '~/plugins/clipboard2.js', ssr: false }
  ],
  
  modules: [
    'cookie-universal-nuxt'
  ],

  build: {
    vendor: ['vue-lazyload'],
    analyze: true,
    loaders: {
      less: {
        modifyVars: {
          'primary-color': '#dc4234',
          'link-color': '#dc4234',
          'border-radius-base': '1px',
        },
        javascriptEnabled: true
      }
    },
    filenames: {
      manifest: 'manifest.js?v=[hash:7]',
      vendor: 'vendor.js?v=[hash:7]',
      app: 'app.js?v=[chunkhash:7]',
      //- `chunk` build vue-server-renderer.patch.js 解决
      // chunk: '[name].js?v=[chunkhash:7]'
    }
  }
}
