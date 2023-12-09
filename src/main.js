import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router'
import Home from "./components/Home.vue";
import ButtonCard from "./components/card/ButtonCard.vue";
import SDKCashier from "./components/cashier/SDKCashier.vue";
import CardKitchenSink from "./components/card/CardKitchenSink.vue";
import LoadingComponent from "@/components/loading/LoadingComponent.vue";
import Payment from "@/components/view/payment.vue";

// set up the routes
const routes = [
    {
        pid: '',
        id: 'index',
        path: '/',
        component: Home,
        name: '主页',
    },
    {
        pid: '',
        id: 'pacypay',
        path: '/pacypay',
        component: ButtonCard,
        name: '收银台支付',
        children: [
            {
                pid: 'pacypay',
                id: 'test',
                path: 'test',
                component: LoadingComponent,
                name: '两方支付',
            },
        ]
    },
    {
        pid: '',
        id: 'sdk',
        path: '/sdk',
        component: SDKCashier,
        name: 'JS-SDK收银台',
    },
    {
        pid: '',
        id: 'extended',
        path: '/extended',
        component: CardKitchenSink,
        name: '两方接口支付',
    },
    {
        pid: '',
        id: 'payment',
        path: '/payment',
        component: Payment,
        name: '支付页面',
    }
]

// assuming routes are defined as per step 1
const router = createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

const pinia = createPinia()

createApp(App).use(pinia).use(router).mount('#app')
