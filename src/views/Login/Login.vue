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
          <input type="password" required style="border: 0.5px solid; width:300px; height: 50px; margin-bottom:20px;" v-model="password" placeholder="PASSWORD">
        </p>
        <span v-if="username == '' || password ==''">
             <v-btn width="300px" height="20px" @click="error()">로그인</v-btn>
        </span>
        <span v-else>
              <v-btn width="300px" height="20px" @click="Login({username, password})">로그인</v-btn>
        </span>
      </form>
        <a href="https://kauth.kakao.com/oauth/authorize?client_id=60fe433722c3b3c6083b42fe8cd72063&redirect_uri=http://yosinsa.com/klogin&response_type=code">
        <!-- <a href="https://kauth.kakao.com/oauth/authorize?client_id=60fe433722c3b3c6083b42fe8cd72063&redirect_uri=http://localhost:8080/klogin&response_type=code"> -->
          <img :src="image('kakao_login')" style="margin-top:1%;">
        </a>
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
      },

      image(image){
        //경로를 조합해줄 메서드.
        if(image == null){
          return require('@/images/null.jpg');
        }
        return require('@/images/'+ image +'.jpg');
      }
    },
  }
</script>