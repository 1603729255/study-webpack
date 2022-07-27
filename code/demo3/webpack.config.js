const path=require('path')
const HtmlWebpackPlugin=require('html-webpack-plugin')
module.exports = {
  entry: {
    //多入口
    app: "./src/app.js",
    main: "./src/main.js",
  },
  output:{
    path:path.resolve(__dirname,"dist"),
    filename:"[name].js",//name 对应多入口名称 多输出
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname,"public/index.html")
    })
  ],
  mode:"production",
  optimization:{
    splitChunks:{
      chunks: 'all',//对所有模块进行分割
      // // 以下 默认值
      // minSize: 20000,//分割代码最小的大小
      // minRemainingSize: 0,//类似于minSize 确保提取的文件大小不为0
      // minChunks: 1,//至少被引用的次数,满足条件才会分割
      // maxAsyncRequests: 30,//按需加载时并行加载的文件最大数量
      // maxInitialRequests: 30,//入口js文件最大并行数量
      // enforceSizeThreshold: 50000,//超过50000一定会单独打包(忽略minRemainingSize、maxAsyncRequests、maxInitialRequests)
      // cacheGroups: {//哪些模块打包到一组
      //   defaultVendors: {//组名
      //     test: /[\\/]node_modules[\\/]/,//需要打包到一组的模块
      //     priority: -10,//权重
      //     reuseExistingChunk: true,//如果当前chunk包含从主bundle中拆分出来的模块，则会被重新使用，而不是生成新的模块
      //   },
      //   default: {//其他没有写的配置会使用上面的默认值
      //     minChunks: 2,//这里的权重更大
      //     priority: -20,//
      //     reuseExistingChunk: true,
      //   },
      // },
      // 自定义配置
      cacheGroups:{
        default:{
          // minSize:0
        }
      }
    }
  }
};
