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
              <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
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
        </v-col>
        <v-col sm="3" ></v-col>
    </v-row>
  </v-container> 
</template>
 
<script>
export default {


  data() {
      return {
          selected: [''],
      }
  },

  methods:{
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
        return (amount * this.$store.state.product[0].price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

  },

}
</script>
