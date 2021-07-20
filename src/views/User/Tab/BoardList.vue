
<template>
  <v-simple-table>
      <template v-slot:default>
        <thead>
          <v-container>
              <v-row
                class="mb-6"
                justify="left"
                no-gutters>
                <v-col lg="2">
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
                <v-col md="auto">
                  <v-card
                    class="pa-2"
                    outlined
                    tile>
                   <input v-model="search"  type="text" placeholder="search.." class="form-group">
                  </v-card>
                </v-col>
                <v-col lg="1">
                  <v-btn @click="BoardSearch({type: selected, keyword: search, page: page})">검색</v-btn>
                </v-col>
                <v-col lg="1">
                  <v-btn router :to="{name:'boardwrite'}" >글쓰기</v-btn>
                </v-col>
              </v-row>
          </v-container> 
          <tr>
            <th class="text-left">
              NO
            </th>
            <th style="width: 200px;" class="text-left">
              제목
            </th>
            <th style="width: 200px;" class="text-left">
              내용
            </th>
            <th class="text-left">
              작성자
            </th>
            <th class="text-left">
              조회수
            </th>
            <th class="text-left">
              작성일
            </th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="item in List"
            :key="item.aIdx"
            @click="boardDetail(item.aIdx)"
          >
            <td>{{ item.rownum }}</td>
            <td>
              <span v-if="item.aDepth > 1">
                <span v-for="n in item.aDepth-1" v-bind:key="n">ㄴ</span>
              </span> {{ item.aTitle }}
            </td>
            <td>{{ item.aContent }}</td>
            <td>{{ item.user.name }}</td>
            <td>{{ item.aCount }}</td>
            <td>{{ item.aDate }}</td>
          </tr>
        </tbody>
          <div class="text-xs-center">
            <v-pagination
              v-model="page"
              :length="pagination.lastPage"
              :total-visible="5"
              @input="next(page)"
            ></v-pagination>
          </div>
      </template>
  </v-simple-table>
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
        search:''
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
      axios.get('http://localhost:9100/api/board/'+payload.page+ '/' +payload.type+ '/' +payload.keyword )
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
      axios.get('http://localhost:9100/api/board/'+page )
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
      return new Promise((resolve, reject) => {
          axios.get('http://localhost:9100/api/board')
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
