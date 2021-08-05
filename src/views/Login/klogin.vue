<template>
  <div class="klogin">
    <div class="container d-flex justify-content-center align-items-center">
      <div class="card">
        <div class="row">
          <div class="col-md-6">
            <b-form
              class="form"
              @submit="onSubmit"
              @reset="onReset"
              v-if="show"
            >
              <h2>회원가입</h2>
              <div class="inputbox mt-3">
                <span>이름</span>
                <input
                  type="text"
                  placeholder="실명을 입력해주세요"
                  class="form-control"
                  v-model="form.uname"
                  required
                />
              </div>
              <div class="inputbox mt-3">
                <span>이메일</span>
                <input
                  type="text"
                  v-text="form.email"
                  v-model="form.email"
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
                  name=""
                  class="form-control"
                />
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <div class="text-right">
                  <button
                    type="submit"
                    class="btn btn-sucess register btn-block"
                  >
                  Register
                  </button>
                </div>
                <div class="text-right">
                  <button
                    type="reset"
                    class="btn btn-sucess reset btn-block"
                  >
                  Reset
                  </button>
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

export default {
  created() {
      this.create();
  },
  data() {
    return {
      codes:"" ,   
      form: {
        password: "",
        email: "",
        uname: "",
      },
      show: true,
    };
  },
  methods: {
    create() {
        this.codes = this.$route.query.code;
        this.getToken();
    },
    login() {
      var dns = this.$store.state.dns
        return new Promise((resolve, reject) => {
            axios.post('http://'+ dns +'/klogin?authorize_code=' + this.form)
                .then(Response => {
                    console.log(Response.data)
                })
                .catch(Error => {
                    console.log('error')
                    reject(Error)
                })
        })
     
    },
    getToken() {
        var dns = this.$store.state.dns
        return new Promise((resolve, reject) => {
            axios.post('http://'+ dns +'/klogin?authorize_code=' + this.codes)
                .then(Response => {
                    console.log(Response.data)
                    Route.push("/Main")
                })
                .catch(Error => {
                    console.log('error')
                    reject(Error)
                })
        })
    },
    onSubmit(event) {
      event.preventDefault();
      axios.post('http://'+ dns +'/klogin?authorize_code=' + this.form)
        .then(Response => {
            console.log(Response.data)                 
        })
    }



  }

}
</script>
