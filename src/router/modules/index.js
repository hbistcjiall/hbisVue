import pzgjs from './pzgjs'
import xyhxl from './xyhxl'
import gkfx from './gkfx'
import htzzjd from './htzzjd'
const indexchild=[
    {path:'',redirect:'/indexpage'},
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
        path: '/home',
        name: 'home',
        component: resolve => require(['@/components/index/home'], resolve),
        meta: {
            title: '概况分析',
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
    },
    {
        path: '/indexpage',
        name: 'indexpage',
        component: resolve => require(['@/components/indexpage'], resolve),
        meta: {
            title: 'Demo',
            keepAlive: true,
            isLogin: true
        },
    },
    {
        path: '/zgspzgqk/wcqk',
        name: 'wcqk',
        component: resolve => require(['@/components/jtpzgqk/wcqk'], resolve),
        meta: {
            title: '完成情况',
            keepAlive: true,
            isLogin: true
        },
    },
    {
        path: '/indexSet',
        name: 'sypz',
        component: resolve => require(['@/components/system/sypz/sypz'], resolve),
        meta: {
            title: '首页配置',
            keepAlive: true,
            isLogin: true
        },
    },
    {
        path: '/xsjsqk/pzxsjsqk',
        name: 'pzxsjsqk',
        component: resolve => require(['@/components/xsjsqk/xsjsqkpz'], resolve),
        meta: {
            title: '销售结算情况（品种）',
            keepAlive: true,
            isLogin: true
        },
    },
    {
        path: '/xsjsqk/gcxsjsqk',
        name: 'gcxsjsqk',
        component: resolve => require(['@/components/xsjsqk/xsjsqkgc'], resolve),
        meta: {
            title: '销售结算情况（钢厂）',
            keepAlive: true,
            isLogin: true
        },
    },
    {
        path: '/xsjsqk/xsjsqkcx',
        name: 'xsjsqkcx',
        component: resolve => require(['@/components/xsjsqk/xsjsqkcx'], resolve),
        meta: {
            title: '集团销售结算情况（汇总）',
            keepAlive: true,
            isLogin: true
        },
    },
    {
        path: '/xsjsqk/xsjsqkhz',
        name: 'xsjsqkhz',
        component: resolve => require(['@/components/xsjsqk/xsjsqkhz'], resolve),

        meta: {
            title: '销售结算情况（汇总）',
            keepAlive: true,
            isLogin: true
        },
    },
    {
        path: '/jcsjgl/gltjwh',
        name: 'gltjwhzsgc',
        component: resolve => require(['@/components/gltjwh/gltjwhzsgc'], resolve),
        meta: {
            title: '过滤条件维护',
            keepAlive: true,
            isLogin: true
        },
    },
    {
        path: '/jcsjgl/gltjcx',
        name: 'gltjwhcx',
        component: resolve => require(['@/components/gltjwh/gltjwhcx'], resolve),
        meta: {
            title: '过滤条件查询',
            keepAlive: true,
            isLogin: true
        },
    },
    {
        path: '/jtgczybgqk',
        name: 'jtgczybgqk',
        component: resolve => require(['@/components/jtgczybgqk'], resolve),
        meta: {
            title: '集团钢材资源布港情况',
            keepAlive: true,
            isLogin: true
        },
    },
];
const childrens=indexchild.concat(pzgjs).concat(xyhxl).concat(gkfx).concat(htzzjd);
export default {
    path: '/index', name: 'index', component: resolve => require(['@/components/index/index'], resolve), meta: {
        title: '首页',
        keepAlive: true,
        isLogin: true
    }, children:childrens
}
