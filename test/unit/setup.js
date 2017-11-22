import Vue from 'vue';
import Router from 'vue-router';
import Vuetify from 'vuetify';
import fetch from 'unfetch';

import router from '../../src/router';

global.fetch = fetch;
Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(Router);
global.router = router;
