import Vue from 'vue'
import VueRouter from 'vue-router'
// import Index from '../views/Index.vue'
// import NotFound from '../views/404.vue'
// import Home from '../views/Home'
// import InfoShow from '../views/InfoShow'
// import ChartDemo from '../views/charts/Index'
import Dashboard from '@/layout/Index.vue'

Vue.use(VueRouter)

const routes = [
    // {
    //     path: '/',
    //     name: 'index',
    //     component: Index,
    //     children: [
    //         { path: '', component: Home },
    //         { path: '/home', name: 'home', component: Home },
    //         { path: '/infoshow', name: 'infoshow', component: InfoShow },
    //         { path: '/foundlist', name: 'foundlist', component: FoundList },
    //         { path: '/chartdemo', name: 'ChartDemo', component: ChartDemo },
    //     ]
    // },

    // {
    //     path: '/',
    //     name: 'Dashboard',
    //     component: Dashboard
    // },
    {
        path: '/',
        name: 'Fund',
        component: Dashboard,
        children: [
            {
                path: '',
                name: 'foundlist',
                component: () => import('@/views/FoundList'),
                meta: {}
            },
        ]
    },
    // { path: '*', name: '/404', component: () => import("@/views/404") },
    { path: '/register', name: 'register', component: () => import("@/views/register/Register") },
    { path: '/login', name: 'login', component:()=> import("@/views/login/Login") },
    // { path: '*', redirect: '/404', hidden: true }
]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router