<template>
    <div>
        <v-container>
            <v-row justify="center">
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark v-on="on">결제하기</v-btn>
                </template>
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
                    <v-btn color="blue darken-1" @click="pay()">결제</v-btn>
                    <v-btn color="blue darken-1">취소</v-btn>
                    </v-card-actions>
                </v-card>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios'
import Route from '@/router/index'

export default {
    methods:{
        pay() {
            var dns = this.$store.state.dns
            return new Promise((resolve, reject) => {
                axios.post('http://'+ dns +'/kakaoPay')
                .then(Response => {
                    window.open(Response.data);
                        
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