import Vue from 'vue'
import Vuex from 'vuex'
import router from "../router";
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //category
    category_headers: [
      {
        text: '분류코드',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      { text: '분류명', value: 'name' },
      { text: '상품재고수', value: 'product_count' },
      { text: '관리', value: 'management' },
    ],
    categorylist:[],
    categoryname:[],

    //product
    product_headers:[
      { text: '상품코드', value: 'id', },
      { text: '상품정보', value: 'price', },
      { text: '분류', value: 'category', },
      { text: '통계', value: 'order_count', },
      { text: '재고', value: 'quantity', },
      { text: '관리', value: 'management', },
    ],
    productlist:[],  
    product:[
      {id:' ', name:' ', price:' ', category:' ', quantity:' ', text:' '}
    ],

    //order
    order_headers:[
      {text:'주문번호', value:'id'},
      {text:'주문상품', value:'product'},
      {text:'주문자', value:'user_id'},
      {text:'주문일자', value:'date'},
      {text:'총 주문금액', value:'total_price'},
      {text:'주문상태', value:'state'},
      {text:'보기', value:''},
    ],
    orderdetail_headers_1:[
      {text:'상품코드', value:'id'},
      {text:'상품정보', value:'id'},
      {text:'주문수량', value:'product'},
      {text:'판매가격', value:'total_price'},
      {text:'관리', value: ''}
    ],
    orderlist:[],
    orderDetailList:{},


  },
  mutations: {
    SET_CATEGORY(state, data) {
      state.categorylist = data
    },
    SET_CATEGORY_NAME(state, data) {
      for(var item=0; item <data.length; item++)  {
        data[item] = data[item].name;
      }

      state.categoryname = data
    },

    SET_PRODUCT_LIST(state, data){
      state.productlist = data
    },
    SET_PRODUCT(state, data){
        state.product = data
        console.log(state.product)
    },
    UPDATE_PRODUCT(state, data){
        state.product = data
    },
    SET_ORDER(state, data){
      state.orderlist = data
    },
    SET_ORDER_DETAIL(state, data){
      state.orderDetailList = data
    },

  },
  actions: {
    CategoryList({commit}) {
      return new Promise((resolve, reject) => {
          axios.get('http://localhost:9000/api/admin/categorylist')
              .then(Response => {
                  console.log(Response.data)
                  commit('SET_CATEGORY', Response.data)
              })
              .catch(Error => {
                  console.log('error')
                  reject(Error)
              })
      })
    },
    CategoryUpdate({commit},payload) {
    if(confirm('분류명을 수정하시겠습니까?') == true){  
      return new Promise((resolve, reject) => {
          axios.post('http://localhost:9000/api/admin/categoryupdate',payload)
              .then(Response => {
                  console.log(Response.data)
                  commit('SET_CATEGORY', Response.data)
              })
              .catch(Error => {
                  alert('권한이 없습니다.')
                  console.log('error')
                  reject(Error)
              })
      })
      }else{
        return;
      }
    },
    CategoryAdd({commit},payload) {
      var name;
      if(name = prompt('하위분류명을 입력해주세요.')){
      alert(name)
      payload.name = name //이렇게 하면, 부모카테고리의 내용물에서 분류명만 현재 입력받은 분류명으로 바뀌어서 스프링으로 넘어가게 된다.
      console.log(payload)
      return new Promise((resolve, reject) => {
          axios.post('http://localhost:9000/api/admin/categoryadd',payload)
              .then(Response => {
                  console.log(Response.data)
                  commit('SET_CATEGORY', Response.data)
              })
              .catch(Error => {
                  alert('권한이 없습니다.')
                  console.log('error')
                  reject(Error)
              })
      })
      }else{
        return;
      }
    },
    CategoryName({commit}, all) {
      return new Promise((resolve, reject) => {
          axios.get('http://localhost:9000/api/admin/categoryname')
              .then(Response => {
                  console.log(Response.data)
                  commit('SET_CATEGORY_NAME', Response.data)
              })
              .catch(Error => {
                  console.log('error')
                  reject(Error)
              })
      })
    },
    CategorySelect({commit},payload) {
      console.log(payload)
      return new Promise((resolve, reject) => {
          axios.post('http://localhost:9000/api/admin/categoryselect',payload)
              .then(Response => {
                  console.log(Response.data)
                  commit('SET_RANKING', Response.data)
              })
              .catch(Error => {
                  console.log('error')
                  reject(Error)
              })
      })
    },

    ProductList({commit}) {
      return new Promise((resolve, reject) => {
          axios.get('http://localhost:9000/api/admin/productlist')
              .then(Response => {
                  console.log(Response.data)
                  commit('SET_PRODUCT_LIST', Response.data)
              })
              .catch(Error => {
                  console.log('error')
                  reject(Error)
              })
      })
    },
    ProductCreate({commit},payload) {
      let formData = new FormData()
      formData.append('file', payload.fileinput)
      formData.append('id', payload.id)
      formData.append('name', payload.name)
      formData.append('price', payload.price)
      formData.append('category', payload.category)
      formData.append('quantity', payload.quantity)
      formData.append('text', payload.text)

      if(confirm('상품을 등록하시겠습니까?') == true){
      return new Promise((resolve, reject) => {
          axios.post('http://localhost:9000/api/admin/productcreate',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*'
              }
          })
          .then(Response => {
            console.log(Response.data)
            commit('SET_PRODUCT_LIST', Response.data)},
            alert('상품이 등록되었습니다.'))    
          .then(() => router.push({ name: 'Product' }))
              .catch(Error => {
                  console.log('error')
                  reject(Error)
                  alert('상품등록에러')
                  .then(() => router.push({name:'ProductRegistration'}))
              })
      })
       }else{
         return;
       }
    },    
    
    ProductDataUpdate({commit},payload) {
      let formData = new FormData()
      if(payload.fileinput != null){
        formData.append('file', payload.fileinput)
      }
      formData.append('id', payload.id)
      formData.append('name', payload.name)
      formData.append('price', payload.price)
      formData.append('category', payload.category)
      formData.append('quantity', payload.quantity)
      formData.append('text', payload.text)

      if(confirm('상품정보를 수정하시겠습니까?') == true){
      return new Promise((resolve, reject) => {
          axios.post('http://localhost:9000/api/admin/productdataupdate', 
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*'
              }  
          })
          .then(Response => {
                console.log(Response.data)
                commit('SET_PRODUCT_LIST', Response.data) 
          })
          .then(() => router.push({ name: 'Product' }))
          .catch(Error => {
              console.log('error')
              reject(Error)
              alert('권한이 없습니다.')
              // alert('상품수정에러')
          })           
        })
      } else{
         return;
      }
    },
 
    ProductUpdate({commit},payload) {
      return new Promise((resolve, reject) => {
          axios.post('http://localhost:9000/api/admin/productupdate',payload)
              .then(Response => {
                  console.log(Response.data)
                  commit('UPDATE_PRODUCT', Response.data)
              })
              .then(() => router.push({ name:'ProductUpdate'}))
              .catch(Error => {
                  console.log('error')
                  reject(Error)
              })
        })     
    },

    ProductDelete({commit},payload) {
      console.log(payload)
      if(confirm('상품을 삭제하시겠습니까?') == true){
      return new Promise((resolve, reject) => {
          axios.post('http://localhost:9000/api/admin/productdelete',payload)
              .then(Response => {
                  console.log(Response.data)
                  commit('SET_PRODUCT_LIST', Response.data)
              })
              .catch(Error => {
                  alert('권한이 없습니다.')
                  console.log('error')
                  reject(Error)
              })
        })
      }
    },

    OrderList({commit}) {
      return new Promise((resolve, reject) => {
          axios.get('http://localhost:9000/api/admin/orderlist')
              .then(Response => {
                  console.log(Response.data)
                  commit('SET_ORDER', Response.data)
              })
              .catch(Error => {
                  console.log('error')
                  reject(Error)
              })
      })
    },
    
    OrderDetail({commit},payload) {
      var obj = {id: router.currentRoute.params.id};
      payload = obj;
      console.log(payload)
      return new Promise((resolve, reject) => {
          axios.post('http://localhost:9000/api/admin/orderdetail',payload)
              .then(Response => {
                  console.log(Response.data)
                  commit('SET_ORDER_DETAIL', Response.data)
              })
              .catch(Error => {
                  console.log('error')
                  reject(Error)
              })
      })
    },
    OrderDetailDelete({commit},payload) {
      console.log(payload)
      if(confirm('해당 주문을 삭제하시겠습니까?') == true){
      return new Promise((resolve, reject) => {
          axios.post('http://localhost:9000/api/admin/orderdetaildelete',payload)
              .then(Response => {
                  console.log(Response.data)
                  commit('SET_ORDER_DETAIL', Response.data)
              })
              .catch(Error => {
                  alert('권한이 없습니다.')
                  console.log('error')
                  reject(Error)
              })
        })
      } 
    },

    OrderDetailUpdate({commit},payload) {
      console.log(payload)
      if(confirm('주문정보를 수정하시겠습니까?') == true){
      return new Promise((resolve, reject) => {
          axios.post('http://localhost:9000/api/admin/orderdetailupdate',payload)
              .then(Response => {
                  console.log(Response.data)
                  commit('SET_ORDER_DETAIL', Response.data)
              })
              .catch(Error => {
                  console.log('error')
                  reject(Error)
              })
        })
      } else{
        return;
      }
    },





  },
  modules: {
  }
})
