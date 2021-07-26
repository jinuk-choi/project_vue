<template>
    <v-flex xs12 >
        <v-form style="width:500px;margin:0 auto;">
        <v-rating class="text-left"
            v-model="rating"
            background-color="orange lighten-3"
            color="orange"
            large
        ></v-rating>
            <v-textarea class="ml-2"
                v-model="bContent"
                rows="1"
                label="입력해주세요"
                type="text"
            ></v-textarea>
            <v-col class="text-right"> 
                <v-btn color="primary" @click="CommentWrite({bContent})">사용후기쓰기</v-btn>
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
      aIdx: Number 
    },

    data() {
        return {
            bContent: null,
            rating: 4,
        }
    },
    
    computed: {
        ...mapState(["Userinfo"]),
        ...mapState(["board_detail"])
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

    }
    
}
</script>