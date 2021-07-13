<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-card
      class="mx-auto"
      max-width="300"
      tile
      >
       <v-subheader>목록</v-subheader>
        <v-list dense>
          <v-menu
            open-on-hover
            top
            offset-x
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                block
                depressed
                color="blue lighten-4"             
                v-bind="attrs"
                v-on="on"
              >
                회원관리
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in item1"
                :key="index"
                 router :to="{name: item.name}"
              >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
            </v-list>
          </v-menu>
        </v-list>

        <v-list dense>
          <v-menu
            open-on-hover
            top
            offset-x
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                block
                depressed
                color="blue lighten-4"
                v-bind="attrs"
                v-on="on"
              >
                쇼핑몰관리
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in item2"
                :key="index"
                router :to="{name: item.name}"
              >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
            </v-list>
          </v-menu>
        </v-list>

        <v-list dense>
          <v-menu
            open-on-hover
            top
            offset-x
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                block
                depressed
                color="blue lighten-4"
                v-bind="attrs"
                v-on="on"
              >
                쇼핑몰현황
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in item3"
                :key="index"
                 router :to="{name: item.name}" 
              >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
            </v-list>
          </v-menu>
        </v-list>
    </v-card>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>ADMINISTRATOR</v-toolbar-title>
      <v-btn right>로그아웃</v-btn>
    </v-app-bar>

    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <router-view/>
      </v-container>
      <router-view :key="$route.fullPath"/>
    </v-main>
    <v-footer
      color="primary"
      app
    >
      <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>
<script>
import { mapActions } from "vuex"

export default {
  name: 'Admin',

  data: () => ({
    drawer: true,
    selectedItem: 1,
      item1: [
        { title: '회원정보', name: 'UserList' },
        { title: '포인트관리', name: 'Point'},
      ],
      item2: [
        { title: '주문내역', name: 'Order'},
        { title: '분류관리', name: 'Category'},
        { title: '상품관리', name: 'Product'},
      ],
      item3: [
        { title: '판매순위', name: 'Ranking'},
        { title: '매출통계', name: 'Sales'},
      ],
  }),
  
  methods:{
    ...mapActions(["LogOut"]),
  },
}
</script>

<style scoped>
.text{
  color:rgb(0, 0, 0);
}
.card_text{
  font-size:19px;
  color:rgb(218, 213, 213);
}
.v-application .display-1 {
    font-size: 30px!important;
    font-weight: 400;
    line-height: 2.5rem;
    letter-spacing: 0.0073529412em !important;
    font-family: "Roboto", sans-serif !important;
}
.v-card__subtitle, .v-card__text {
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5rem;
    letter-spacing: 0.0071428571em;
}
</style>
