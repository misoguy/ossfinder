import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home.vue';
import Login from '@/components/Login.vue';
import Profile from '@/components/Profile.vue';
import Issues from '@/components/Issues.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/oss',
      name: 'oss',
      component: Profile,
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('token');
        if (token) {
          next();
        } else {
          next('/');
        }
      },
    },
    {
      path: '/issues',
      name: 'issues',
      component: Issues,
    },
  ],
});
