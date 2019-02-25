export default {//全局状态存储
    isLogin:false,//登录状态
    current:0,//新增用户 步骤条
    fetchPath:'http://18.4.20.224:8080',//fetch服务器地址
    fetchHeader:{//fetch请求头
        "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"
    },
    headers:[{//导航头
        name: '首页'
    }]
}