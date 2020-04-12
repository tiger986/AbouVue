import Vue from 'vue'

import Msg from './components/Msg'
import router from './router/index'

new Vue({
  el: '#app',
  router: router,
  template: '<Msg />',
  components: {
    Msg
  }
})
