import {sum} from './math'
// import count from './count'
console.log(sum(3,4));
console.log('hello main');

document.getElementById("btn").onclick=function(){
  // console.log(count(2,1));
  // import 动态导入
  import('./count').then(res=>{
    console.log("模块加载成功",res.default(2,1));
  }).catch((err)=>{
    console.log("模块加载失败",err);
  })
}