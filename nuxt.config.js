const pkg = require('./package')


module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/ice/3.6.3/Ice.js' },
      { src: 'http://39.108.85.159:8080/wlq/iceInterfaces.js' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    'ant-design-vue/dist/antd.less',
    'assets/main.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/antd-ui',
    { src: '~/plugins/vue-lazyload.js', ssr: true },
    { src: '~/plugins/fs-plugin.js', ssr: false }
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    'cookie-universal-nuxt'
  ],

  /*
  ** Build configuration
  */
  build: {
    vendor: ['vue-lazyload'],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      if(ctx.isClient) {
        config.module.unknownContextCritical = false
      }
    },
    loaders: {
      less: {
        modifyVars: {
          'primary-color': '#f73030',
          'link-color': '#f73030',
          'border-radius-base': '1px',
        },
        javascriptEnabled: true
      }
    }
  }
}
