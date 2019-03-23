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
        path: '/jcscxhjg/bjsc',
        name: 'htzzjd',
        component: resolve => require(['@/components/jcscjg/bjsc'], resolve),
        meta: {
            title: '北京市场',
            isLogin: true
        }
    },

]
