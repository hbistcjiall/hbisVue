import Vue from 'vue'
import VueRouter from 'vue-router'
import index from './modules/index'
import Promise from 'promise-polyfill'

if (!window.Promise) {
    window.Promise = Promise;
}
Vue.use(VueRouter)

const routes = [
    {
        path: '/login', name: 'login', component: resolve => require(['@/components/login'], resolve), meta: {
            title: '登录',
            keepAlive: false,
            isLogin: false
        }
    },
    index
];

const router = new VueRouter({
    bese: __dirname,
    routes
})
export default router;