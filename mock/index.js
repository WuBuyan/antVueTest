const fs = require('fs');
const path = require('path');
const Mock = require('mockjs');
const JSON5 =require('json5');

//读取JSON文件
function getJsonFile(filePath) {
    //读取指定json文件
    var json = fs.readFileSync(path.resolve(__dirname,filePath),'utf-8');
    //解析并返回
    return JSON5.parse(json);
}

//返回一个函数
module.exports = function (app) {
    //满足条件下执行，（用到了环境变量）
    if(process.env.Mock == 'true'){
        // 监听http请求
        // app.get('/user/userinfo',function (rep,res) {
        //     // 每次响应请求时读取Mock data的json文件
        //     //getJSONFile方法定义了如何读取json文件并解析成数据对象
        //     var json = getJsonFile('./userInfo.json5');
        //     //将json传入Mock.mock方法中，生成的数据返回给浏览器
        //     res.json(Mock.mock(json));
        // })
        app.get('/user/navtemp',function (rep,res) {
            let json = getJsonFile('./navTemp.json5');
            res.json(Mock.mock(json));
        });
        app.get('/user/inRegistration',function (rep,res) {
            let json = getJsonFile('./inRegistration.json5')
            res.json(Mock.mock(json))
        });
        app.get('/user/inRegistrationAdd',function (rep,res) {
            let json = getJsonFile('./inRegistrationAdd.json5')
            res.json(Mock.mock(json))
        });

    }


}