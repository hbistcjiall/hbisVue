// import userManager from '@/router/modules/userManager'
import tables from './tables'
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
            path: '/mgr',
            name: 'mgr',
            component: resolve => require(['@/components/system/userMsg/userMsg'], resolve),
            meta: {
                title: '用户管理',
                keepAlive: true,
                isLogin: true
            },
        },
        {
            path: '/role',
            name: 'role',
            component: resolve => require(['@/components/system/role/roleMsg'], resolve),
            meta: {
                title: '角色管理',
                keepAlive: true,
                isLogin: true
            },
        },
        {
            path: '/dept',
            name: 'dept',
            component: resolve => require(['@/components/system/dept/deptMsg'], resolve),
            meta: {
                title: '部门管理',
                keepAlive: true,
                isLogin: true
            },
        },
        {
            path: '/menu',
            name: 'menu',
            component: resolve => require(['@/components/system/menu/menuMsg'], resolve),
            meta: {
                title: '菜单管理',
                keepAlive: true,
                isLogin: true
            },
        },
        tables

    ]
}
