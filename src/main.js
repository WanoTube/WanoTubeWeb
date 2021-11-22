
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'


global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

import App from './App.vue'
import { router } from './routes'


import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

library.add(faCoffee)

// let token = JSON.parse( localStorage.getItem('token') );
// if( token ){
//      window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
// }
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

