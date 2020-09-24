const fs =require('fs')
const  path = require('path') //读取文件路径
const JSON5 = require('json5') //引入json5

//1.传入当前文件路径，找到json5文件,编码格式采用utf-8
var json = fs.readFileSync(path.join(__dirname,'./userInfo.json5'),'utf-8')
console.log(json)

//将json中的字符串，转换为对应的对象中的值
var obj = JSON5.parse(json)
console.log(obj)