// import Vue from 'vue';
import Home from '@/components/Home.vue';

describe('Home.vue', () => {
  it('should render correct contents', () => {
    const vm = new Home({ router: global.router }).$mount();
    expect(vm.$el).toBeTruthy();
  });
});
