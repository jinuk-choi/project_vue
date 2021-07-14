import Vue from 'vue'
import Vuex from 'vuex'
import router from "../router";
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rank: 0,
    temp: 12345678911, 
    all: '전체',
    sales_flag: 0,
    login_flag: false, //로그인 성공시 1로 바뀌고 로그인 하지않았을 때나 로그아웃 시 0으로 바뀐다. 
    login_prev: 2,

     //user
     userlist_headers: [
      { text: '아이디', value: 'username'},
      { text: '비밀번호', value: 'password'},
      { text: '이름', value: 'name'},
      { text: '주소', value: 'address'},
      { text: '전화번호', value: 'phone'},
      { text: '이메일', value: 'email'},
      { text: '관리', value: 'management'},
    ],
    
    //회원 목록에 뿌려질 사용자를 담을 리스트 배열
    userlist:[],  

    //로그인 된 사용자의 정보 
    Userinfo:{User_Id:null,User_Name:null,User_auth:[],User_token:null},

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
  getters: {
    get_orderDetailList: state => {
      return state.orderDetailList
    }
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
    SET_USERDATA(state, data) {
      //Userinfo는 객체고, userlist는 배열인데 어차피 배열로 회원목록 뿌려줘야하므로 userlist 그대로 사용하도록 한다.
       state.userlist = data      
    },
    SET_USER(state, data) {
      state.Userinfo.User_Id = data.username
      state.Userinfo.User_Name = data.name
      state.Userinfo.User_auth = data.roles
      state.Userinfo.User_token = data.token
      state.login_flag = true
    },
    SET_USER_REFRESH(state,data) {
      state.Userinfo.User_Id = data.username
      state.Userinfo.User_Name = data.name
      state.Userinfo.User_auth = data.authorities
      state.Userinfo.User_token = data.token
    },
    LogOut(state) {
      state.Userinfo.User_Id = null
      state.Userinfo.User_Name = null
      state.Userinfo.User_auth = null
      state.Userinfo.User_token = null
      state.login_flag = false
      localStorage.removeItem("token")
      // localStorage.removeItem("Authorization")
      console.log(state.Userinfo)
      console.log("로그아웃됐니?, 토큰 값: "+localStorage.getItem("token"))
      // console.log("로그아웃됐니?, 토큰 값: "+localStorage.getItem("Authorization"))
    },
    INSERT_TOKEN(state) {
      state.Userinfo.User_token = localStorage.getItem("token")
      state.login_flag = true
    },

  },
  actions: {
    CategoryList({commit}) {
      return new Promise((resolve, reject) => {
          axios.get('http://localhost:9100/api/admin/categorylist')
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
          axios.post('http://localhost:9100/api/admin/categoryupdate',payload)
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
          axios.post('http://localhost:9100/api/admin/categoryadd',payload)
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
          axios.get('http://localhost:9100/api/admin/categoryname')
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
          axios.post('http://localhost:9100/api/admin/categoryselect',payload)
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
          axios.get('http://localhost:9100/api/admin/productlist')
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
          axios.post('http://localhost:9100/api/admin/productcreate',
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
          axios.post('http://localhost:9100/api/admin/productdataupdate', 
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
          axios.post('http://localhost:9100/api/admin/productupdate',payload)
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
          axios.post('http://localhost:9100/api/admin/productdelete',payload)
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
          axios.get('http://localhost:9100/api/admin/orderlist')
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
          axios.post('http://localhost:9100/api/admin/orderdetail',payload)
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
          axios.post('http://localhost:9100/api/admin/orderdetaildelete',payload)
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
          axios.post('http://localhost:9100/api/admin/orderdetailupdate',payload)
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

    UserList({commit, state}) {
      return new Promise((resolve, reject) => {
          axios.get('http://localhost:9100/api/admin/userlist')
              .then(Response => {
                  console.log('------ response.data')
                  console.log(Response.data)
                  commit('SET_USERDATA', Response.data)

                  console.dir(state.Userinfo.User_Id)
                  console.dir(state.Userinfo.User_Name)
                  console.log('----------------------------')
                  console.dir(state.Userinfo)
                  console.dir(state.Userinfo.User_auth)
                  console.dir(state.Userinfo.User_auth[0]) // login
                  console.dir(state.Userinfo.User_auth[0].authority) // 새로고침시
              })
              .catch(Error => {
                  console.log('error')
                  reject(Error)
              })
      })
    },
    UserUpdate({commit, state},payload) {
      console.log(payload)
      if(confirm('회원정보를 수정하시겠습니까?') == true){
      return new Promise((resolve, reject) => {
          axios.post('http://localhost:9100/api/admin/userupdate',payload)
              .then(Response => {
                    console.log(Response.data)
                    console.log(this.state.temp)
                    this.state.temp=0
                    console.log(this.state.temp)
                    commit('SET_USERDATA', Response.data) 
              })
              .catch(Error => {
                  alert('권한이 없습니다.')
                  console.log('error')
                  reject(Error)
              })           
          })
      } else{
         return;
      }
    },
    UserDelete({commit},payload) {
      console.log(payload)
      if(confirm('회원을 탈퇴처리 하시겠습니까?') == true){
          return new Promise((resolve, reject) => {
              axios.post('http://localhost:9100/api/admin/userdelete',payload)
                  .then(Response => {
                        console.log(Response.data)
                        commit('SET_USERDATA', Response.data)
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
    Login({ commit }, payload) {
      return new Promise((resolve, reject) => {
          axios.post('http://localhost:9100/api/auth/signin', payload)
              .then(Response => {
                  console.log(Response.data)
                  if (Response.data.username != null) {
                    //로그인 시 헤더에 디폴트 값으로 포함되는 권한을 추가함.
                      axios.defaults.headers.common['Authorization'] = `Bearer ${Response.data.token}`
                      localStorage.setItem("token", Response.data.token)
                      commit('SET_USER', Response.data)  
                        if(this.state.login_prev == 0){
                          router.push({ name: 'Home' })   
                        }
                        else if(this.state.login_prev == 1){
                          router.push({ name: 'Home' })   
                        }
                        else if(this.state.login_prev == 2){
                          router.push({ name: 'Admin' })
                        }  
                  }
              })
              .catch(Error => {
                  alert('아이디 또는 비밀번호를 확인해주세요.')
                  console.log('error')
                  reject(Error)
              })
      })
    },
    UnpackToken({commit}) {
        return new Promise((resolve, reject) => {
          axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`
          axios.get('http://localhost:9100/api/auth/unpackToken')
              .then(Response => {
                console.log(Response.data)
                commit('SET_USER_REFRESH',Response.data)
              })
              .catch(Error => {
                console.log(Error)
                  console.log('unpackToken_error')
              })
      })
    },
    LogOut({commit}){
      return new Promise((resolve, reject) => {
        //로그아웃시 헤더에 디폴트 값으로 포함되는 권한을 null로 처리함.
        axios.defaults.headers.common['Authorization'] = null;
        commit('LogOut')
      })
    },
    Join({commit},payload){
        console.log(payload)
        return new Promise((resolve, reject) => {
          axios.post('http://localhost:9100/api/auth/signup',payload)
              .then(Response => {
                if(Response.data == 'success'){
                  console.log(Response.data)
                  alert("회원가입이 완료되었습니다.");      
                  router.push({ name: 'Home' })      
                }else{
                  alert('이미 사용중인 아이디입니다.')
                }
              })
              .catch(Error => {
                  alert('입력양식을 확인해주세요.')
                  console.log('error')
                  reject(Error)
              })
      })
    },
    duplicate({commit},payload){
      console.log(payload)
      return new Promise((resolve, reject) =>{
        axios.post('http://localhost:9100/api/auth/duplicate',payload)
          .then(Response =>{
            console.log(Response.data)
            if(Response.data == 'success'){
              alert('사용 가능한 아이디입니다.')
            }else{
              alert('이미 사용중인 아이디입니다.')
            }
          })
          .catch(Error => {
            console.log('error')
            reject(Error)
        })
      })
    },





  },
  modules: {
  }
})
