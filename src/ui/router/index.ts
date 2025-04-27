import HomeView from '@/views/HomeView.vue';
import SettingsView from '@/views/SettingsView.vue';
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/settings',
        name: 'settings',
        component: SettingsView
    }
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes
});
