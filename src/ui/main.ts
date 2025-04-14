import './style.css';

import { createApp } from 'vue';
import App from './App.vue';
import { i18n } from './i18n/index';
import { naive } from './plugins/naive.plugin';
import { router } from './router';

const app = createApp(App);

app.use(naive);
app.use(i18n);
app.use(router);

app.mount('#app');
