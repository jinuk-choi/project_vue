<template>
    <v-flex xs12 >
        <v-form style="width:500px;margin:0 auto;">
        <v-rating class="text-left"
            v-model="cRating"
            background-color="orange lighten-3"
            color="orange"
            large
        ></v-rating>
            <v-textarea class="ml-2"
                v-model="cContent"
                rows="1"
                label="입력해주세요"
                type="text"
            ></v-textarea>
            <v-col class="text-right"> 
                <v-btn color="primary" @click="CommentWrite({cContent})">사용후기쓰기</v-btn>
            </v-col>
        </v-form>       
    </v-flex>
</template>
<script>
import { mapState,mapActions } from 'vuex'
import axios from 'axios'
import Route from '@/router/index'
export default {
    props: {
      id: Number 
    },

    data() {
        return {
            cContent: null,
            cRating: 4,
        }
    },
    
    computed: {
        ...mapState(["Userinfo"]),
    },
    methods: {
        CommentWrite(payload) {
          var dns = this.$store.state.dns
          payload.uId = this.Userinfo.User_Id
          payload.id = this.id
          payload.cRating = this.cRating
          return new Promise((resolve, reject) => {
            axios.post('http://'+ dns +'/api/commentWrite/', payload, {
              params: {
                id: this.id
              } 
            })
                .then(Response => {
                  console.log(Response.data)
                  this.pagination = Response.data
                  this.List = this.pagination.list  
                  Route.go(Route.currentRoute);
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