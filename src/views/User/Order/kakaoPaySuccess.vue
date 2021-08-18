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
      codes:"" 
    }
  },
  created() {
    this.create()
  },
  
  methods: {
    create() {
        this.codes = this.$route.query.pg_token;
        console.log(this.codes)
        this.kakaoPaySuccess();
    },
    kakaoPaySuccess() {
        var dns = this.$store.state.dns
        return new Promise((resolve, reject) => {
            axios.get('http://'+ dns +'/kakaoPaySuccess?pg_token=' + this.codes)
            .then(Response => {
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