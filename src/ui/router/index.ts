import HistoryView from '@/views/HistoryView.vue';
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
        path: '/download-history',
        name: 'history',
        component: HistoryView
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
