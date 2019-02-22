import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
Vue.use(VueRouter)

const routes = [
    { path: '/hello', component: HelloWorld }
]


const router = new VueRouter({
    routes
})
export default router;