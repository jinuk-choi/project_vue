import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import Category from '../views/Admin/Management/Category.vue'
import Order from '../views/Admin/Management/Order.vue'
import Product from '../views/Admin/Management/Product.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/Admin',
    name: 'Admin',
    component: Admin,
    children: [
      { 
        path: 'Order',
        name: 'Order',
        component: Order
      },
      {
        path: 'category',
        name: 'Category',
        component: Category
      },
      {
        path: 'product',
        name: 'Product',
        component: Product
      },


    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
