export default [
    {
        path: '/pzgwcqk/ydwcqk_cx',
        name: 'ydwcqk_cx',
        component: resolve => require(['@/components/pzgwcqk/ydwcqk_cx'], resolve),
        meta: {
            title: '月度情况(产线)',
            isLogin: true
        }
    },
    {
        path: '/pzgwcqk/ndwcqk_cx',
        name: 'ndwcqk_cx',
        component: resolve => require(['@/components/pzgwcqk/ndwcqk_cx'], resolve),
        meta: {
            title: '年度情况(产线)',
            isLogin: true
        }
    },
    {
        path: '/pzgwcqk/ydwcqk_pz',
        name: 'ydwcqk_pz',
        component: resolve => require(['@/components/pzgwcqk/ydwcqk_pz'], resolve),
        meta: {
            title: '月度情况(品种)',
            isLogin: true
        }
    },
    {
        path: '/pzgwcqk/ndwcqk_pz',
        name: 'ndwcqk_pz',
        component: resolve => require(['@/components/pzgwcqk/ndwcqk_pz'], resolve),
        meta: {
            title: '年度情况(品种)',
            isLogin: true
        }
    },
    {
        path: '/pzgwcqk/ydzrdw',
        name: 'ydzrdw',
        component: resolve => require(['@/components/pzgwcqk/ydzrdw'], resolve),
        meta: {
            title: '月度责任单位',
            isLogin: true
        }
    },
    {
        path: '/pzgwcqk/ndzrdw',
        name: 'ndzrdw',
        component: resolve => require(['@/components/pzgwcqk/ndzrdw'], resolve),
        meta: {
            title: '年度责任单位',
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
        path: '/pzgwcqk/addZrdwgl',
        name: 'addZrdwgl',
        component: resolve => require(['@/components/pzgwcqk/addZrdwgl'], resolve),
        meta: {
            title: '添加责任单位管理',
            isLogin: true
        }
    }

]
