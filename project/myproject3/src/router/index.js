import Vue from 'vue'
import VueRouter from 'vue-router'
import Splash from '../views/Splash.vue'
import Index from '../views/Index.vue'
import Board from '../components/board/Board.vue'
import Search from '../components/search/Search.vue'
import My from '../components/my/My.vue'
import Lists from '../views/Lists.vue'
import Detail from '../views/Detail.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect: '/splash'
  },
  {
    path: '/splash',
    name: 'splash',
    component: Splash
  },
  {
    path: '/index',
    name: 'index',
    component: Index,
    redirect: '/index/board',
    children: [
      {
        path: 'board',
        name: 'board',
        component: Board
      },
      {
        path: 'search',
        name: 'search',
        component: Search
      },
      {
        path: 'my',
        name: 'my',
        component: My
      }
    ]
  },
  {
    path: '/lists',
    name: 'lists',
    component: Lists
  },
  {
    path: '/detail',
    name: 'detail',
    component: Detail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
