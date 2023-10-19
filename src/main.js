import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'

import {createApp} from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router'
import Home from "./components/Home.vue";
import ButtonCard from "./components/card/ButtonCard.vue";
import SDKCashier from "./components/cashier/SDKCashier.vue";
import CardKitchenSink from "./components/card/CardKitchenSink.vue";

// set up the routes
const routes = [
    {path: '/', component: Home},
    {path: '/pacypay', component: ButtonCard},
    {path: '/sdk', component: SDKCashier},
    {path: '/extended', component: CardKitchenSink},
]

// assuming routes are defined as per step 1
const router = createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

createApp(App).use(router).mount('#app')
