export default {//全局状态存储
    isLogin:false,//登录状态
    current:0,//新增用户 步骤条
    fetchPath:'http://18.4.20.224:8080',//fetch服务器地址
    // fetchPath:'http://18.4.23.67:8080',//fetch服务器地址
    // fetchPath:'http://18.4.17.14:8080',//fetch服务器地址
    // fetchPath:'http://18.4.23.173:8080',//fetch服务器地址
    // fetchPath:'http://localhost:8080',//fetch服务器地址
	// 测试123
    fetchHeader:{//fetch请求头

        "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"
    },
    headers:[{//导航头
        name: '首页'
    }],
    newUserId:'',//新增用户id
}