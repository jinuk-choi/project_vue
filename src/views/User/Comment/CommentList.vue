<template>
  <v-flex xs12>
        <table
            v-for="item in List"
            :key="item.cId"
        >
        <tr v-show="!item.bTn">
            <td style="text-align:left; font-size:0.9rem;">작성자: {{item.user.name}}</td>
            <td style="text-align:left; font-size:0.9rem;">작성일: {{item.cDate}} </td>
            <td style="text-align:left; font-size:0.9rem;">
              <v-rating
                v-model="item.cRating"
                background-color="orange lighten-3"
                color="orange"
                small
              ></v-rating> 
            </td>
        </tr>
          <v-row v-show="item.bTn">
            <v-col
              cols="10"
              sm="10"
            >
            <v-textarea
              v-model="cContent"
              type="text"
              auto-grow
              outlined
              rows="1"
              row-height="1"
            ></v-textarea>
           </v-col>
          </v-row>
        <tr v-show="!item.bTn">
         <td style="font-size:0.9rem;">{{item.cContent}}</td>
        </tr>
        <tr style="border:none; text-align:right; border-top:1px double #ededed" v-show= "!item.bTn">
          <td>
            <v-btn @click="item.bTn = !item.bTn">수정</v-btn>
            <v-btn @click="CommentDelete(item.cId,item.id)">삭제</v-btn>
          </td>
        </tr>
          <tr style="border:none;text-align:right;border-top:1px double #ededed" v-show="item.bTn">
            <td>
              <v-btn @click="CommentEdit({cId: item.cId,cContent: cContent })">수정</v-btn>
              <v-btn @click="item.bTn = !item.bTn">취소</v-btn>
            </td>
          </tr>
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
    id: Number
  },

  data() {
    return {
      pagination: {},
      List: [],
      page: 1,
      cContent: null,
      bTn: false,
      cRating: null,
    }
  
  },

  created() {
    this.commentList()
  },

  computed: {
      ...mapState(["Userinfo"]),
  },
  methods: {
    CommentEdit(payload) {
      var dns = this.$store.state.dns
      payload.id = this.id
      return new Promise((resolve, reject) => {
        axios.post('http://'+ dns +'/api/commentEdit/', payload, {
          params: {
            id: this.id
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

    CommentDelete(cId) {
      return new Promise((resolve, reject) => {
        var dns = this.$store.state.dns
        axios.delete('http://'+ dns +'/api/commentDelete/'+cId, {
            params: {
              id: this.id
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

    next (page) {
      var dns = this.$store.state.dns
      axios.get('http://'+ dns +'/api/commentList/'+page, {
        params: {
              id: this.id
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
      var dns = this.$store.state.dns
      return new Promise((resolve, reject) => {
      axios.get('http://'+ dns +'/api/commentList', {
        params: {
            id:this.id
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