export default [{
    path: '/', redirect: 'userInsert_1'
},
    {
        path: 'userInsert_1',
        name: 'userInsert_1',
        component: resolve => require(['@/components/system/insertUser/userInsert_1'], resolve),
        meta: {
            title: '基本信息',
            keepAlive: true,
            isLogin: true
        }
    },
    {
        path: 'userInsert_2',
        name: 'userInsert_2',
        component: resolve => require(['@/components/system/insertUser/userInsert_2'], resolve),
        meta: {
            title: '配置权限',
            keepAlive: true,
            isLogin: true
        }
    },
    {
        path: 'userInsert_3',
        name: 'userInsert_3',
        component: resolve => require(['@/components/system/insertUser/userInsert_3'], resolve),
        meta: {
            title: '完成',
            keepAlive: true,
            isLogin: true
        }
    },
    {
        path: 'insertAuth',
        name: 'insertAuth',
        component: resolve => require(['@/components/system/insertUser/insertAuth'], resolve),
        meta: {
            title: '创建新权限',
            keepAlive: true,
            isLogin: true
        }
    }]