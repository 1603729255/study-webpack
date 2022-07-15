// node环境 commonjs 模块化标准

const path = require("path"); //nodejs核心模块 处理路径问题
const os = require("os");
const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ImageMinimizerPlugin=require("image-minimizer-webpack-plugin")
const TerserWebpackPlugin = require("terser-webpack-plugin");
const threads = os.cpus.length; //cpu

module.exports = {
  entry: "./src/main.js", //相对路径
  output: {
    // __dirname nodejs变量，代表当前文件的文件夹
    path: undefined, //开发环境没有输出
    // 入口文件打包输出的文件名
    filename: "static/js/main.js",
  },
  module: {
    rules: [
      // loader的配置
      {
        oneOf: [
          //提升打包速度，文件只响应一个配置
          {
            test: /\.css$/, //校验规则 以css为后缀的文件
            use: [
              // 执行顺序是从右到左，从下到上。
              "style-loader", //将js中的css通过创建style标签，添加到html文件中生效
              "css-loader", //将样式编译为commonjs的模块到js中
            ],
          },
          {
            test: /\.less$/,
            use: [
              "style-loader",
              "css-loader",
              "less-loader", //先处理成css,然后同上
            ],
          },
          {
            // 图片 视频 字体 都在这里加上后缀即可
            test: /\.(png|jpe?g|gif|webp|svg)$/,
            type: "asset", //转base64 asset/resource
            parser: {
              dataUrlCondition: {
                // 小于10kb的图片转base64
                maxSize: 30 * 1024, // 10kb
              },
            },
            generator: {
              // 输出图片名称
              filename: "static/images/[hash:10][ext][query]",
            },
          },
          {
            test: /\.js$/,
            exclude: /(node_modules)/, //排除不需要处理的文件
            // include:path.resolve(__dirname,'../src'),//exclude和include只能写一个
            use: [
              {
                loader: "thread-loader",
                options: {
                  works: threads,
                },
              },
              {
                loader: "babel-loader",
                options: {
                  // presets: ['@babel/preset-env']
                  cacheDirectory: true, //开启babel缓存
                  cacheCompression: false, //关闭缓存文件压缩
                  plugins: ["@babel/plugin-transform-runtime"],
                },
              },
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    // 插件配置
    new ESLintPlugin({
      // context检测哪些文件
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules",
      cache: true, //开启eslint缓存
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/eslintCache"
      ), //缓存文件位置
      threads, //开启多进程和设置进程数量
    }),
    new HtmlWebpackPlugin({
      // 模板以public/index.html为模板创建新的html文件
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/main.css",
    }),
  ],
  // 开发服务器：不会输出资源，再内存中编译打包
  devServer: {
    host: "localhost",
    port: "3000",
    open: true,
    hot: true, //热更新 开启HMR功能(只用于开发环境)
  },
  // 推荐写法 压缩操作
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(), //压缩css
      new TerserWebpackPlugin({
        //压缩js
        parallel: threads, //开启多进程和设置进程数量
      }),
      // 压缩图片
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    "preset-default",
                    "prefixIds",
                    {
                      num: "sortAttrs",
                      params: {
                        xmlnsOrder: "alphabetical",
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
  },
  mode: "development",
  devtool: "cheap-module-source-map",
};
