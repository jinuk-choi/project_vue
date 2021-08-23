<template>
    <div>
        <v-container>
            <v-row justify="center">
                <v-card>
                    <v-card-title>
                        <span class="headline">결제 완료</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <p>결제금액:{{info.amount}}</p>
                            </v-row>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios'
import Route from '@/router/index'

export default {
  data() {
    return {
      codes:"" ,
      info:{}
      
    }
  },
  created() {
    this.create()
  },
  
  methods: {
    create() {
        this.codes = this.$route.query.pg_token;
        this.id = this.$route.query.id
        console.log(this.codes)
        console.log(this.id)
        this.kakaoPaySuccess();
    },
    kakaoPaySuccess() {
        var dns = this.$store.state.dns
        return new Promise((resolve, reject) => {
            axios.get('http://'+ dns +'/kakaoPaySuccess?id=' + this.id + '&pg_token=' + this.codes)
            .then(Response => {
                this.info = Response.data
                console.log(Response.data)
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