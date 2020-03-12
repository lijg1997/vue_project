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
        port:8080,
        open:true
    },
    configureWebpack:{
        resolve: {
            alias: {
                '@': resolve('src'),
                components: resolve('src/components'),
                pages: resolve('src/pages')
            }
        }
    }
}