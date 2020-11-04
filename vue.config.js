const path = require('path')

module.exports = {
  transpileDependencies: ['unique-names-generator'],
  configureWebpack: {
    resolve: {
      alias: {
        "~": path.resolve(__dirname, './src')
      }
    },
  }
}
