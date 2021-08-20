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
            <tbody>
              <template v-for="item in List"> 
                <tr :key="item.id">
                  <td style="text-align:left;" class="font-italic">주문날짜 : {{item.date}}</td>
                  <td class="font-italic">결제상태 :{{item.state}}</td>
                  <td class="font-italic" style="text-align:right;">카카오페이로 결제하기 :</td>
                  <td>
                    <router-link :to="{name: 'Payment', params: {id: item.id}}" style="color:#263238; text-decoration:none">
                      <img :src="image('kakao_pay')" style="margin-right:30%;">
                    </router-link> 
                  </td>
                </tr>
                  <tr v-for="order in item.orderdetail"
                  :key="order.od_id">
                    <td style="text-align:left;">상품명: {{order.product}}</td>
                    <td>수량: {{order.count}}개</td>
                    <td>가격: {{priceToString(order.price)}}원</td>
                    <td>합계: {{total({amount: order.count, price: order.price})}}원</td>
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
