import Vue from 'vue';
import Vuetify from 'vuetify';
import fetch from 'unfetch';

global.fetch = fetch;
Vue.config.productionTip = false;

Vue.use(Vuetify);
