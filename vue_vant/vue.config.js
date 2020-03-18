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
        open:true,
        proxy:{
            '/4000':{
                target:'http://localhost:4000',
                ws:true,
                changeOrigin:true,
                pathRewrite:{
                    '/4000':''
                }
            },
            '/5000':{
                target:'http://localhost:5000',
                ws:true,
                changeOrigin:true,
                pathRewrite:{
                    '/5000':''
                }
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