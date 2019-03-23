export default [
    {
        path: '/htzzjd/htjd_pz',
        name: 'htzzjd_pz',
        component: resolve => require(['@/components/htzzjd/htjd_pz'], resolve),
        meta: {
            title: '合同进度(品种)',
            isLogin: true
        }
    },
    {
        path: '/htzzjd/htjd_cx',
        name: 'htzzjd_cx',
        component: resolve => require(['@/components/htzzjd/htjd_cx'], resolve),
        meta: {
            title: '合同进度(产线)',
            isLogin: true
        }
    },
    {
        path: '/htzzjd/htjd_pz_jt',
        name: 'htjd_pz_jt',
        component: resolve => require(['@/components/htzzjd/htjd_pz_jt'], resolve),
        meta: {
            title: '合同进度(品种)-集团',
            isLogin: true
        }
    },
    {
        path: '/htzzjd/htjd_pz_xszgs',
        name: 'htjd_pz_xszgs',
        component: resolve => require(['@/components/htzzjd/htjd_pz_xszgs'], resolve),
        meta: {
            title: '合同进度(品种)-销售总公司',
            isLogin: true
        }
    },
    {
        path: '/htzzjd/htjd_pz_zgs',
        name: 'htjd_pz_zgs',
        component: resolve => require(['@/components/htzzjd/htjd_pz_zgs'], resolve),
        meta: {
            title: '合同进度(品种)-子公司',
            isLogin: true
        }
    },
    {
        path: '/htzzjd/htjd_pz_jk',
        name: 'htjd_pz_jk',
        component: resolve => require(['@/components/htzzjd/htjd_pz_jk'], resolve),
        meta: {
            title: '合同进度(品种)-进口',
            isLogin: true
        }
    },
    {
        path: '/htzzjd/htjd_cx_qian',
        name: 'htjd_cx_qian',
        component: resolve => require(['@/components/htzzjd/htjd_cx_qian'], resolve),
        meta: {
            title: '合同进度(产线)-前10',
            isLogin: true
        }
    },
    {
        path: '/htzzjd/htjd_cx_hou',
        name: 'htjd_cx_hou',
        component: resolve => require(['@/components/htzzjd/htjd_cx_hou'], resolve),
        meta: {
            title: '合同进度(产线)-后10',
            isLogin: true
        }
    },

]
