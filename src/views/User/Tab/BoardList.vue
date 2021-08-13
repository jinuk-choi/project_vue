
<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col sm="1" >
        <v-card
          class="pa-2"
          outlined
          tile>
        <select v-model="selected" >
          <option disabled value="">Please select one</option>
          <option value="1">제목</option>
          <option value="2">내용</option>
          <option value="4">작성자</option>
        </select>
        </v-card>
      </v-col>
      <v-col  sm="2">
        <v-card
          class="pa-2"
          outlined
          tile>
          <input v-model="search"  type="text" placeholder="검색어를 입력해주세요" class="form-group">
        </v-card>
      </v-col>
      <v-col  sm="1">
        <v-btn @click="BoardSearch({type: selected, keyword: search, page: page})">검색</v-btn>
      </v-col>
      <v-col sm="1">
        <v-btn v-if="this.$store.state.login_flag == 1" router :to="{name:'BoardWrite'}" >글쓰기</v-btn>
      </v-col >
    </v-row>

    <v-row no-gutters>
      <v-col  md="2" >
      </v-col>
      <v-col  md="8"  >
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th  class="text-center">
                  NO
                </th>
                <th  class="text-center">
                  제목
                </th>
                <th  class="text-center">
                  내용
                </th>
                <th   class="text-center">
                  작성자
                </th>
                <th   class="text-center">
                  조회수
                </th>
                <th  class="text-center">
                  작성일
                </th>
              </tr>
            </thead>
            <tbody>
              <tr tr style="cursor:pointer;"
                v-for="item in List"
                :key="item.aIdx"
                @click="boardDetail(item.aIdx)"
              >
                <td style="width: 100px;" >{{ item.rownum }}</td>
                <td style="width: 200px;" >
                  <span v-if="item.aDepth > 1">
                    <span v-for="n in item.aDepth-1" v-bind:key="n">ㄴ</span>
                  </span> {{ item.aTitle }}
                </td>
                <td style="width: 300px;" >{{ item.aContent }}</td>
                <td style="width: 70px;" >{{ item.user.name }}</td>
                <td style="width: 50px;" >{{ item.aCount }}</td>
                <td style="width: 150px;" >{{ item.aDate }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
      <v-col  md="2" >
      </v-col>
    </v-row>

    <v-row
      class="mb-6"
      no-gutters>
      <v-col lg="4">
      </v-col>
      <v-col md="auto">
        <div  class="text-xs-center">
          <v-pagination
            v-model="page"
            :length="pagination.lastPage"
            :total-visible="5"
            @input="next(page)"
          ></v-pagination>
        </div>
      </v-col>
      <v-col lg="4">
      </v-col>
    </v-row>
  </v-container> 
</template>

<script>
import { mapActions,mapState } from "vuex"
import axios from 'axios'
export default {
  
  data () {
      return {
        pagination: {},
        page: 1,
        List: [],
        selected: '',
        search:'',
      }
  },
  
  created() {
    this.boardList()
  },
  computed: {

  },
  methods: {
    ...mapActions(['boardDetail']),

    BoardSearch (payload) {
      var dns = this.$store.state.dns
      axios.get('http://'+ dns +'/api/board/'+payload.page+ '/' +payload.type+ '/' +payload.keyword )
        .then(Response => {
            console.log(Response.data)
            this.pagination = Response.data
            this.List = this.pagination.list
        })
        .catch(Error => {
            console.log('error')
            reject(Error)
        })
    },

    next (page) {
      var dns = this.$store.state.dns
      axios.get('http://'+ dns +'/api/board/'+page )
        .then(Response => {
            console.log(Response.data)
            this.pagination = Response.data
            this.List = this.pagination.list
        })
        .catch(Error => {
            console.log('error')
            reject(Error)
        })
    },

    boardList() {
      var dns = this.$store.state.dns
      return new Promise((resolve, reject) => {
          axios.get('http://'+ dns +'/api/board')
              .then(Response => {
                  console.log(Response.data)
                  this.pagination = Response.data
                  this.List = this.pagination.list
              })
              .catch(Error => {
                  console.log('error')
                  reject(Error)
              })
      })
    }
  }
}
</script>
