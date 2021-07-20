<template>
    <v-flex xs12 >
        <v-form style="width:800px;margin:0 auto;">
            <span>작성자: {{ Userinfo.User_Name }}</span>
            <v-text-field
                v-model="aTitle"
                label="제목"
                type="text"
               
            ></v-text-field>
            <v-textarea
                v-model="aContent"
                rows="6"
                label="내용"
                type="text"
            ></v-textarea>
        </v-form>
        <v-btn @click="boardWrite({aTitle,aContent,aGroup,aOrder,aDepth})">등록</v-btn>
    </v-flex>
</template>
<script>
import { mapState,mapActions } from 'vuex'
import axios from 'axios'
import Route from '@/router/index'
export default {
    name: 'Params',
        props: {
            aDepth: {
                type: Number,
                default : 0
            },
            aOrder: {
                type: Number,
                default : 0
            },
            aGroup: {
                type: Number,
                default : 0
            }
        },

    data() {
        return {
            aTitle: null,
            aContent: null,
           
        }
    },
    computed: {
        ...mapState(["Userinfo"])
    },
    methods: {
        boardWrite(payload) {
          payload.uIdx = this.Userinfo.User_Idx
          return new Promise((resolve, reject) => {
            axios.post('http://localhost:9100/api/test/boardWrite', payload)
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