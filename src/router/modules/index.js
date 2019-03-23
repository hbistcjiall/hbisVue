import pzgjs from './pzgjs'
import xyhxl from './xyhxl'
import gkfx from './gkfx'
import htzzjd from './htzzjd'
const indexchild=[
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
    {
        path: '/dict',
        name: 'dict',
        component: resolve => require(['@/components/system/dict/dictMsg'], resolve),
        meta: {
            title: '字典管理',
            keepAlive: true,
            isLogin: true
        },
    },
    {
        path: '/loginLog',
        name: 'loginLog',
        component: resolve => require(['@/components/system/loginLog'], resolve),
        meta: {
            title: '登录日志',
            keepAlive: true,
            isLogin: true
        },
    },
    {
        path: '/log',
        name: 'log',
        component: resolve => require(['@/components/system/log'], resolve),
        meta: {
            title: '登录日志',
            keepAlive: true,
            isLogin: true
        },
    },
    {
        path: '/druid',
        name: 'druid',
        component: resolve => require(['@/components/system/druid'], resolve),
        meta: {
            title: 'druid',
            keepAlive: true,
            isLogin: true
        },
    },
    {
        path: '/swagger',
        name: 'swagger',
        component: resolve => require(['@/components/system/swagger'], resolve),
        meta: {
            title: 'swagger',
            keepAlive: true,
            isLogin: true
        },
    },
    {
        path: '/zyphjh/zyjhSel',
        name: 'zyjhcx',
        component: resolve => require(['@/components/zyjhcx/zyjhcx'], resolve),
        meta: {
            title: '资源计划查询',
            keepAlive: true,
            isLogin: true
        },
    },
    {
        path: '/jcscxhjg/bjsc',
        name: 'bjsc',
        component: resolve => require(['@/components/jcscjg/bjsc'], resolve),
        meta: {
            title: '北京市场',
            keepAlive: true,
            isLogin: true
        },
    }
];
const childrens=indexchild.concat(pzgjs).concat(xyhxl).concat(gkfx).concat(htzzjd);
export default {
    path: '/index', name: 'index', component: resolve => require(['@/components/index/index'], resolve), meta: {
        title: '首页',
        keepAlive: true,
        isLogin: true
    }, children:childrens
}
