<template>
    <h2>환영합니다</h2>   
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
      this.create();
  },

  methods: {
    create() {
        this.codes = this.$route.query.code;
        this.klogin();
    },
    


    klogin() {
        var dns = this.$store.state.dns
        return new Promise((resolve, reject) => {
            axios.post('http://'+ dns +'/klogin?authorize_code=' + this.codes)
                .then(Response => {
                    console.log(Response.data)
                    Route.push("/Main")
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
