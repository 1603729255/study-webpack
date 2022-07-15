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
    filename:"[name].js"//name 对应多入口名称 多输出
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname,"public/index.html")
    })
  ],
  mode:"production"
};
