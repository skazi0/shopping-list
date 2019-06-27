import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import lodash from 'lodash';
import VueLodash from 'vue-lodash';

import App from './App.vue';

Vue.use(BootstrapVue);
Vue.use(VueLodash, lodash);

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'font-awesome/css/font-awesome.css';

new Vue({
  el: '#app',
  render: h => h(App)
})
