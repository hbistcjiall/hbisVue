export default [
    {
        path: '/xyhxl/xyhmxdr',
        name: 'xyhmxdr',
        component: resolve => require(['@/components/xyhxl/xyhmxdr'], resolve),
        meta: {
            title: '协议户明细导入',
            isLogin: true
        }
    },
    {
        path: '/xyhxl/xyhmxlb',
        name: 'xyhmxlb',
        component: resolve => require(['@/components/xyhxl/xyhmxlb'], resolve),
        meta: {
            title: '协议户明细列表',
            isLogin: true
        }
    },
]