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

]
