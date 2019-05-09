const pkg = require('./package')

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: '一块医药',
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
      { src: 'http://114.116.149.145:9999/iceInterfaces.js' }
      // { src: 'https://www.onekdrug.com/iceInterfaces.js' }
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
    'element-ui/lib/theme-chalk/index.css',
    'assets/main.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/antd-ui.js', ssr: true },
    { src: '~/plugins/vue-lazyload.js', ssr: true },
    { src: '~/plugins/element-ui', ssr: true },
    { src: '~/plugins/fs-plugin.js', ssr: false },
    { src: '~/plugins/fingerprint2.js', ssr: false },
    { src: '~/plugins/commom.js', ssr: false },
    { src: '~/plugins/clipboard2.js', ssr: false }
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    'cookie-universal-nuxt',
    '@nuxtjs/component-cache',
    ['@nuxtjs/component-cache', {
      max: 10000,
      maxAge: 1000 * 60 * 5
    }],
  ],

  /*
  ** Build configuration
  */
  build: {
    extractCSS: false,
    analyze: true,
        vendor: [],
        maxChunkSize: 300000,
        babel: {
          plugins: [
            [
              'component',
              {
                'libraryName': 'element-ui',
                'styleLibraryName': 'theme-chalk'
              }
            ]
          ]
    },
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
          'primary-color': '#dc4234',
          'link-color': '#dc4234',
          'border-radius-base': '1px',
        },
        javascriptEnabled: true
      }
    }
  }
}
