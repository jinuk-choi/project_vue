<template>
  <div style="text-align:center; 
              margin-top:50px;
              width:300px;  
              position: absolute;
              text-align: center;
              width: 100%;
              height: 100%;">
      <h1 style="text-align:center">
          Login
      </h1>
      <form>
        <p>
          <input type="text" required style="border: 0.5px solid; width:300px; height: 50px;" v-model="username" placeholder="ID">
        </p>
        <p>
          <input type="password" required style="border: 0.5px solid; width:300px; height: 50px;" v-model="password" placeholder="PASSWORD">
        </p>

        <span v-if="username == '' || password ==''">
             <v-btn width="300px" height="50px" @click="error()">로그인</v-btn>
        </span>
        <span v-else>
              <v-btn width="300px" height="50px" @click="Login({username, password})">로그인</v-btn>
        </span>
      </form>
  </div>
</template>

<script>
import {mapActions} from "vuex"
  export default {
    data () {
      return {     
        username: '',
        password: '',
      }
    },
    methods:{
      ...mapActions(["Login"]),
      error(){
        alert('ID 또는 PASSWORD를 확인해 주세요.')
      }
    },
  }
</script>