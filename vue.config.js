'use strict'
const fs = require('fs')
const path = require('path')
const glob = require('glob')

function resolve(dir) {
  return path.join(__dirname, './', dir)
}

require('dotenv').config()

const pages = {}
const entry = glob.sync(resolve('src/pages/**/index.js'))

if (!entry) {
  console.error('没有找到入口文件！请检查 src/pages/**/index.js')
}resolve

entry.forEach(function(page) {
  const entryName = page.match(/pages\/(\w+)\//)[1]

  let template = resolve('public/index.html')
  if (fs.existsSync(resolve(`src/pages/${entryName}/index.html`))) {
    template = resolve(`src/pages/${entryName}/index.html`)
  }
  pages[entryName] = {
    entry: `src/pages/${entryName}/index.js`,
    // chunks: ['chunk-vendors', 'chunk-common', 'index'],
    template,
  }
})

module.exports = {
  pages,
  // publicPath: process.env.NODE_ENV === 'production' ? './dist/' : '',
  outputDir: 'dist',
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch-index')
    // 移除 preload 插件
    config.plugins.delete('preload-index')
    // 修复HMR
    // config.resolve.symlinks(true)
    // 多页应用自定义name chunks
    config.plugins.delete('named-chunks')
    // 添加别名
    const THEME = process.env.THEME || 'Default'
    config.resolve.alias
      .set('@', resolve('src'))
      .set('THEME.scss', resolve(`src/styles/${THEME.replace(/"/g, '')}/index.scss`))
      .set('THEME_VAR.scss', resolve(`src/styles/${THEME.replace(/"/g, '')}/variables.scss`))
  },
  transpileDependencies: [
    'resize-detector',
    'web-inject',
    'element-ui'
  ],
  devServer: {
    port: 8081,
    open: true,
    overlay: true,
    contentBase: 'public',
    proxy: {
      '/api': {
        target: process.env.API_SERVER || 'http://127.0.0.1:7001',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
