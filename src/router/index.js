import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import sliding from '@/components/sliding'
import registry from '@/components/registry'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/sliding',
      name: 'sliding',
      component: sliding
    },
    {
      path:'/registry',
      name:'registry',
      component: registry
    }

  ]
})
