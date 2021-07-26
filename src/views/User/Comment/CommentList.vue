<template>
  <v-flex xs12>
        <table
            v-for="item in List"
            :key="item.bIdx"
        >
        <td v-show="!item.bTn">
          <tr style="font-size:0.9rem;">
            <td style="text-align:left">작성자: {{board_detail.user.name}}
            </td>
          </tr>
          <tr style="font-size:0.9rem;">
            <td style="text-align:left">작성일: {{item.bRedate}} </td>
          </tr>
          <tr style="font-size:0.9rem;">
            <span v-if="item.bDepth > 1">
                <span v-for="n in item.bDepth-1" v-bind:key="n">ㄴ</span>
            </span>
            <td style="text-align:left"> {{item.bContent}} </td>
          </tr>
        </td>
          <v-row v-show="item.bTn">
            <v-col
              cols="10"
              sm="10"
            >
            <v-textarea
              v-model="bContent"
              type="text"
              auto-grow
              outlined
              rows="1"
              row-height="1"
            ></v-textarea>
           </v-col>
          </v-row>
          <td colspan="1" style="border:none;text-align:right;border-top:1px double #ededed" v-show= "!item.bTn">
            <v-btn @click="item.bTn = !item.bTn">답글</v-btn>
            <v-btn @click="item.bTn = !item.bTn">수정</v-btn>
            <v-btn @click="CommentDelete(item.bIdx,item.aIdx)">삭제</v-btn>
          </td>
          <td colspan="1" style="border:none;text-align:right;border-top:1px double #ededed" v-show="item.bTn">
            <v-btn @click="CommentWrite({bGroup: item.bGroup, bOrder: item.bOrder,bDepth: item.bDepth, bContent: bContent}), item.bTn = !item.bTn">등록</v-btn>
            <v-btn @click="CommentEdit({bIdx: item.bIdx,bContent: bContent })">수정</v-btn>
            <v-btn @click="item.bTn = !item.bTn">취소</v-btn>
          </td>
      </table>
      <div class="text-xs-center">
        <v-pagination
          v-model="page"
          :length="pagination.lastPage"
          :total-visible="5"
          @input="next(page)"
        ></v-pagination>
      </div>
  </v-flex>
</template>
<script>
import { mapActions, mapState } from "vuex"
import axios from 'axios'
export default {
    props: {
      aIdx: Number 
    },

    data() {
      return {
        pagination: null,
        page: 1,
        List: null,
        bTn: false,
        eDit: false,
        bContent: null,
      }
    
    },
    created() {
    this.commentList()
    },

    computed: {
       ...mapState(["board_detail"]),
       ...mapState(["Userinfo"])
    },
    methods: {
      CommentWrite(payload) {
          payload.uIdx = this.Userinfo.User_Idx
          payload.aIdx = this.board_detail.aIdx
          return new Promise((resolve, reject) => {
            axios.post('http://localhost:9100/api/test/commentWrite/', payload, {
              params: {
                aIdx: this.aIdx
              } 
            })
               .then(Response => {
                  console.log(Response.data)
                  this.pagination = Response.data
                  this.List = this.pagination.list
                  
              })
                    .catch(Error => {
                        console.log('error')
                        reject(Error)
                    })
          })
        },

        CommentEdit(payload) {
          payload.aIdx = this.board_detail.aIdx
          return new Promise((resolve, reject) => {
            axios.post('http://localhost:9100/api/test/commentEdit/', payload, {
              params: {
                aIdx: this.aIdx
              } 
            })
               .then(Response => {
                  console.log(Response.data)
                  this.pagination = Response.data
                  this.List = this.pagination.list
                  
              })
                    .catch(Error => {
                        console.log('error')
                        reject(Error)
                    })
          })
        },


      CommentDelete(bIdx) {
        return new Promise((resolve, reject) => {
          axios.delete('http://localhost:9100/api/test/commentDelete/'+bIdx, {
             params: {
                aIdx: this.aIdx
            } 
          })
              .then(Response => {
                  console.log(Response.data)
                  this.pagination = Response.data
                  this.List = this.pagination.list
                  //this.aIdx = this.List.aIdx
                  console.log('-------')
                  console.log(this.List)
                  
              })
              .catch(Error => {
                  console.log('error')
                  reject(Error)
              })
        })
      },
      next (page) {
        axios.get('http://localhost:9100/api/test/commentList/'+page, {
          params: {
                aIdx: this.aIdx
            } 
        })
          .then(Response => {
              console.log(Response.data)
              this.pagination = Response.data
              this.List = this.pagination.list
              console.log(this.List)
          })
          .catch(Error => {
              console.log('error')
              reject(Error)
          })
      },
      commentList() {
        return new Promise((resolve, reject) => {
          axios.get('http://localhost:9100/api/test/commentList', {
            params: {
                aIdx: this.aIdx
            }    
          })
              .then(Response => {
                  console.log(Response.data)
                  this.pagination = Response.data
                  this.List = this.pagination.list
             
              })
              .catch(Error => {
                  console.log('error')
                  reject(Error)
              })
        })
      }
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