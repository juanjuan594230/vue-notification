import Vue from 'vue'
import App from './App.vue'
import Notification from './lib/index'
Vue.use(Notification);

new Vue({
  el: '#app',
  render: h => h(App)
})
