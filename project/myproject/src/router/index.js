import Vue from 'vue'
import VueRouter from 'vue-router'

import Page1 from '../components/Page1'
import Page2 from '../components/Page2'
import Page3 from '../components/Page3'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/page1',
      component: Page1
    },
    {
      path: '/page2',
      component: Page2
    },
    {
      path: '/page3',
      component: Page3
    }
  ]
})

export default router
