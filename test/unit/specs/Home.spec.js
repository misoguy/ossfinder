import Vue from 'vue';
import Home from '@/components/Home.vue';

describe('Home.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Home);
    const vm = new Constructor({ router: global.router }).$mount();
    expect(vm.$el).toBeTruthy();
  });
});
