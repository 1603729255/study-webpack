module.exports={
  // 继承规则
  extends:["eslint:recommended"],
  env:{
    node:true,//启用node全局变量
    browser:true//启用浏览器全局变量
  },
  parserOptions:{
    ecmaVersion:6,//es6
    sourceType:"module",//
  },
  rules:{
    "no-var":2
  },
  plugins:["import"]
}
// 0 禁用 1警告 2报错