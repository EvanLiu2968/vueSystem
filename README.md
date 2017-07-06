# manage-system #
基于Vue.js 2.x系列 + Element UI 的后台管理系统解决方案。)

## 说明 ##
以Vue2.x作为MVVC框架，以Element UI 作为dom框架的后台管理系统解决方案


## 目录结构介绍 ##

	|-- build                            // webpack配置文件
    |-- config                           // 项目打包路径
    |-- node_moduel                      // 项目模块依赖
	|-- dist                             // 执行构建命令后生成的dist文件
	|-- src                              // 源码目录
    |   |-- api                          // 模拟api
    |   |-- assets                       // 放置公用自定义css和图标等资源
    |   |-- routes                       // 路由及菜单配置
    |   |-- vuex                         // 状态管理
	|   |-- views                        // vue单文件
	|       |-- common                   // 公共组件
	|           |-- Header.vue           // 公共头部
	|           |-- Home.vue           	 // 公共路由入口
	|           |-- Sidebar.vue          // 公共左边栏
	|		|-- **                   	 // 页面模块
	|   |-- App.vue                      // 页面入口文件
    |   |-- main.js                      // 程序入口文件，加载各种公共组件
	|-- .babelrc                         // ES6语法编译配置
	|-- .gitignore                       // 忽略的文件
	|-- index.html                       // 入口html文件
	|-- package.json                     // 项目及工具的依赖配置文件
	|-- README.md                        // 说明


## 安装步骤 ##
	cnpm install			// 安装项目依赖，没有安装cnpm请先安装cnpm: npm install cnpm -g

## 本地开发 ##
	npm run dev            // 开启服务器，将自动打开浏览器访问 http://localhost:8080

## 构建生产 ##

	// 执行构建命令，生成的dist文件夹放在服务器下即可访问
	npm run build

### 浏览器支持

现代浏览器及IE10+