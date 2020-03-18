// vue.config.js
const path = require('path')
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    // 选项...
    outputDir:'lijg',
    lintOnSave:false,
    devServer:{
        port:8800,
        open:true,
        proxy: {
            '/4000': {
                target: 'http://localhost:4000',
                ws: true,
                changeOrigin: true,
                pathRewrite:{
                    /*' ^ / API /旧路径'： ' / api / new-path '，//重写路径
                    ' ^ / api / remove / path '： ' / path '  //删除基本路径*/
                    '^/4000':''// 重写路径
                },
            },
            '/5000': {
                target: 'http://localhost:5000',
                ws: true
            }
        }
    },
    configureWebpack:{
        resolve: {
            alias: {
                '@': resolve('src'),
                components: resolve('src/components'),
                pages: resolve('src/pages'),
                store: resolve('src/store')
            }
        }
    }
}