<template>
  <v-app id="inspire">
   <router-view/>
  </v-app>
</template>

<script>
import {mapMutations, mapState} from "vuex"

  export default {
    data: () => ({
      drawer: null,
    }),
    computed: {
      ...mapState(["Userinfo"])
    },
    methods: {
      ...mapMutations(["logout"])
    },
    created() {
      //새로고침시 state의 토큰은 초기화 되지만 LocalStorage에 토큰이 있을때, 즉 로그인을 한 경우 다시 토큰을 가져와준다.
      if(this.Userinfo.User_token === null && localStorage.getItem("token") !== null) {
        this.$store.commit("INSERT_TOKEN"),
        this.$store.dispatch('UnpackToken')
        console.log("로그인 활성화, 토큰 값: " + localStorage.getItem("token"))
      }  
      //로그인이 되어있지 않을때 아무작업을 해주지 않는다.
      else if (this.Userinfo.User_token === null && localStorage.getItem("token") === null) {
        console.log("로그인 비활성화")
        this.$store.dispatch('imageByRank')
      }
    }
  }
</script>