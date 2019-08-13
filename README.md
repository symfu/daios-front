# daios数据访问平台前端项目

##技术栈
- vue + vuex + + vue-router + axios + sass +  elementUi + echarts + xterm.js + monaco editor + handsontable 
##项目简介
 该项目使用vue做的一个数据访问平台，类似阿里云RDS和DataWorks2.0,可以连接访问vertica,mysql,oracle,mongodb,redis(终端形式访问),同时添加有简单的权限，项目制，核心是里面包含了一个可以共用一套代码编辑器monaco editor组件的可以多开页签的框架以及对编辑器的研究，包括monaco editor在vue项目的深度使用，monaco editor通过lsp对于SQL语言生态的支持，不限于智能提示，表名，字段动态提示，错误提示，表朔源等，解析通过web work加载js脚本。

 我将该项目开源，是由于公司上周已经解散，老板对于代码可以要我们自行处理，随便处理，不会有任何问题，所以将其开源，毕竟这个项目从去年过年写道现在，目前开源的是第二次重构版本（删减版）

 - 关于我
 之前是小公司，只有我一个前端，后端有8个，我这样坚持了一年，平时很忙的，所以代码写的有写乱，斗胆开源，不胜惶恐，后端代码在前同事手里（JAVA）,可能过段时间也会开源
 - 关于代码
 如果您看到了这个仓库，代码最核心就是编辑器（使用以及lsp支持）和terminal（由开源项目ttyd改造，后端由python改写，支持多线程，可同时多开好多个,前端部分由我改造成vue），还基于饿了么做了一个动态表单组件，动态右键菜单，快捷键

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
