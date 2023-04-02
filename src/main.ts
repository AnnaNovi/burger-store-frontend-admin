import { createApp } from 'vue';
import App from './App.vue';

import { loadFonts } from './plugins/webfontloader';
import router from './router';
import vuetify from './plugins/vuetify';
import pinia from './plugins/pinia';

loadFonts();

createApp(App).use(router).use(pinia).use(vuetify).mount('#app');
