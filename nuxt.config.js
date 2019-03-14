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
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/ice/3.6.3/Glacier2.js' },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/ice/3.6.3/IceGrid.js' },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/ice/3.6.3/IceStorm.js' },
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
    'ant-design-vue/dist/antd.css',
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
  ],

  /*
  ** Build configuration
  */
  build: {
    vendor: ['vue-lazyload','js-cookie','good-storage'],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // console.log('webpack config:', config)
     if(ctx.isClient) {
      config.module.unknownContextCritical = false
     }
    }
  }
}
