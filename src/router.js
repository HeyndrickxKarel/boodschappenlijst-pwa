import Vue from 'vue'
import Router from 'vue-router'
import Groceries from './views/Groceries.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Groceries',
      component: Groceries
    },
    {
      path: '/planning',
      name: 'Planning',
      component: () => import(/* webpackChunkName: "about" */ './views/Planning.vue')
    },
    {
      path: '/wordlist',
      name: 'WordList',
      component: () => import(/* webpackChunkName: "about" */ './views/WordList.vue')
    }
  ]
})