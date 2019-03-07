import userManager from '@/router/modules/userManager'
export default {
    path: '/index', name: 'index', component: resolve => require(['@/components/index/index'], resolve), meta: {
        title: '首页',
        keepAlive: true,
        isLogin: true
    }, children: [
        {
            path: '/home', redirect: 'home'
        },
        {
            path: '/home',
            name: 'home',
            component: resolve => require(['@/components/index/home'], resolve),
            meta: {
                title: 'home',
                keepAlive: true,
                isLogin: true
            }
        },
        {
            path: '/userManager',
            name: 'userManager',
            component: resolve => require(['@/components/system/insertUser/userInsert'], resolve),
            meta: {
                title: '用户管理',
                keepAlive: true,
                isLogin: true
            },
            children: userManager
        }
    ]
}
