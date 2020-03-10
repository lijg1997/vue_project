// vue.config.js
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // 选项...
  // 导出文件名
  outputDir:'lijg',
  // 错误提示
  lintOnSave:false,
  devServer:{
    port:8000,
    open:true
  },
  configureWebpack:{
    resolve: {
      alias: {
        '@': resolve('src'),
        'components': resolve('src/components'),
        'pages': resolve('src/pages'),
      }
    },
  }
}