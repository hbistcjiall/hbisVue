export default [
    {
        path: '/pzgjs/pzgjs_cx',
        name: 'pzgjs_cx',
        component: resolve => require(['@/components/pzgjs/pzgjs_cx'], resolve),
        meta: {
            title: '完成情况(产线)',
            isLogin: true
        }
    },
    {
        path: '/pzgjs/pzgjs_pz',
        name: 'pzgjs_pz',
        component: resolve => require(['@/components/pzgjs/pzgjs_pz'], resolve),
        meta: {
            title: '完成情况(品种)',
            isLogin: true
        }
    },
    {
        path: '/pzgjs/pzgjs_zrzt',
        name: 'pzgjs_zrzt',
        component: resolve => require(['@/components/pzgjs/pzgjs_zrzt'], resolve),
        meta: {
            title: '完成情况(责任单位)',
            isLogin: true
        }
    },
    {
        path: '/pzgwcqk/zrdwgl',
        name: 'zrdwgl',
        component: resolve => require(['@/components/pzgwcqk/zrdwgl'], resolve),
        meta: {
            title: '责任单位管理',
            isLogin: true
        }
    },
    {
        path: '/pzgwcqk/mbmxgl',
        name: 'mbmxgl',
        component: resolve => require(['@/components/pzgwcqk/mbmxgl'], resolve),
        meta: {
            title: '目标明细管理',
            isLogin: true
        }
    }

]
