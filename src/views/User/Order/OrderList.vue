<template>
  <v-container fluid>
    <v-divider></v-divider>
    <v-row no-gutters>
     <v-col sm="3" ></v-col>
      <v-col sm="6" >
        <h4 style="text-align:left;">주문내역</h4> 
        <v-card
          class="pa-2"
          outlined
          tile>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th style="text-align:center; font-size:0.9rem;">주문날짜</th>
                <th style="text-align:center; font-size:0.9rem;">상품명</th>
                <th style="text-align:center; font-size:0.9rem;">총수량</th>
                <th style="text-align:center; font-size:0.9rem;">가격</th>
                <th style="text-align:center; font-size:0.9rem;">합계</th>
                
              </tr>
            </thead>
            <tbody>
              <template>
                <tr v-for="item in List"
                :key="item.id"
                class="mr-10 mb-10"
                >
                  <td>{{item.date}}</td>
                  
                  <td v-for="order in item.orderdetail"
                  :key="order.p_id">
                  <v-img :src="image(order.image)" style="margin-top:2%; width:100px;" ></v-img></td>
                  <td v-for="order in item.orderdetail"
                  :key="order.p_id">
                    {{order.count}}개</td>
                    <td v-for="order in item.orderdetail"
                  :key="order.p_id">
                    {{priceToString(order.price)}}원</td>

                    <td v-for="order in item.orderdetail"
                  :key="order.p_id">{{total({amount: order.count, price: order.price})}}원</td>
                 
                    
            
                  
                </tr>
              </template>
            </tbody>
          </template>
        </v-simple-table>
        </v-card>
      </v-col>
     <v-col sm="3" >
     </v-col>
    </v-row>
  </v-container> 
</template>
 
<script>
import axios from 'axios'
export default {
  created(){
      this.$store.dispatch('OrderListDetail')
    },

  data() {
      return {
        List: this.$store.state.orderDetailListX
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
    total({amount,price}){
        return (amount * price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },

    Order(payload) {
      var dns = this.$store.state.dns
      return new Promise((resolve, reject) => {
        axios.post('http://'+ dns +'/api/Order', payload)
          .then(Response => {
              console.log(Response.data)
                //Route.push("/boardlist")
          })
          .catch(Error => {
              console.log('error')
              reject(Error)
          })
      })
    },

  },

}
</script>
