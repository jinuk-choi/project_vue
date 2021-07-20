import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login/Login.vue'
import Join from '../views/Login/Join.vue'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import UserList from '../views/Admin/Client/UserList.vue'
import Category from '../views/Admin/Management/Category.vue'
import Order from '../views/Admin/Management/Order.vue'
import OrderDetail from '../views/Admin/Management/OrderDetail.vue'
import Product from '../views/Admin/Management/Product.vue'
import ProductRegistration from '../views/Admin/Management/ProductRegistration.vue'
import ProductUpdate from '../views/Admin/Management/ProductUpdate.vue'
import Point from '../views/Admin/Client/Point.vue'
import PointAdd from '../views/Admin/Client/PointAdd.vue'
import Ranking from '../views/Admin/Situation/Ranking.vue'
import Sales from '../views/Admin/Situation/Sales.vue'
import SalesData from '../views/Admin/Situation/SalesData.vue'
import Top from '../views/User/Tab/Top.vue'
import Pants from '../views/User/Tab/Pants.vue'
import Product_User from '../views/User/Product.vue'
import BoardList from '../views/User/Tab/BoardList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path:'product/:id',
        name:'Product_User',
        component: Product_User
      },
      {
        path:'/board/boardlist'
        ,name:'BoardList'
        ,component:BoardList
      },
    ]
  },
  {
    path:'/Login',
    name:'Login',
    component: Login
  },
  {
    path:'/Join',
    name:'Join',
    component: Join
  },
  {
    path:'/Top',
    name:'Top',
    component: Top
  },
  {
    path:'/Pants',
    name:'Pants',
    component: Pants
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
        path:'order/:id',
        name:'OrderDetail',
        component: OrderDetail
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
      {
        path: 'productRegistration',
        name: 'ProductRegistration',
        component: ProductRegistration
      },
      {
        path: 'productUpdate',
        name: 'ProductUpdate',
        component: ProductUpdate
      },
      {
        path: 'sales',
        name: 'Sales',
        component: Sales
      },
      {
        path: 'salesdata',
        name: 'SalesData',
        component: SalesData
      },
      {
        path: 'ranking',
        name: 'Ranking',
        component: Ranking
      },
      {
        path: 'userlist',
        name: 'UserList',
        component: UserList
      },
      {
        path: 'point',
        name: 'Point',
        component: Point,
      },
      {
        path: 'pointadd',
        name: 'PointAdd',
        component: PointAdd
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
