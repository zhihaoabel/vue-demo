import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'

import {createApp} from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router'

import FormCashier from "@/views/form/FormCashier.vue"
import Home from "@/components/Home.vue";

// set up the routes
const routes = [
    {path: '/', component: Home},
    {path: '/formCashier', component: FormCashier}
]

// assuming routes are defined as per step 1
const router = createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

createApp(App).use(router).mount('#app')
