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
import LongTop from '../views/User/Tab/LongTop.vue'
import ShortTop from '../views/User/Tab/ShortTop.vue'
import Pants from '../views/User/Tab/Pants.vue'
import LongPants from '../views/User/Tab/LongPants.vue'
import ShortPants from '../views/User/Tab/ShortPants.vue'
import Product_User from '../views/User/Product.vue'
import BoardList from '../views/User/Tab/BoardList.vue'
import BoardDetail from '../views/User/Board/BoardDetail.vue'
import BoardWrite from '../views/User/Board/BoardWrite.vue'
import boardEdit from '../views/User/Board/BoardEdit.vue'
import Main from '../views/User/Main.vue'
import store from '../store'

Vue.use(VueRouter);

const requireAuth = () => (to, from, next) => {
  var login_auth = store.state.Userinfo.User_auth[0]
  if (login_auth == 'ROLE_ADMIN') {
    return next();
  }
  next('/Login');
};

const routes = [
  {
    path: '/',
    redirect: '/Main',
    name: 'Home',
    component: Home,
    children:[
      {
        path:'product/:id',
        name:'Product_User',
        component: Product_User
      },
      {
        path:'/boardlist'
        ,name:'BoardList'
        ,component:BoardList
      },
      {
        path:'/boardDetail/:aIdx'
        ,name:'BoardDetail'
        ,component:BoardDetail
      },
      {
        path:'/boardWrite'
        ,name:'BoardWrite'
        ,component:BoardWrite
        ,props: true
      },
      {
        path:'/boardEdit'
        ,name:'boardEdit'
        ,component:boardEdit
      },
      {
        path:'/Main'
        ,name:'Main'
        ,component:Main
      },
      {
        path:'/Top'
        ,name:'Top'
        ,component:Top
      },
      {
        path:'/LongTop'
        ,name:'LongTop'
        ,component:LongTop
      },
      {
        path:'/ShortTop'
        ,name:'ShortTop'
        ,component:ShortTop
      },
      {
        path:'/Pants'
        ,name:'Pants'
        ,component:Pants
      },
      {
        path:'/LongPants'
        ,name:'LongPants'
        ,component:LongPants
      },
      {
        path:'/ShortPants'
        ,name:'ShortPants'
        ,component:ShortPants
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
    path: '/Admin',
    name: 'Admin',
    component: Admin,
    beforeEnter: requireAuth(),

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
