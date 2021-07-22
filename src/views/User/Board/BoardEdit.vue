<template>
    <v-flex xs12 >
        <v-form style="width:800px;margin:0 auto;">
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
        <v-btn @click="boardEdit({aTitle,aContent})">등록</v-btn>
    </v-flex>
</template>
<script>
import { mapState,mapActions } from 'vuex'
import axios from 'axios'
import Route from '@/router/index'
export default {
    data() {
        return {
            aTitle: null,
            aContent: null,
           
        }
    },
    computed: {
        ...mapState(["board_detail"])
    },
    methods: {
        boardEdit(payload) {
          payload.aIdx = this.board_detail.aIdx
          return new Promise((resolve, reject) => {
            axios.post('http://localhost:9100/api/boardEdit', payload)
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