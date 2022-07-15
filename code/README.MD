# 初始化 npm init -y
# 安装webpack npm i webpack webpack-cli -D
# 打包编译npx webpack ./src/main.js --mode=development
# 核心概念
## entry 入口文件
## output 输出目录
## loader 加载器(module) webpack本身只能处理js、json等资源，其他资源需要借助loader
## plugin 插件 扩展
## mode development production
# devServer
## npm i webpack-dev-server -D
##  npx webpack serve --config ./config/webpack.dev.js
##  npx webpack --config ./config/webpack.prod.js
### npm start/npm run dev/npm run build

# 闪屏 浏览器先解析html再解析js最后解析css 导致样式没加载 突然出现
## npm install --save-dev mini-css-extract-plugin css打包处理到main.css
# npm i postcss-loader postcss postcss-preset-env -D 样式兼容性问题
# SourceMap 编译代码与源代码映射的关系
# npm i thread-loader -D 多进程打包 较大项目可以更快
# npm i @babel/plugin-transform-runtime -D  因为babel会引入额外的定义代码 去掉重复定义 减小babel打包体积 
# npm i image-minimizer-webpack-plugin imagein -D 压缩图片体积
## npm i imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin -svgo -D 无损压缩
## npm i imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin -svgo -D 有损压缩