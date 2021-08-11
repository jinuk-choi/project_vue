<template>
  <div class="home">
  <!-- 제품 사진 및 구매 -->
    <v-divider></v-divider>
    <v-row style="margin-top:50px;">
      <v-col
        cols="6"
        lg="6"
        sm="6"
        md="6"
      >
        <img :src="image($store.state.product[0].image)" style="margin-left:30%; width:400px;" >
      </v-col>
      <v-col
        cols="8"
        lg="6"
        sm="6"
        md="6"
      >
        <v-card style ="width:320px; height:330px; padding-left:30px; padding-top:25px">
          <v-row>
            <v-simple-table style="width:300px;">
              <tr>
                <td class="text-left">제품명 :</td>
                <td>{{$store.state.product[0].name}}</td>
              </tr>
              <tr>
                <td class="text-left">제품가격 :</td>
                <td class="pa-3">{{priceToString($store.state.product[0].price)}}원</td>
              </tr>
              <tr>
                <td class="text-left">제품수량 :</td>
                <td v-if="this.$store.state.product[0].quantity ==0"> 
                  <img :src="image('soldout')" style="margin-right:10%; width:100px;" >
                </td>
                <td class="pl-2" v-else>
                  <a style='width:30px; height:30px; background-color:rgb(180, 180, 180); color:black' href="#" @click="change(-1)">-</a>
                    <input style='width:30px; height:30px; background-color:white; border:1px solid black; text-align:center;' type='text' value='1' v-model="amount" readonly> 
                  <a style='width:30px; height:30px; background-color:rgb(180, 180, 180); color:black;' href="#" @click="change(1)">+</a>
                </td>
              </tr>
              <tr style="height:30px;">
                <td></td><td></td></tr>
            </v-simple-table>
          </v-row>
            <div class="total" style="height: 50px; width:260px;">
              <div style="height: 50px; width:260px; ">
                <div style="height: 50px;">총 주문 금액 :</div>
                <div style="height: 50px; padding-left:10px">{{total(this.amount)}}원</div>
              </div>
          </div>
          <v-row v-if="this.$store.state.product[0].quantity ==0">
          </v-row>
          <v-row v-else align="center" justify="space-around">
            <v-btn max-width="5" color="primary"  class="mt-6"  router :to="{name:'OrderForm', params:{amount: amount,id}}">구매하기</v-btn>                                                                       
            <v-btn max-width="5" class="mt-6" @click="OrderCart({id,amount,price:$store.state.product[0].price,image:$store.state.product[0].image})">장바구니</v-btn>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

<!-- 구매 후기 -->
    <v-divider></v-divider>
    <v-row style="margin-top:50px; margin-bottom:50px;">
      <h2 style="margin-right:50%; margin-bottom:50px;">사용후기</h2>
        <CommentWrite :id="id"></CommentWrite>
    </v-row>
    <v-divider></v-divider>
    <v-row style="margin-top:50px; margin-bottom:50px;">
      <CommentList :id="id"></CommentList>
    </v-row>

  <!-- 유의 사항 -->  
    <v-divider></v-divider>
    
    <v-row style="margin-top:50px; margin-right:60%; margin-bottom:1%">
      <li>구매시 주의사항</li>
    </v-row>
    <v-row style="margin-right:57%; margin-bottom:1%">
      <li>환불 및 교환 관련 규정</li>
    </v-row>
    <v-row style="margin-right:54%; margin-bottom:5%">
      <li>세탁방법 및 취급시 주의사항</li>
    </v-row>
  </div>
</template>

<script>
import CommentList from '@/views/User/Comment/CommentList.vue'
import CommentWrite from '@/views/User/Comment/CommentWrite.vue'
import {mapActions} from "vuex"
  export default {
    components: {
      CommentList,
      CommentWrite
    },
    created(){
        this.$store.dispatch('Product')
    },
    data () {
      return {     
        id: Number(this.$route.params.id), 
        name: this.$store.state.product[0].name,
        price: this.$store.state.product[0].price,
        quantity: this.$store.state.product[0].quantity,
        amount:1,
        num:1,
      }
    },
    methods:{
      ...mapActions(["OrderCart"]),

      priceToString(price) {
              return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      },
      change(num){
            this.amount += num;
            if(this.amount < 1) {
                alert("더 이상 줄일 수 없습니다.");
                this.amount = 1;
            }   
      },
      image(image){
        //경로를 조합해줄 메서드.
        if(image == null){
          return require('@/images/null.jpg');
        }
        return require('@/images/'+ image +'.jpg');
      },
      total(amount){
          return (amount * this.$store.state.product[0].price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
    },
  }
</script>

<style scoped>
.home{
  width:100%; 
}
.v-data-table > .v-data-table__wrapper > table {
  width:90%!important;
}
.total > div{    
  background-color: white;
  border:1px gray solid;
  height:50px!important;
  display:flex;
  justify-content: center;
  line-height: 50px;
}
a { 
  display: inline-block; 
}
.v-application a {
  color:black;
}
.row {
  font-size:20px;
  font-weight: 500;       
  color:rgb(0, 0, 0)!important;   
}
table tr td {
  font-size:20px;
  font-weight: 500;       
  color:rgb(0, 0, 0);
}
.theme--light.v-data-table {
  background-color: transparent;
}
</style>