const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  outputDir: 'dist',
  lintOnSave: false,
  devServer: {
    port: 3001,
    open: true
  },
  configureWebpack: {
    resolve: {
      alias: {
        components: resolve('src/components'),
        pages: resolve('src/pages')
      }
    }
  }
};
