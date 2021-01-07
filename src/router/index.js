import Vue from 'vue'
import Router from 'vue-router'
import sliding from '@/components/sliding'
import top from '@/components/top'
import login from '@/components/login'
import registry from'@/components/registry'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/sliding',
      name: 'sliding',
      component: sliding
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/registry',
      name: 'registry',
      component: registry
    },
    {
      path: '/top',
      name: 'top',
      component: top
    }
  ]
})
