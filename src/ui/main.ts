import './style.css';

import { createApp } from 'vue';
import App from './App.vue';
import { naive } from './plugins/naive.plugin';
import { router } from './router';

const app = createApp(App);

app.use(naive);
app.use(router);

app.mount('#app');
