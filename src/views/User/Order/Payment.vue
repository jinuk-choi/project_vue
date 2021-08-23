<template>
    <div>
        <v-container>
            <v-row justify="center">
                <v-card>
                    <v-card-title>
                        <span class="headline">결제 정보 입력</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                            </v-row>
                        </v-container>
                    <small>결제는 카카오페이로 진행됩니다</small>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" @click="pay({id:id})">결제</v-btn>
                    <v-btn color="blue darken-1" router :to="{name: 'Main'}">취소</v-btn>
                    </v-card-actions>
                </v-card>
            </v-row>
            <v-row><p/></v-row>
            <v-row>
              <v-card>
               
              </v-card>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios'
import Route from '@/router/index'
export default {
    name: 'Params',
    props: {
      id: {
          type: Number,
          default : 0 
      }
    },
    data() {
        return {
            name: this.$store.state.Userinfo.User_Name
        }
    },
    methods:{
        pay(payload) {
            var dns = this.$store.state.dns
            console.log(payload)
            return new Promise((resolve, reject) => {
                axios.post('http://'+ dns +'/kakaoPay',payload)
                .then(Response => {
                    window.open(Response.data);
                    Route.push("/")
                        
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