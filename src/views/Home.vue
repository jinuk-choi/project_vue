<template>
  <v-app id="inspire">
    <v-app-bar
      app
      height="180"
    >
    <v-container fluid ma-0 pa-0>
      <v-layout class="mt-3">
        <span style="padding-left:0px; padding-right:12px;" v-if="this.$store.state.login_flag == 0">
          <v-btn class="ml-8" router :to="{name: 'Login'}">로그인</v-btn>
        </span>
        <span style="padding-left:0px; padding-right:12px; " v-else>
          <v-btn class="ml-8" @click="LogOut()">로그아웃</v-btn>
        </span>
        <span style="padding-left:0px; padding-right:12px;" v-if="this.$store.state.login_flag == 0">
           <v-btn  router :to="{name: 'Join'}">회원가입</v-btn>
        </span>
      </v-layout>
      <v-layout>
        <v-spacer/>
        <router-link to='/Main' style="color:#263238; text-decoration:none">  
          <v-toolbar-title style="font-size:30px; font-weight:750;">YOSINSA</v-toolbar-title>     
        </router-link>
        <v-spacer/>
      </v-layout>
      <v-layout>
        <span style="padding-left:30px;" v-show="this.$store.state.login_flag == 1">
          {{Userinfo.User_Name}}님 환영합니다. &nbsp;
          <router-link to='/OrderList'  style="color:#263238; text-decoration:none"> 
            <span>
              주문내역
            </span>&nbsp;
          </router-link>
          <router-link to='/OrderCart'  style="color:#263238; text-decoration:none"> 
            <span class="text-decoration-none">
              장바구니
            </span>
          </router-link>
        </span>
      </v-layout>
      <v-layout>
        <v-tabs
            centered
            class="mt-9"
            color="blue darken-1"
          >
            <!-- 홈탭 -->
            <v-tab style="width:140px;" router :to="{name: 'Main'}">Main</v-tab>

            <!-- TOP 탭 -->
            <v-menu
              open-on-hover
              bottom
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-tab  v-bind="attrs"
                        v-on="on"
                        router :to="{name: 'Top'}"
                        style="width:140px;">TOP                  
                </v-tab>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in TOP"
                  :key="index"
                  router :to="{name: item.name}"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <!-- PANTS 탭 -->
            <v-menu
              open-on-hover
              bottom
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-tab    v-bind="attrs"
                          v-on="on"
                          router :to="{name: 'Pants'}"
                          style="width:140px;">PANTS
                </v-tab>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in PANTS"
                  :key="index"
                  router :to="{name: item.name}"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <!-- 상품 문의 -->
            <v-tab style=" color:grey; width:140px;" router :to="{name: 'BoardList'}">Q&A</v-tab>

            <!-- 관리자 페이지 -->
            <v-tab v-if="this.$store.state.login_flag == 1"
              style="background-color:lightgrey; color:black; width:140px;" router :to="{name: 'Admin'}">관리자 페이지
            </v-tab>
        </v-tabs>
       </v-layout>
      </v-container>
    </v-app-bar>

  <!-- Main -->
    <v-main>
      <v-container>
        <v-row style="text-align:center">
          <router-view/> 
        </v-row>
      </v-container>
    </v-main>

<!-- 사용자 정보 -->
      <v-footer
        color="white"
        app
      >
        <hr width = "100%" color = "gray" style="margin: auto;">
        <p class="size18" style="margin-bottom:0px; margin-top:10px; margin-left:100px; font-weight:560;">
          <span>대표이사: 김철수</span>
          <br/>
          <span>사업자 등록번호: 000-00-00000</span>
        </p>
        <p class="size18" style="margin-bottom:0px; margin-top:10px; margin-left:300px; font-weight:560;">
          <span>주소: 대구광역시 북구</span>
          <br/>
          <span>E-Mail: abc@abc.com</span>
        </p>
        <p class="size18" style="margin-bottom:0px; margin-top:10px; margin-left:500px; font-weight:560;">
          <span>전화번호: 000-000-0000</span>
          <br/>
          <span>FAX: 000-000-0000</span> 
        </p>
      </v-footer>
  </v-app>
</template>

<script>
import { mapActions,mapState } from "vuex"

export default {
  created(){
      this.$store.state.login_prev = 1;
    },
  computed: {
      ...mapState(["Userinfo"]),
      ...mapState(["point"])

  },

  data: () => ({ 
    TOP: [
      { title: '반팔', name:'ShortTop'},
      { title: '긴팔', name:'LongTop'},
    ],
    PANTS: [
      { title: '반바지', name:'ShortPants'},
      { title: '긴바지', name:'LongPants'},
    ],
  }),

  methods:{
    ...mapActions(["LogOut"])
  }
}
</script>

<style scoped>
::v-deep .v-toolbar__content {
  padding: 0px !important;
}

@media(min-width: 0px) {
  .container, .container-lg, .container-md, .container-sm, .container-xl {
    max-width: 100%;
  }
}

.text{
  color:grey
}
</style>