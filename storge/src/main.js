// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import './router.js'
import Router from 'vue-router'
import Counter from './Counter'
import store from './store'

import './Util.js'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Counter
    }
  ]
}) 

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
