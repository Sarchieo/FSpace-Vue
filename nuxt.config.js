module.exports = {
  dev: (process.env.NODE_ENV !== 'production'),
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },
  cache: true,
  // or
  cache: {
    max: 1000, // 缓存组件的最大数目，当第 1001 个组件被添加至缓存中时， 第一个被缓存的组件会从缓存中移除。
    maxAge: 900000 // 缓存时间，单位毫秒, 默认是 15 分钟。
  },
  plugins: ['plugins/vant-ui.js']
}