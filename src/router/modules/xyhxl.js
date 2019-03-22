export default [
    {
        path: '/xyhxl/xyhmxlb',
        name: 'xyhmxlb',
        component: resolve => require(['@/components/xyhxl/xyhmxCont'], resolve),
        meta: {
            title: '协议户明细列表',
            isLogin: true
        }
    },
]