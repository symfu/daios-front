const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
module.exports = {
  pwa: {
    themeColor: '#ffffff',
    msTileColor: '#ffffff',
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
    },
    // iconPaths: {
    //   favicon32: 'img/icons/fuji-mountain-32x32.png',
    //   favicon16: 'img/icons/fuji-mountain-16x16.png',
    //   appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
    //   maskIcon: 'img/icons/safari-pinned-tab.svg',
    //   msTileImage: 'img/icons/msapplication-icon-144x144.png',
    // },
  },
  devServer: {
    proxy: {
      "/": {
        // target: "http://cq214.holytoolz.com:8080", // 接口域名
        target: "http://cq308.holytoolz.com:8080", // 接口域名
        // target: "http://192.168.1.75:8080", // 接口域名
        // target: "http://cq2012.holytoolz.com:8080", // 接口域名
        // target: "http://192.168.1.76:8080", // 接口域名
        // target: "http://192.168.1.95:8080", // 接口域名
        // target: "http://192.168.1.15:8080", // 接口域名
        ws: false,
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api': ''
        // }
      },
    },
  },
  configureWebpack: (config) => {
    
    config.output.chunkFilename = '[name].js'
  },
  configureWebpack: {
    resolve: {
      alias: {
        'vscode': require.resolve('monaco-languageclient/lib/vscode-compatibility')
      }
    },
    plugins: [
      new MonacoWebpackPlugin({
        // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
        languages: ['javascript', 'css', 'html', 'typescript', 'json']
      })
    ]
  },
  chainWebpack: config => {
    // add your custom entry point
    config
      .entry('editor.worker.bundle')
      .add('monaco-editor-core/esm/vs/editor/editor.worker.js')
  
  }

}