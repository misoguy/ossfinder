import 'unfetch/polyfill';
import Vue from 'vue';
import Router from 'vue-router';
import Vuetify from 'vuetify';

import router from '@/router';

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(Router);

global.router = router;

// Custom component unit tests display warning "missing <v-app>"
// https://github.com/vuetifyjs/vuetify/issues/1210
const app = document.createElement('div');
app.setAttribute('data-app', true);
document.body.appendChild(app);
