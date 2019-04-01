export default [
    {
        path: '/gkfx/htzzjd',
        name: 'htzzjd',
        component: resolve => require(['@/components/htzzjd/htjd_pz'], resolve),
        meta: {
            title: '合同组织进度',
            isLogin: true
        }
    },
    {
        path: '/gkfx/zyphjh',
        name: 'zyphjh',
        component: resolve => require(['@/components/gkfx/zyphjh'], resolve),
        meta: {
            title: '资源平衡计划',
            isLogin: true
        }
    },
    {
        path: '/gkfx/pzgwcqk',
        name: 'pzgwcqk',
        component: resolve => require(['@/components/gkfx/pzgwcqk'], resolve),
        meta: {
            title: '品种钢完成情况',
            isLogin: true
        }
    },
    {
        path: '/gkfx/jswcqk',
        name: 'jswcqk',
        component: resolve => require(['@/components/gkfx/jswcqk'], resolve),
        meta: {
            title: '结算完成情况',
            isLogin: true
        }
    },
    {
        path: '/gkfx/zxlmxtj_bb',
        name: 'zxlmxtj_bb',
        component: resolve => require(['@/components/gkfx/zxlmxtj_bb'], resolve),
        meta: {
            title: '销售总公司协议户总销量明细统计',
            isLogin: true
        }
    },
]
