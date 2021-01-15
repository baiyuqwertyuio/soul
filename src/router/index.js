import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import circlefriend from '@/components/circlefriend'
import follow from '@/components/follow'
import newest from '@/components/newest'
import recommend from '@/components/recommend'
import sliding from '@/components/sliding'
import top from '@/components/top'
import login from '@/components/login'
import registry from'@/components/registry'


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/circlefriend',
      name: 'circlefriend',
      component: circlefriend,
      children:[
        {
          path:'/follow',
          component:follow
        },{
          path:'/newest',
          component:newest
        },{
          path:'/recommend',
          component:recommend
        }
      ]
      },
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
