// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
// import PageSize from '@/components/PageSize'

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.config.productionTip = false;

// const router = new VueRouter({
//     routes
// });

// const isLogin = false;

// router.beforeEach((to, from, next) =>{
//     next('/index');
// })

/* eslint-disable no-new */
// Vue.component('common-pg', PageSize);
new Vue({
    el: '#app',
  router,
  render: h => h(App),
});
