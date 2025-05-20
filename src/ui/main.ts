import './style.css';

import i18next from 'i18next';
import I18NextVue from 'i18next-vue';
import { createApp } from 'vue';
import { initI18next } from '../i18n/init';
import App from './App.vue';
import { naive } from './plugins/naive.plugin';
import { router } from './router';

const app = createApp(App);

initI18next();
app.use(naive);
app.use(I18NextVue, { i18next });
app.use(router);

app.mount('#app');
