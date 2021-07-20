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
          <td colspan="2" style="border:none;text-align:right;border-top:3px double #ededed">
            <v-btn  router :to="{name:'boardwrite', params:{aDepth: board_detail.aDepth
                                                           ,aGroup: board_detail.aGroup
                                                           ,aOrder: board_detail.aOrder}}">답글</v-btn>
            <v-btn  router :to="{name:'boardEdit'}">수정</v-btn>
            <v-btn @click="BoardDelete($route.params.aIdx)">삭제</v-btn>
          </td>
        </tr>
      </table>
          <CommentWrite :aIdx="board_detail.aIdx"></CommentWrite>
        <h2 style="text-align:center">댓글리스트</h2>
          <p></p>
          <CommentList :aIdx="board_detail.aIdx"></CommentList>
  </v-flex>
  
</template>
<script>
import { mapActions, mapState } from "vuex"
import axios from 'axios'
import Route from '@/router/index'
import CommentList from './CommentList.vue'
import CommentWrite from './CommentWrite.vue'

export default {
  components: { 
    CommentList,
    CommentWrite
  },

    data() {
      return {
      }
    },

    computed: {
       ...mapState(["board_detail"])
    },
    methods: {

      BoardDelete(aIdx) {
        return new Promise((resolve, reject) => {
          axios.delete('http://localhost:9100/api/test/boardDelete/'+aIdx)
              .then(Response => {
                  console.log(Response.data)
                  Route.push("/board/boardlist")
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