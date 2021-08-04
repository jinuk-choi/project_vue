<template>
    <v-flex xs12 >
        <v-form style="width:800px;margin:0 auto;">
            <v-text-field
                v-model="uName"
                label="작성자"
                readonly
            ></v-text-field>
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
    created() {
       console.log( this.$store.state.Userinfo)
    },
    data() {
        return {
            uName: this.$store.state.Userinfo.User_Name,
            aTitle: null,
            aContent: null,
           
        }
    },
    computed: {
        ...mapState(["Userinfo"])
    },
    methods: {
        boardWrite(payload) {
          var dns = this.$store.state.dns
          payload.uId = this.Userinfo.User_Id
          return new Promise((resolve, reject) => {
            axios.post('http://'+ dns +'/api/boardWrite', payload)
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