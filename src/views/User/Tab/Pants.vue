<template>
  <v-card
  class="mx-auto"
  max-width="1600"
  >
    <p class="size24" style="text-align:left; margin-top:30px; margin-left:10%">PANTS
      <span class="text">PANTS</span>
    </p>
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="(item, index) in $store.state.imagePants"
          :key="index"
          :cols="2"
          class="mr-10 mb-10"
        >
          <v-card>
            <router-link :to="{name: 'Product_User', params: {id: item.id}}">
              <v-img
                :src="image(item.image)"
                class="white--text align-end"
                gradient="to bottom, rgba(255,0,0,0), rgba(255,0,0,0)"
                height="200px"            
              >
              </v-img>
            </router-link> 
              <v-card-actions>
                <p class="size20" style="text-align:left; margin-top:1px; margin-bottom:1px;">{{item.name}}</p>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
              </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
   created(){
    this.$store.dispatch('imagePants')
  },
  methods:{
    image(image){
        //경로를 조합해줄 메서드.
        if(image == null){
          return require('@/images/null.jpg');
        }
        /* 랜더링 되는 시간 때문에 발생하는 오류를 try, catch로 잡아준다. */
        try {
          return require('@/images/'+ image +'.jpg')
        } catch (e) {
          return require('@/images/null.jpg')
        }
      },
    prepare(){
      alert('준비 중입니다.')
    }
  }
}
</script>

<style scoped>
.size20{
  font-size:15px;
  font-family: "Spoqa Han Sans",sans-serif;
}

.size24{
  font-size:24px;
}
.image{
  width:12%; 
  height:12%;
}
div[data-v-fae5bece] {
    width: 2200px;
    height: 100%;
    /* height: 1800px; */
    
    background-color: rgb(255, 255, 255);
    margin: 0 auto;
    padding: 0px;
    border-radius: 10px;
    font-size: 32px;
    color: black;
    font-family: 'Times New Roman', Times, serif;
    font-weight: 700;
    line-height: 50px;
    text-align: center;
}
span{
  margin:30px;
}

.text{
    font-family: "Spoqa Han Sans",sans-serif;
    color: #807f7f;
    font-size: 14px;
    margin-left:10px;
    font-weight:700;
}
</style>