<template>
  <div class="about">
   <h2 class="pt-2">회원정보</h2>
     <v-data-table
      class="elevation-1"
       :headers="userlist_headers"
       :items="userlist"
     >
        <template v-slot:item="row">
         <tr>     
            <td>
              <span v-if="temp == row.item.username">
                <input :style="{width:'82px'}" v-model="new_username">
              </span>
              <span v-else>{{row.item.username}}</span>
            </td>
            <td>
              <span v-if="temp == row.item.username">
                <input :style="{width:'350px'}" v-model="password">
              </span>
              <span v-else>{{row.item.password}}</span>
            </td>
            <td style="width:100px;">
              <span v-if="temp == row.item.username">
                <input :style="{width:'69px'}" v-model="name">
              </span>
              <span v-else>{{row.item.name}}</span>
            </td>
            <td style="width:130px;">
              <span v-if="temp == row.item.username">
                <input :style="{width:'104px'}" v-model="address">
              </span>
              <span v-else>{{row.item.address}}</span>
            </td>
            <td style="width:130px;">
              <span v-if="temp == row.item.username">
                <input :style="{width:'107px'}" v-model="phone">
              </span>
              <span v-else>{{row.item.phone}}</span>
            </td>
            <td>
              <span v-if="temp == row.item.username">
                <input :style="{width:'131px'}" v-model="email">
              </span>
              <span v-else>{{row.item.email}}</span>
            </td>
            <td>
              <span v-if="temp != row.item.username">
              <v-card-actions class="justify-start">  
                <v-btn dark small color="grey" @click="Update(row.item)">수정</v-btn>
                <v-btn dark small color="grey" @click="UserDelete(row.item)">탈퇴</v-btn>
              </v-card-actions>
              </span>
              <span v-else>
                <v-card-actions class="justify-start">  
                <v-btn dark small color="grey" 
                   @click="[UserUpdate({new_username, temp, password, name, address, phone, email, point}),reload()]">수정완료</v-btn>
                <v-btn dark small color="grey" @click="Update_cancle()">취소</v-btn>
              </v-card-actions>
              </span>
            </td>
          </tr>
        </template>
     </v-data-table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
  export default {
    created(){
      this.$store.dispatch('UserList')
      this.$store.state.temp
    },
    data () {
      return {     
        temp: this.$store.state.temp,
        new_username: '',
        password: '',
        name:'',
        address:'',
        phone:'',
        email:'',
      }
    },
    computed: {
      ...mapState(["userlist","userlist_headers"]),
    },
    methods:{
        ...mapActions(["UserDelete"]),
        ...mapActions(["UserUpdate"]),
        Update(userinfo) {
          var login_flag = this.$store.state.login_flag
          if(login_flag == true){
            // 일반적인 로그인때와 새로고침시 변수를 다르게 선언하였다.
            var login_auth = this.$store.state.Userinfo.User_auth[0]
            var refresh_auth = this.$store.state.Userinfo.User_auth[0]

            if (login_auth == 'ROLE_ADMIN' || refresh_auth == 'ROLE_ADMIN'){
                  this.$store.state.temp=userinfo.username
                  this.temp=userinfo.username
                  this.new_username = userinfo.username
                  this.password = userinfo.password
                  this.name = userinfo.name
                  this.address = userinfo.address
                  this.phone = userinfo.phone
                  this.email = userinfo.email
              }else{
                alert('권한이 없습니다.')
              }
          }else{
            alert('권한이 없습니다.')
          }
        },
        Update_cancle: function(){
        this.temp=0  
        this.$store.state.temp = 12345678911
        },
        reload() {
          window.location.reload()
        }
    },
  }
</script>