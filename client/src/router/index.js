import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Register from '@/views/register/Register.vue'
import Login from '@/views/login/Login.vue'
import NotFound from '../views/404.vue'
import Home from '../views/Home'
import InfoShow from '../views/InfoShow'
import FoundList from '../views/FoundList'
import ChartDemo from '../views/charts/Index'
import Dashboard from '@/layout/Index.vue'

Vue.use(VueRouter)

const routes = [
    // { path: '/', redirect: '/index' },
    { path: '*', name: '/404', component: NotFound },
    { path: '/register', name: 'register', component: Register },
    { path: '/login', name: 'login', component: Login },
    {
        path: '/',
        name: 'index',
        component: Index,
        children: [
            { path: '', component: Home },
            { path: '/home', name: 'home', component: Home },
            { path: '/infoshow', name: 'infoshow', component: InfoShow },
            { path: '/foundlist', name: 'foundlist', component: FoundList },
            { path: '/chartdemo', name: 'ChartDemo', component: ChartDemo },
        ]
    },

    // {
    //     path: '/',
    //     name: 'Dashboard',
    //     component: Dashboard
    // },
    // {
    //     path: '/fund',
    //     name: 'Fund',
    //     component: Dashboard,
    //     children: [
    //         { path: 'index', name: 'foundlist', component: FoundList },
    //     ]
    // }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router