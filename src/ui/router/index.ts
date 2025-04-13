import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    }
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes
});
