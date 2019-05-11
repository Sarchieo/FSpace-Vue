const { resolve } = require('path')
const fs = require('fs')
const SSRJSPath = resolve(__dirname, '../node_modules/vue-server-renderer/server-plugin.js')
const consola = require('consola')
const logProvider = consola.withScope('vue:patch')

module.exports = VueSSRPatch()

/**
 * 对 `vue-server-renderer/server-plugin.js` 源码内容进行替换
 * asset.name.match(/\.js$/)
 * =>
 * isJS(asset.name)
 */
function VueSSRPatch() {
  //- 检测该模块是否存在
  if (fs.existsSync(SSRJSPath)) {
    let regexp = /asset\.name\.match\(\/\\\.js\$\/\)/
    let SSRJSContent = fs.readFileSync(SSRJSPath, 'utf8')

    //- 检测是否存在需要替换的内容(通常是指该项目在本机第一次运行)
    if (regexp.test(SSRJSContent)) {
      logProvider.start(`发现vue-server-renderer模块，开始执行修补操作！`)

      SSRJSContent = SSRJSContent.replace(regexp, 'isJS(asset.name)')
      fs.writeFileSync(SSRJSPath, SSRJSContent, 'utf8')

      logProvider.ready(`修补完毕！`)
      return true
    }

    logProvider.warn(`该模块已修补过，无需再次修补，可直接运行\`npm run dev\` 或 \`npm run gen\``)
    return false
  }

  logProvider.warn(`未发现该模块，跳出本次修复！`)
  return false
}