const Mock = require('mockjs') //引入Mock

let id = Mock.mock('@id')
console.log(id)

var obj = Mock.mock({
    id:'@id()',//得到随机的id，对象
    username:'@cname()',//随机生成中文名称
    date:'@date()',//随机生成日期
    avatar:"@image('200*200','red','#fff','avatar')",//生成图片，参数：size,background,foreground,text
    description:'@paragraph()',//描述
    ip:'@ip()',//IP地址
    email:'@email()',//email
})
console.log(obj)