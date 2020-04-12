import Vue from 'vue';
import Vuex from 'vuex';
import HiretradesBusinessDirectory from '@/ht2-business-directory';
import { BootstrapVue } from 'bootstrap-vue'

import App from './App.vue';

Vue.use(Vuex);
Vue.use(HiretradesBusinessDirectory);
Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueRouter from 'vue-router'

import routes from './routes';

Vue.use(VueRouter)

const router = new VueRouter({routes});

new Vue({
  store: new Vuex.Store(),
  directorySettings: new HiretradesBusinessDirectory(),
  router,
  render: h => h(App),
}).$mount('#app');