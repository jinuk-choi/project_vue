import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //도메인 변경을 위한 변수
    //dns:"yosinsa.com:9100",
    dns:"localhost:9100",

    rank: 0,
    temp: 12345678911, 
    all: '전체',
    sales_flag: 0,
    login_flag: false, //로그인 성공시 1로 바뀌고 로그인 하지않았을 때나 로그아웃 시 0으로 바뀐다. 
    login_prev: 0,

    //사용자단
    imageByRank:[], // Rank image
    imageTop:[], // Top image
    imageShortTop:[], // ShortTop image
    imageLongTop:[], // LongTop image
    imagePants:[], // Pants image
    imageLongPants:[], // LongPants image
    imageShortPants:[], // ShortPants image
    cartList:[],
    orderCartList:[],

    //사용자화면 주문내역 
    orderdetail_headers_2:[
      {text:'상품코드', value:'id'},
      {text:'상품정보', value:'id'},
      {text:'주문수량', value:'product'},
      {text:'판매가격', value:'total_price'},
    ],
    orderDetailListX:{},

    //게시판 상세보기
    board_detail:[],

     //관리자단 
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
    Userinfo:{User_Id:null,User_Name:null,User_auth:[null],User_token:null,
              User_address:null,User_phone:null,User_email:null},

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

    //ranking
    ranking_header: [
      { text: '순위', value: 'rank', },
      { text: '누적판매량', value: 'order_count', },
      { text: '상품명', value: 'name' },
    ],
    ranking:[],

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
      {text:'보기', value:''},
    ],
    orderdetail_headers_1:[
      {text:'상품코드', value:'id'},
      {text:'상품정보', value:'id'},
      {text:'주문수량', value:'product'},
      {text:'판매가격', value:'total_price'},
      {text:'관리', value: ''}
    ],
    orderlist:[null],
    orderDetailList:{},

    //sales
    sales_headers:[
      {text:'주문번호', value:'id'},
      {text:'주문날짜', value:'date'},
      {text:'주문자아이디', value:'id'},
      {text:'주문자성명', value:'name'},
      {text:'휴대폰', value:'phone'},
      {text:'주문합계', value:'total_price'},
      {text:'상세보기', value:''},
    ],
    salesdata:[null],

    
  },

  getters: {
    get_orderDetailList: state => {
      return state.orderDetailList
    },
    get_orderDetailListX: state => {
      return state.orderDetailListX
    }
  },

  mutations: {
    SET_IMAGE_BY_RANK(state,data){
      state.imageByRank = data
    },
    SET_IMAGE_TOP(state, data){
      state.imageTop = data
    },
    SET_IMAGE_SHORT_TOP(state, data){
      state.imageShortTop = data
    },
    SET_IMAGE_LONG_TOP(state, data){
      state.imageLongTop = data
    },
    SET_IMAGE_PANTS(state, data){
      state.imagePants = data
    },
    SET_IMAGE_LONG_PANTS(state, data){
      state.imageLongPants = data
    },
    SET_IMAGE_SHORT_PANTS(state, data){
      state.imageShortPants = data
    },
    SET_CATEGORY(state, data) {
      state.categorylist = data
    },
    SET_CATEGORY_NAME(state, data) {
      for(var item=0; item <data.length; item++)  {
        data[item] = data[item].name;
      }

      state.categoryname = data
    },
    SET_SALES_DATA(state,data){
      state.salesdata = data
    },
    SET_PRODUCT_LIST(state, data){
      state.productlist = data
    },
    SET_PRODUCT(state, data){
        state.product = data
        console.log(state.product)
    },
    SET_CARTLIST(state,data){
      state.cartList.push(data);
      console.log(state.cartList)
    },
    SET_CARTORDER(state,data){
      state.orderCartList = data
      console.log(state.orderCartList)
    },
    CARTOUT(state) {
      state.cartList = [];
      console.log(state.cartList)
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
    SET_ORDER_DETAIL_LIST(state, data){
      state.orderDetailListX = data
      console.log(state.orderDetailListX)
    },
    SET_USERDATA(state, data) {
       state.userlist = data      
    },
    SET_USER(state, data) {
      state.Userinfo.User_Id = data.username
      state.Userinfo.User_Name = data.name
      state.Userinfo.User_auth = data.roles
      state.Userinfo.User_token = data.token
      state.Userinfo.User_email = data.email
      state.Userinfo.User_address = data.address
      state.Userinfo.User_phone = data.phone
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
      state.Userinfo.User_auth = ' '
      state.Userinfo.User_token = null
      state.login_flag = false
      localStorage.removeItem("token")
      console.log(state.Userinfo)
      console.log("로그아웃?, 토큰 값: "+localStorage.getItem("token"))
    },
    INSERT_TOKEN(state) {
      state.Userinfo.User_token = localStorage.getItem("token")
      state.login_flag = true
    },
    SET_RANKING(state, data) {
      function oc_Sort(a, b) { 
        return b.order_count - a.order_count;
      }
      data.sort(oc_Sort);
      //위에서 정렬을 끝내고 오면, 거기에 순위를 매겨주는 로직
      //모두 null로 넘어오기에 정렬이 끝났다면 거기에 순위를 붙여줌
      for(var i = 0; i<data.length; i++){
        data[i].rank = i+1;
      }
      state.ranking = data
    },
    SET_BOARDDETAIL(state,data) {
      state.board_detail=data
      router.push("/boardDetail/"+data.aIdx)
    },
  },
  actions: {
    CategoryList({commit}) {
      var dns = this.state.dns
      return new Promise((resolve, reject) => {
          axios.get('http://'+ dns +'/api/admin/categorylist')
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
      var dns = this.state.dns
      if(confirm('분류명을 수정하시겠습니까?') == true){  
        return new Promise((resolve, reject) => {
            axios.post('http://'+ dns +'/api/admin/categoryupdate',payload)
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
      var dns = this.state.dns
      var name;
      if(name = prompt('하위분류명을 입력해주세요.')){
      alert(name)
      payload.name = name //부모카테고리의 내용에서 분류명만 현재 입력받은 분류명으로 바뀌어 넘겨준다.
      console.log(payload)
      return new Promise((resolve, reject) => {
          axios.post('http://'+ dns +'/api/admin/categoryadd',payload)
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
      var dns = this.state.dns
      return new Promise((resolve, reject) => {
          axios.get('http://'+ dns +'/api/admin/categoryname')
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
      var dns = this.state.dns
      console.log(payload)
      return new Promise((resolve, reject) => {
          axios.post('http://'+ dns +'/api/admin/categoryselect',payload)
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
      var dns = this.state.dns
      return new Promise((resolve, reject) => {
          axios.get('http://'+ dns +'/api/admin/productlist')
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
      var dns = this.state.dns
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
          axios.post('http://'+ dns +'/api/admin/productcreate',
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
      var dns = this.state.dns
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
          axios.post('http://'+ dns +'/api/admin/productdataupdate', 
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
          })           
        })
      } else{
         return;
      }
    },
 
    ProductUpdate({commit},payload) {
      var dns = this.state.dns
      return new Promise((resolve, reject) => {
          axios.post('http://'+ dns +'/api/admin/productupdate',payload)
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
      var dns = this.state.dns
      console.log(payload)
      if(confirm('상품을 삭제하시겠습니까?') == true){
      return new Promise((resolve, reject) => {
          axios.post('http://'+ dns +'/api/admin/productdelete',payload)
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
      var dns = this.state.dns
      return new Promise((resolve, reject) => {
          axios.get('http://'+ dns +'/api/admin/orderlist')
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
      var dns = this.state.dns
      var obj = {id: router.currentRoute.params.id};
      payload = obj;
      console.log(payload)
      return new Promise((resolve, reject) => {
          axios.post('http://'+ dns +'/api/admin/orderdetail',payload)
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
      var dns = this.state.dns
      console.log(payload)
      if(confirm('해당 주문을 삭제하시겠습니까?') == true){
      return new Promise((resolve, reject) => {
          axios.post('http://'+ dns +'/api/admin/orderdetaildelete',payload)
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
      var dns = this.state.dns
      console.log(payload)
      if(confirm('주문정보를 수정하시겠습니까?') == true){
      return new Promise((resolve, reject) => {
          axios.post('http://'+ dns +'/api/admin/orderdetailupdate',payload)
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

    Ranking({commit}) {
      var dns = this.state.dns
      return new Promise((resolve, reject) => {
          axios.get('http://'+ dns +'/api/admin/ranking')
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

    SalesData({commit},payload){
      var dns = this.state.dns
      var dateinfo = {dateinfo:router.currentRoute.params}
      console.log(dateinfo)
      payload = dateinfo
      commit('SET_SALES_DATA', null) //SalesData 페이지로 넘어가기 전에 우선 state.salesdata의 내용물을 null로 초기화함.
      return new Promise((resolve,reject) =>{
          axios.post('http://'+ dns +'/api/admin/salesdata',payload)
              .then(Response =>{
                console.log(Response.data)
                if(Response.data == 'empty'){        
                  router.push({ name: 'Sales' })      
                  alert('표시할 데이터가 없습니다.')
                  return;
                }else{
                  commit('SET_SALES_DATA', Response.data)
                }
              })
              .catch(Error =>{
                  console.log('error')
                  reject(Error)
              })
      })
    },

    SalesByTime({commit}, payload){
      var dns = this.state.dns
      console.log(payload)
      return new Promise((resolve, reject) =>{
          axios.post('http://'+ dns +'/api/admin/salesbytime', payload)
               .then(Response =>{
                  console.log(Response.data)
                  commit('SET_RANKING', Response.data)
          })
          .catch(Error =>{
              console.log('error')
              reject(Error)
          })
      })
    },

    

    UserList({commit, state}) {
      var dns = this.state.dns
      return new Promise((resolve, reject) => {
          axios.get('http://'+ dns +'/api/admin/userlist')
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
      var dns = this.state.dns
      console.log(payload)
      if(confirm('회원정보를 수정하시겠습니까?') == true){
      return new Promise((resolve, reject) => {
          axios.post('http://'+ dns +'/api/admin/userupdate',payload)
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
      var dns = this.state.dns
      console.log(payload)
      if(confirm('회원을 탈퇴처리 하시겠습니까?') == true){
          return new Promise((resolve, reject) => {
              axios.post('http://'+ dns +'/api/admin/userdelete',payload)
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
//일반 로그인.
    Login({ commit }, payload) {
      var dns = this.state.dns
      return new Promise((resolve, reject) => {
          axios.post('http://'+ dns +'/api/auth/signin', payload)
              .then(Response => {
                  console.log(Response.data)
                  if (Response.data.username != null) {
                    //로그인 시 헤더에 디폴트 값으로 포함되는 권한을 추가함.
                      axios.defaults.headers.common['Authorization'] = `Bearer ${Response.data.token}`
                      localStorage.setItem("token", Response.data.token)
                      commit('SET_USER', Response.data)  
                        if(this.state.login_prev == 0){
                          router.push({ name: 'Main' })   
                        }
                        else if(this.state.login_prev == 1){
                          router.push({ name: 'Main' })   
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
//카카오 로그인.
    Klogin({ commit }, payload) {
      var dns = this.state.dns
      return new Promise((resolve, reject) => {
          axios.post('http://'+ dns +'/api/auth/signin', payload)
              .then(Response => {
                  console.log(Response.data)
                  if (Response.data.username != null) {
                    //로그인 시 헤더에 디폴트 값으로 포함되는 권한을 추가함.
                      axios.defaults.headers.common['Authorization'] = `Bearer ${Response.data.token}`
                      localStorage.setItem("token", Response.data.token)
                      console.log(localStorage.token)
                      commit('SET_USER', Response.data)
                        router.push({ name: 'Main' })    
                  }
              })
              .catch(Error => {
                  alert('정보를 입력해주세요.')
                  console.log('error')
                  reject(Error)
              })
      })
    },

    UnpackToken({commit}) {
      var dns = this.state.dns
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`
        axios.get('http://'+ dns +'/api/auth/unpackToken')
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
      var dns = this.state.dns
      console.log(payload)
      return new Promise((resolve, reject) => {
        axios.post('http://'+ dns +'/api/auth/signup',payload)
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
      var dns = this.state.dns
      console.log(payload)
      return new Promise((resolve, reject) =>{
        axios.post('http://'+ dns +'/api/auth/duplicate',payload)
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

    // -------------- 사용자 화면 ----------------
    Product({commit},payload) {
      var dns = this.state.dns
      var obj = {id: router.currentRoute.params.id};
      payload = obj;
      console.log(obj);
      return new Promise((resolve, reject) => {
          axios.post('http://'+ dns +'/api/product',payload)
              .then(Response => {
                  console.log(Response.data)
                  commit('SET_PRODUCT', Response.data)
              })
              .catch(Error => {
                  console.log('error')
                  reject(Error)
              })
      })
    },

    //장바구니
    OrderCart({commit},payload) {
      return new Promise((resolve, reject) => {
        commit('SET_CARTLIST', payload)
        router.push("/OrderCart")
      })
    },
    //장바구니 비우기
    CartOut({commit}) {
      return new Promise((resolve, reject) => {
        commit('CARTOUT')
        alert('장바구니에서 삭제 되었습니다.')
        router.go(router.currentRoute);
      })
    },
    //장바구니 주문하기
    CartOrder({commit},payload) {
      return new Promise((resolve, reject) => {
        commit('SET_CARTORDER', payload)
        router.push("/CartOrderForm")
      })
    },
    //사용자화면 주문내역
    OrderListDetail({commit},payload) {
      var dns = this.state.dns
      payload = {user_id: this.state.Userinfo.User_Id}
      console.log(payload)
      return new Promise((resolve, reject) => {
          axios.post('http://'+ dns +'/api/orderListDetail',payload)
              .then(Response => {
                  console.log(Response.data)
                  commit('SET_ORDER_DETAIL_LIST', Response.data)
              })
              .catch(Error => {
                  console.log('error')
                  reject(Error)
              })
      })
    },

    imageByRank({commit}){
      var dns = this.state.dns
      console.log('상품랭킹 순 이미지')
      return new Promise((resolve, reject) => {
        axios.get('http://'+ dns +'/api/imageByRank')
        .then(Response => {
          console.log(Response.data)
          commit('SET_IMAGE_BY_RANK',Response.data)
        })
        .catch(Error => {
          console.log('error')
          reject(Error)
        })
      })      
    },

    imageTop({commit}){
      var dns = this.state.dns
      return new Promise((resolve, reject) => {
        axios.get('http://'+ dns +'/api/imageTop')
        .then(Response => {
          console.log(Response.data)
          commit('SET_IMAGE_TOP',Response.data)
        })
        .catch(Error => {
          console.log('error')
          reject(Error)
        })
      })      
    },

    imageLongTop({commit}){
      var dns = this.state.dns
      return new Promise((resolve, reject) => {
        axios.get('http://'+ dns +'/api/imageLongTop')
        .then(Response => {
          console.log(Response.data)
          commit('SET_IMAGE_LONG_TOP',Response.data)
        })
        .catch(Error => {
          console.log('error')
          reject(Error)
        })
      })      
    },

    imageShortTop({commit}){
      var dns = this.state.dns
      return new Promise((resolve, reject) => {
        axios.get('http://'+ dns +'/api/imageShortTop')
        .then(Response => {
          console.log(Response.data)
          commit('SET_IMAGE_SHORT_TOP',Response.data)
        })
        .catch(Error => {
          console.log('error')
          reject(Error)
        })
      })      
    },

    imagePants({commit}){
      var dns = this.state.dns
      return new Promise((resolve, reject) => {
        axios.get('http://'+ dns +'/api/imagePants')
        .then(Response => {
          console.log(Response.data)
          commit('SET_IMAGE_PANTS',Response.data)
        })
        .catch(Error => {
          console.log('error')
          reject(Error)
        })
      })      
    },

    imageLongPants({commit}){
      var dns = this.state.dns
      return new Promise((resolve, reject) => {
        axios.get('http://'+ dns +'/api/imageLongPants')
        .then(Response => {
          console.log(Response.data)
          commit('SET_IMAGE_LONG_PANTS',Response.data)
        })
        .catch(Error => {
          console.log('error')
          reject(Error)
        })
      })      
    },

    imageShortPants({commit}){
      var dns = this.state.dns
      return new Promise((resolve, reject) => {
        axios.get('http://'+ dns +'/api/imageShortPants')
        .then(Response => {
          console.log(Response.data)
          commit('SET_IMAGE_SHORT_PANTS',Response.data)
        })
        .catch(Error => {
          console.log('error')
          reject(Error)
        })
      })      
    },

    boardDetail({commit},payload) {
      var dns = this.state.dns
      return new Promise((resolve, reject) => {
        axios.get('http://'+ dns +'/api/boardDetail', {
          params: {
            aIdx: payload
          }
        })
            .then(Response => {
                console.log(Response.data)
                commit('SET_BOARDDETAIL', Response.data)
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
