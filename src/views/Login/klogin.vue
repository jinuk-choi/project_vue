<template>
  <div class="klogin">
    <div class="container d-flex justify-content-center align-items-center; ">
      <div class="card">
        <div class="row">
          <div class="col-md-12">
            <b-form
              class="form"
              v-if="show"
            >
              <h2>회원가입</h2>
              <div class="inputbox mt-3">
                <span>이름</span>
                <input
                  type="text"
                  placeholder="실명을 입력해주세요"
                  class="form-control"
                  v-model="name"
                  required
                />
              </div>
              <div class="inputbox mt-3">
                <span>이메일</span>
                <input
                  type="text"
                  v-text="username"
                  v-model="username"
                  class="form-control"
                  required
                  disabled
                />
              </div>
              <div class="inputbox mt-3">
                <span>휴대폰 번호</span>
                <input
                  type="text"
                  placeholder="010-0000-0000"
                  v-model="phone"
                  class="form-control"
                />
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <div class="text-right">
                 <v-btn type="submit" width="300px" height="50px" 
                  @click="Kjoin({username, name, phone, password})">등록하기
                 </v-btn>
                </div>
              </div>
            </b-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import Route from '@/router/index'
import {mapActions} from "vuex"

export default {
  created() {
      this.create();
  },
  data() {
    return {
      codes:"" ,   
      phone: "",
      username: "",
      name: "",
      password:" ",
      jwt:"",
      show: true,
    };
  },
  methods: {
    ...mapActions(["Klogin"]),

    create() {
        this.codes = this.$route.query.code;
        this.getToken();
    },
  
    getToken() {
        var dns = this.$store.state.dns
        return new Promise((resolve, reject) => {
            axios.post('http://'+ dns +'/klogin?authorize_code=' + this.codes)
                .then(Response => {
                    console.log(Response.data)
                    this.username = Response.data.email
                    this.password = Response.data.nickname
                    this.jwt = this.codes
                    if (this.password == undefined) {
                      Route.push({ name: 'Login' })
                      
                    } else {
                      this.Klogin({username:this.username, password:this.password, jwt:this.jwt})
                    }
                })
                .catch(Error => {
                    console.log('error')
                    reject(Error)
                })
        })
    },

    Kjoin(payload){
      var dns = this.$store.state.dns
      return new Promise((resolve, reject) => {
        axios.post('http://'+ dns +'/api/auth/signup',payload)
          .then(Response => {
            console.log(Response.data)

          .catch(Error => {
            console.log('error')
            reject(Error)
          })
          })
      })
    },



  }
}
</script>
