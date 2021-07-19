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
        <span style="padding-left:0px; padding-right:12px;" v-else>
          <v-btn class="ml-8" @click="LogOut()">로그아웃</v-btn>
        </span>
        <span style="padding-left:0px; padding-right:12px;" v-if="this.$store.state.login_flag == 0">
           <v-btn  router :to="{name: 'Join'}">회원가입</v-btn>
        </span>
      </v-layout>

      <v-layout>
        <v-spacer/>
        <router-link to='/' style="color:#263238; text-decoration:none">  
          <v-toolbar-title style="font-size:30px; font-weight:750;">ShoppingMall</v-toolbar-title>     
        </router-link>
        <v-spacer/>
      </v-layout>

      <v-layout>
        <v-tabs
            centered
            class="mt-9"
            color="blue darken-1"
          >
            <!-- 홈탭 -->
            <v-tab style="width:140px;" @click="category('Home')">Home</v-tab>

            <!-- TOP 탭 -->
            <v-menu
              open-on-hover
              bottom
              offset-y
            >
            <template v-slot:activator="{ on, attrs }">
              <v-tab  v-bind="attrs"
                      v-on="on"
                      @click="category('Top')"
                      style="width:140px;">TOP                  
              </v-tab>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in TOP"
                :key="index"
                @click="move()"
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
            <v-menu
              open-on-hover
              bottom
              offset-y
            >
            <template v-slot:activator="{ on, attrs }">
              <v-tab    v-bind="attrs"
                        v-on="on"
                        style="width:140px;">상품 문의
              </v-tab>
            </template>
            <!-- <v-list>
              <v-list-item
                v-for="(item, index) in Dining"
                :key="index"
                router :to="{name: item.name}"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list> -->
            </v-menu>

            <v-tab style="background-color:lightgrey; color:black; width:140px;" router :to="{name: 'Admin'}">관리자 페이지</v-tab>
        </v-tabs>
       </v-layout>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container>
  
      <v-row style="text-align:center">

        <!-- 원래코드
         <Main v-if="$route.name == 'Home'"></Main>
         <router-view/>
         -->

        <Main v-if="'Home' == this.Tab"></Main>
        <Top v-if="'Top' == this.Tab"></Top>
        <Pants v-if="'Pants' == this.Tab"></Pants> 
         <router-view/>

        <!-- 
        <Main v-if="'Home' == this.Tab"></Main>
        <Living v-if="'Living' == this.Tab"></Living>
        <Materials v-if="'Materials' == this.Tab"></Materials> 
        -->

        <!-- <Main v-if="this.Tab == 'Home'"></Main>
        <Living v-if="this.Tab == 'Living'"></Living> -->
        <!-- <router-view :key="$route.fullPath"/> -->
      </v-row>

      </v-container>
    </v-main>
  </v-app>
</template>

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

<script>
// @ is an alias to /src
import { mapActions } from "vuex"
import Main from '../views/User/Main.vue'
import Top from './User/Tab/Top.vue'
import Pants from './User/Tab/Pants.vue'

export default {
  created(){
      this.$store.state.login_prev = 1;
    },
  name: 'Home',
  components: {
    Main, Top, Pants
  },
   data: () => ({ 
      Tab: 'Home',
      TOP: [
        { title: '반팔', name:'Product'},
        { title: '긴팔', name:'Product'},
      ],
      PANTS: [
        { title: '반바지', name:'Product'},
        { title: '긴바지', name:'Product'},
      ],
  
    }),
  methods:{
    ...mapActions(["LogOut"]),
    category(text){
      this.Tab = text;
    },
    move(){
      window.scrollTo(0,500);
    }
  },
}
</script>