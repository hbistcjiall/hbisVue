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
        path: '/gkfx/jswcqk',
        name: 'jswcqk',
        component: resolve => require(['@/components/gkfx/jswcqk'], resolve),
        meta: {
            title: '结算完成情况',
            isLogin: true
        }
    },
    {
        path: '/xyhxl/xszgsmx',
        name: 'zxlmxtj_bb',
        component: resolve => require(['@/components/jcsjwh/zxlmxtj_bb'], resolve),
        meta: {
            title: '销售总公司协议户总销量明细统计',
            isLogin: true
        }
    },
    {
        path: '/xyhxl/cpzxl',
        name: 'cpzxljxsgsxyhxltjgn',
        component: resolve => require(['@/components/jcsjwh/cpzxljxsgsxyhxltjgn'], resolve),
        meta: {
            title: '产品总销量及销售公司协议户销量统计',
            isLogin: true
        }
    },
    {
        path: '/jcsjgl/xsylhztdy',
        name: 'xsztylhztdy',
        component: resolve => require(['@/components/jcsjwh/xsztylhztdy'], resolve),
        meta: {
            title: '销售主体与例会主体对应',
            isLogin: true
        }
    },
    {
        path: '/jcsjgl/xyhyhtdwdy',
        name: 'xyhyhtdwdy',
        component: resolve => require(['@/components/jcsjwh/xyhyhtdwdy'], resolve),
        meta: {
            title: '协议户与合同单位对应',
            isLogin: true
        }
    },
    {
        path: '/jcsjgl/ddyjglxdy',
        name: 'ddlxyjglxdy',
        component: resolve => require(['@/components/jcsjwh/ddlxyjglxdy'], resolve),
        meta: {
            title: '订单类型与价格类型对应',
            isLogin: true
        }
    },
    {
        path: '/jcsjgl/gltjcx',
        name: 'gltjcx',
        component: resolve => require(['@/components/gltjwh/gltjwhcx'], resolve),
        meta: {
            title: '过滤条件查询',
            isLogin: true
        }
    },
    {
        path: '/xsjsqk/cpdjjgfb',
        name: 'cpdjjgfb',
        component: resolve => require(['@/components/xsjsqk/cpdjjgfb'], resolve),
        meta: {
            title: '产品等级价格分布',
            isLogin: true
        }
    },

]
