import { createApp } from 'vue';
import App from './App.vue';

import { loadFonts } from './plugins/webfontloader';
import router from './router';
import vuetify from './plugins/vuetify';
import pinia from './plugins/pinia';
import { registerComponents } from './plugins/registercomp';

const app = createApp(App);

loadFonts();
registerComponents(app);

app.use(router).use(pinia).use(vuetify).mount('#app');
