<template>
  <div class="about">
   <h2 class="pt-2">상품등록</h2>
    <table class="table">
      <tbody>
        <tr>     
          <th>상품코드</th>
          <td><input style="height:100%; width:100%;" v-model="id"></td>
        </tr>
        <tr>
          <th>상품명</th>
          <td><input style="height:100%; width:100%;" v-model="name"></td>
        </tr>
        <tr>
          <th>상품설명</th>
          <td><input style="height:100%; width:100%;" v-model="text"></td>
        </tr>
        <tr>
          <th>가격</th>
          <td><input style="height:100%; width:100%;" v-model="price"></td>
        </tr>
        <tr>
          <th>분류코드</th>
          <td><input style="height:100%; width:100%;" v-model="category"></td>
        </tr>
        <tr>
          <th>재고</th>
          <td><input style="height:100%; width:100%;" v-model="quantity"></td>
        </tr>
        <tr>
          <th>이미지 업로드</th> 
          <td>
            <v-file-input id="file" ref="file" v-model="fileinput"></v-file-input>
          </td>
        </tr>
    </tbody>
  </table>
    <v-row justify="space-between">
      <v-col cols="auto">
        <v-btn width="100px" class="mr-5 ml-10" @click="ProductCreate({id, name, price, category, quantity, text, fileinput})"> 등록</v-btn>
      </v-col>
        <v-col cols="auto">
          <v-btn width="100px" router :to="{name:'Product'}">취소</v-btn>
        </v-col> 
    </v-row>
  </div>
</template>

<script>
import { mapActions } from "vuex"
  export default {
    created(){
      this.$store.dispatch('ProductList')
    },
    data () {
      return {     
        id:'', 
        name: '',
        price: '',
        category:'',
        quantity:'',
        text:'',
        file: [],
        fileinput:null
      }
    },
    methods:{
      ...mapActions(["ProductCreate"]),
      priceToString(price) {
         return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      },
      image(image){
        //경로를 조합해줄 메서드.
        return require('@/images/'+ image +'jpg');
      },
    }
  }
  </script>
  <style scoped>
@media (min-width: 1200px) {
  .container {
    max-width:100%;
  }
}
th{
  width:200px;
  height:100px;
  border: 0.5px solid;
  border-color: rgb(200, 200, 200);
}
td{
  border: 0.5px solid;
  height:100px;
  border-color: rgb(200, 200, 200);
}
.container, .container-fluid, .container-lg, .container-md, .container-sm, .container-xl {
    width: 100%;
    padding-right: 0px;
    padding-left: 0px;
    margin-right: auto;
    margin-left: auto;
}
img{
  width:90%; height:100px;
}
</style>