export default {//全局状态存储
    isLogin:false,//登录状态
    current:0,//新增用户 步骤条
    fetchPath:'http://localhost:8081',//fetch服务器地址   fuwuqi
    fetchHeader:{//fetch请求头
        "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"
    },
    headers:[{//导航头
        name: '首页'
    }],
    newUserId:'',//新增用户id
}