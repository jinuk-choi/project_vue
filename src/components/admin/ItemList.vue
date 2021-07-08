<template>
  <v-simple-table>
      <template v-slot:default>
        <thead>
          
            <v-select v-model="selected" >
              <option disabled value="">Please select one</option>
              <option value="1">상품코드</option>
              <option value="2">상품명</option>
          
            </v-select>&nbsp;
              <input v-model="search"  type="text" placeholder="search.." class="form-group">
              <p></p>
              <v-btn @click="BoardSearch({type: selected, keyword: search, page: page})">검색</v-btn>
          <tr>
            <th class="text-left">
              상품코드
            </th>
            <th style="width: 200px;" class="text-left">
              상품명
            </th>
            <th style="width: 200px;" class="text-left">
              재고
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
  

  computed: {

  },

}
</script>


