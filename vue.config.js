const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  runtimeCompiler: true,
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/weather-map-vue2/'
    : '/'
})
