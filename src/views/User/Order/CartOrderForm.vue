<template>
  <v-container fluid>
    <v-divider></v-divider>
    <v-row no-gutters>
     <v-col sm="3" ></v-col>
      <v-col sm="6" >
        <h4 style="text-align:left;">주문서 작성</h4> 
        <v-card
          class="pa-2"
          outlined
          tile>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th style="text-align:center; font-size:0.9rem;">상품명</th>
                <th style="text-align:center; font-size:0.9rem;">총수량</th>
                <th style="text-align:center; font-size:0.9rem;">가격</th>
                <th style="text-align:center; font-size:0.9rem;">합계</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in List"
              :key="item.p_id"
              class="mr-10 mb-10"
              >
                <td><v-img :src="image(item.image)" style="margin-top:2%; width:100px;" ></v-img></td>
                <td>{{item.count}}개</td>
                <td>{{priceToString(item.price)}}원</td>
                <td>{{total({amount:item.count, price:item.price})}}원</td>
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
        <h4 style="text-align:left; margin-bottom:20px;">
            주문하시는 분 
        </h4>
        <v-card
        class="pa-2"
        outlined
        tile>
          <div style="width:300px; display: inline-block; margin-right:500px; text-align:left;">
            <p style="text-align:left;">
            <label style="margin-bottom:0px; text-align:left;">
                이름
            </label>
            <input required style="border: 0.5px solid; width:300px; height: 45px;" v-model="name">
            </p>

            <p style="text-align:left;">
            <label style="margin-bottom:0px; text-align:left;">
                주소
            </label>
            <input required style="border: 0.5px solid; width:600px; height: 45px;" v-model="address">
            </p>

            <p style="text-align:left;">
            <label style="margin-bottom:0px; text-align:left;">
                전화번호
            </label>
            <input required style="border: 0.5px solid; width:300px; height: 45px;" v-model="phone">
            </p>

            <p style="text-align:left;">
            <label style="margin-bottom:0px; text-align:left;">
                이메일
            </label>
            <input required style="border: 0.5px solid; width:300px; height: 45px;" v-model="email">
            </p>
          </div>
        </v-card>
      </v-col>
      <v-col sm="3" ></v-col>
    </v-row>
    <v-row>
        <v-col sm="3" ></v-col>
        <v-col sm="6" >
            <v-btn color="primary" @click="Order({user_id,name, address, phone, email, total_price, state, orderdetail:List})">주문하기</v-btn>
            <v-btn router :to="{name: 'Main'}">취소하기</v-btn>
        </v-col>
        <v-col sm="3" ></v-col>
    </v-row>
  </v-container> 
</template>
 
<script>
import axios from 'axios'
import Route from '@/router/index'
export default {

  data() {
      return {
        List: this.$store.state.orderCartList,
        name: this.$store.state.Userinfo.User_Name,
        address: this.$store.state.Userinfo.User_address,
        phone: this.$store.state.Userinfo.User_phone,
        email: this.$store.state.Userinfo.User_email,
        user_id: this.$store.state.Userinfo.User_Id,
        total_price: 0,
        state: "결제전"
      }
  },
  computed: {
    sum () {
      this.List.forEach ((item, i) => {
        this.total_price += (item.price * item.count)
      });
      return this.total_price;
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
                Route.push("/")
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
