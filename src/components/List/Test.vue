<template>
  <div>
    test
    <n-grid class="list-group" cols="1 s:1 m:3 l:3 xl:3 2xl:4" :x-gap="12" :y-gap="8"  responsive="screen">
      <n-grid-item class="list-group-item" v-for="(item,index) in list" :key="index">        
          <ListItem :inputData="item" :isList="true"/>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script>
import ListItem from "./ListItem.vue";
import axios from 'axios';
import {  NGrid, NGridItem, NResult, NSpace, NSelect, NRow, NCol, } from 'naive-ui'
export default {
  name: "List",
  components: {
    ListItem,
    NGrid,
    NGridItem,
    // NResult,
    // NSpace,
    // NSelect,
    // NRow,
    // NCol,
  },
  data(){
    return {
      list:[],
      limit:9,
      offset:5,
      inc:9,
    }
  },
  beforeMount() {
    this.getInitial();
  },
  mounted() {
    this.getNext();
  },
  methods:{
    getInitial(){
      axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${this.offset}`)
      .then( (response) => {
        this.list = [...response.data.results]
      })
      .catch( (error) => {
          console.log(error);
      });
    },

    getNext(){
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          this.limit += this.inc;
          this.offset += this.inc;
          axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${this.offset}`)
          .then( (response) => {
            this.list.push(...response.data.results)
          })
          .catch( (error) => {
              console.log(error);
          });
        }
      }
    },

  }
}
</script>

<style>

</style>