import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Profile from '@/components/Profile';
import Issues from '@/components/Issues';

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
      path: '/profile',
      name: 'profile',
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
