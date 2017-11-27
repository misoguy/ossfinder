// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import { sync } from 'vuex-router-sync';
import VueAnalytics from 'vue-analytics';
import Clipboard from 'v-clipboard';

import App from './App.vue';
import router from './router';
import store from './vuex/store';

Vue.use(Vuetify);
Vue.use(Clipboard);
Vue.config.productionTip = false;

sync(store, router);

Vue.use(VueAnalytics, {
  id: 'UA-104961356-2',
  router,
});

// tslint:disable-next-line:no-unused-expression
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
