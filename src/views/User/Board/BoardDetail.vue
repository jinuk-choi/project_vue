<template>
  <v-flex xs12>
    <table>
      <tr>
        <td colspan="2" style="font-weight:700;">제목: {{board_detail.aTitle}}</td>
      </tr>
      <tr style="font-size:0.9rem;">
        <td style="text-align:left">작성자: {{board_detail.user.name}}</td>
      </tr>
      <tr style="font-size:0.9rem;">
        <td style="text-align:left">작성일: {{board_detail.aDate}}</td>
      </tr>
      <tr>
        <td colspan="2" style="border:none;">내용: {{board_detail.aContent}}</td>
      </tr>
      <tr>
        <td colspan="2" style="border:none;text-align:right;border-top:3px double #ededed"
          v-if="this.$store.state.login_flag == 1"
        >
          <v-btn  router :to="{name:'BoardWrite', params:{aDepth: board_detail.aDepth
                                                          ,aGroup: board_detail.aGroup
                                                          ,aOrder: board_detail.aOrder}}">답글</v-btn>
          <v-btn v-if="this.$store.state.Userinfo.User_Id == this.$store.state.board_detail.uId"
           router :to="{name:'boardEdit'}">수정
          </v-btn>
          <v-btn v-if="this.$store.state.Userinfo.User_Id == this.$store.state.board_detail.uId
                    || this.$store.state.Userinfo.User_auth[0] == 'ROLE_ADMIN'"
          @click="BoardDelete($route.params.aIdx)">삭제</v-btn>
        </td>
      </tr>
    </table>
  </v-flex>
  
</template>
<script>
import { mapActions, mapState } from "vuex"
import axios from 'axios'
import Route from '@/router/index'

export default {

    data() {
      return {
      }
    },

    computed: {
       ...mapState(["board_detail"])
    },
    methods: {

      BoardDelete(aIdx) {
        var dns = this.$store.state.dns
        return new Promise((resolve, reject) => {
          axios.delete('http://'+ dns +'/api/boardDelete/'+aIdx)
              .then(Response => {
                  console.log(Response.data)
                  Route.push("/boardlist")
              })
              .catch(Error => {
                  console.log('error')
                  reject(Error)
              })
        })
      },

    }
}
</script>
<style scoped>
table {
  width:600px;
  margin:0 auto;
  border-collapse:collapse;
  text-align: center;
}
table tr td {
  border-top:1px solid #ededed;
  border-bottom:1px solid #ededed;
  padding:10px;
}
</style>