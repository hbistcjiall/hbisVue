import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {path: '*', redirect: '/index'},
    {
        path: '/login', name: 'login', component: resolve=>require(['@/components/login'],resolve), meta: {
            title: '登录',
            keepAlive: false,
            isLogin: false
        }
    },
    {
        path: '/index', name: 'index', component: resolve=>require(['@/components/index/index'],resolve), meta: {
            title: '首页',
            keepAlive: true,
            isLogin: true
        }, children: [
            {
                path: '/userManager', name: 'userManager', component: resolve=>require(['@/components/system/insertUser/userInsert'],resolve), meta: {
                    title: '用户管理',
                    keepAlive: true,
                    isLogin: true
                },
                children: [
                    {
                        path:'/',redirect: 'userInsert_1'
                    },
                    {
                        path: 'userInsert_1', name: 'userInsert_1', component:  resolve=>require(['@/components/system/insertUser/userInsert_1'],resolve), meta: {
                            title: '基本信息',
                            keepAlive: true,
                            isLogin: true
                        }
                    },
                    {
                        path: 'userInsert_2', name: 'userInsert_2', component:  resolve=>require(['@/components/system/insertUser/userInsert_2'],resolve), meta: {
                            title: '设置组',
                            keepAlive: true,
                            isLogin: true
                        }
                    }
                ]
            },
            {
                path: '/logger', name: 'logger', component: resolve=>require(['@/components/system/logger'],resolve), meta: {
                    title: '日志管理',
                    keepAlive: true,
                    isLogin: true
                }
            },
        ]
    }
]


const router = new VueRouter({
    bese: __dirname,
    routes
})
export default router;