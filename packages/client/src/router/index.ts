import { createRouter, createWebHistory } from 'vue-router'
const TabsView = () => import('../views/tabs/Index.vue')
const Home = () => import('../views/tabs/home/Home.vue')
const Order = () => import('../views/tabs/order/Order.vue')
const Me = () => import('../views/tabs/me/Me.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/tabs',
      name: 'tabs',
      component: TabsView,
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/order',
          name: 'order',
          component: Order
        },
        {
          path: '/me',
          name: 'me',
          component: Me
        }
      ]
    }
  ]
})

export default router
