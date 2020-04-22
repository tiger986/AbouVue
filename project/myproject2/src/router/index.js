import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import List from '../views/List.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    component: Index,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: Home,
      },
      {
        path: 'list',
        redirect: '/list/1',
      },
      {
        //path: 'list/:id/:num',
        path: 'list/:id',
        name: 'list',
        component: List
      },
      {
        path: 'about',
        name: 'about',
        component: About,
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
