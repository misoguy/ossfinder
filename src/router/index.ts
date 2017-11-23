import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home.vue';
import Login from '@/components/Login.vue';
import Oss from '@/components/Oss.vue';
import Watching from '@/components/Watching.vue';
import Starred from '@/components/Starred.vue';
import Search from '@/components/Search.vue';
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
      component: Oss,
      children: [
        {
          path: '',
          component: Watching,
        },
        {
          path: 'watching',
          component: Watching,
        },
        {
          path: 'starred',
          component: Starred,
        },
        {
          path: 'search',
          component: Search,
        },
      ],
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
