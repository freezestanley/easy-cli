import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default function getRouter(base) {
  return new Router({
    mode: 'history',
    base,
    routes: [
      {
        path: '/',
        name: 'index',
        component: Index
      }
    ]
  })
}