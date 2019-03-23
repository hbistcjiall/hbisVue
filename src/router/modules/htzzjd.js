export default [
    {
        path: '/htzzjd/cxhtjdcx',
        name: 'cxhtjdcx',
        component: resolve => require(['@/components/htzzjd/cxhtjdcx'], resolve),
        meta: {
            title: '产线合同进度（产线）',
            isLogin: true
        }
    },
    {
        path: '/htzzjd/cxhtjdpz',
        name: 'cxhtjdpz',
        component: resolve => require(['@/components/htzzjd/cxhtjdpz'], resolve),
        meta: {
            title: '产线合同进度（品种）',
            isLogin: true
        }
    },
    {
        path: '/htzzjd/khdxlfx',
        name: 'khdxlfx',
        component: resolve => require(['@/components/htzzjd/khdxlfx'], resolve),
        meta: {
            title: '客户兑现率分析',
            isLogin: true
        }
    }

]