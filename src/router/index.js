import Vue from 'vue'
import Router from 'vue-router'
import Sliding from '@/components/Sliding'
import top from '@/components/top'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Sliding',
      name: 'Sliding',
      component: Sliding
    },
    {
      path: '/top',
      name: 'top',
      component: top
    }
  ]
})
