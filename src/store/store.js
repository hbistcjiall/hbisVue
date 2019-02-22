import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state={//要设置的全局访问的state对象
    count: 0
};
const store = new Vuex.Store({
    state,
    mutations: {
        tests (state,dd) {
            this.state.count=dd;
        }
    }
});
export default store;