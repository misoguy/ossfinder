import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Profile from '@/components/Profile';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      props: true,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      props: true,
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('token');
        if (token) {
          next();
        } else {
          next('/');
        }
      },
    },
  ],
});
