import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import lodash from 'lodash';
import VueLodash from 'vue-lodash';
import VueSimpleSuggest from 'vue-simple-suggest';

import App from './App.vue';

Vue.use(BootstrapVue);
Vue.use(VueLodash, lodash);

Vue.component('vue-simple-suggest', VueSimpleSuggest);

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
//import 'font-awesome/css/font-awesome.css';
import 'vue-simple-suggest/dist/styles.css';

new Vue({
  el: '#app',
  render: h => h(App)
})
