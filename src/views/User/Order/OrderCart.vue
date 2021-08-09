<template>
  <v-container fluid>
    <v-divider></v-divider>
    <v-row no-gutters>
     <v-col sm="3" ></v-col>
      <v-col sm="6" >
        <h4 style="text-align:left;">장바구니</h4> 
        <v-card
          class="pa-2"
          outlined
          tile>
        <v-simple-table>
          <template v-slot:default>
            <thead>
                <tr>
                    <th>
                      <v-checkbox
                        v-model="selected"
                      ></v-checkbox>
                    </th>
                    <th style="text-align:center; font-size:0.9rem;">상품명</th>
                    <th style="text-align:center; font-size:0.9rem;">수량</th>
                    <th style="text-align:center; font-size:0.9rem;">가격</th>
                    <th style="text-align:center; font-size:0.9rem;">합계</th>
                </tr>
            </thead>
            <tbody>
              <tr v-for="item in List"
              :key="item.id"
              class="mr-10 mb-10"
              >
                <td><v-checkbox v-model="selected"></v-checkbox></td>
                <td><v-img :src="image(item.image)" style="margin-top:2%; width:100px;" ></v-img></td>
                <td>{{item.amount}}개</td>
                <td>{{priceToString(item.price)}}원</td>
                <td>{{total(item.amount)}}원</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        </v-card>
      </v-col>
     <v-col sm="3" >
     </v-col>
    </v-row>
    <v-row>
      <v-col sm="3" ></v-col>
      <v-col sm="6" >
      </v-col>
      <v-col sm="3" ></v-col>
    </v-row>
    <v-row>
        <v-col sm="3" ></v-col>
        <v-col sm="6" >
            <v-btn color="primary" router :to="{name: 'OrderList'}">주문하기</v-btn>
            <v-btn router :to="{name: 'Main'}">쇼핑 계속하기</v-btn>
            <v-btn color="error" @click="CartOut()">장바구니 비우기</v-btn>
        </v-col>
        <v-col sm="3" ></v-col>
    </v-row>
  </v-container> 
</template>
 
<script>
import { mapActions, mapState } from "vuex"
export default {
  data() {
      return {
        selected: [''],
        List: this.$store.state.cartList,
      }
  },

  methods:{
    ...mapActions(["CartOut"]),

    image(image){
    //경로를 조합해줄 메서드.
    if(image == null){
        return require('@/images/null.jpg');
    }
    return require('@/images/'+ image +'.jpg');
    },
    priceToString(price) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    total(amount){
        return (amount * this.$store.state.cartList[0].price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

  },

}
</script>
