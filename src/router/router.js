import Vue from 'vue'
import VueRouter from 'vue-router'

const login = () => import('../components/login')
const index = () => import('../components/index/index')
const userManager = () => import('../components/system/insertUser/userInsert')
const logger = () => import('../components/system/logger')
const userInsert_1 = () => import('../components/system/insertUser/userInsert_1')
const userInsert_2 = () => import('../components/system/insertUser/userInsert_2')

Vue.use(VueRouter)

const routes = [
    {path: '*', redirect: '/index'},
    {
        path: '/login', name: 'login', component: login, meta: {
            title: '登录',
            keepAlive: false,
            isLogin: false
        }
    },
    {
        path: '/index', name: 'index', component: index, meta: {
            title: '首页',
            keepAlive: true,
            isLogin: true
        }, children: [
            {
                path: '/userManager', name: 'userManager', component: userManager, meta: {
                    title: '用户管理',
                    keepAlive: true,
                    isLogin: true
                },
                children: [
                    {
                        path:'/',redirect: 'userInsert_1'
                    },
                    {
                        path: 'userInsert_1', name: 'userInsert_1', component: userInsert_1, meta: {
                            title: '基本信息',
                            keepAlive: true,
                            isLogin: true
                        }
                    },
                    {
                        path: 'userInsert_2', name: 'userInsert_2', component: userInsert_2, meta: {
                            title: '设置组',
                            keepAlive: true,
                            isLogin: true
                        }
                    }
                ]
            },
            {
                path: '/logger', name: 'logger', component: logger, meta: {
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