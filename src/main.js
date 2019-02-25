import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import router from './router/router'
import utils from './utils';
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView);
Vue.prototype.utils=utils;
Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {

    let getFlag = localStorage.getItem("Flag");
    if (getFlag === "isLogin") {
        store.commit('userStatus', true);
        next();
        if (!to.meta.isLogin) {
            next({
                path: '/index'
            });
            iView.Message.error('请先退出登录')
        }
    } else {
        if (to.path == "/") {
            next({
                path: '/login',
            });
        }

        if (to.meta.isLogin) {
            next({
                path: '/login',
            });
            iView.Message.info('请先登录');
        } else {
            next();
        }

    }

});

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')

