<template>
    <!-- <n-space v-if="loading">
        <n-spin size="large" />
    </n-space> -->
    <n-grid cols="2 s:2 m:3 l:3 xl:3 2xl:4" :x-gap="12" :y-gap="8"  responsive="screen">
        <n-grid-item v-for="item in allData.results" :key="item.url">
            <ListItem :inputData="item"/>
        </n-grid-item>
    </n-grid>
</template>

<script>
import ListItem from "./ListItem.vue";
import axios from 'axios';
import {  NGrid, NGridItem, NSpace, NSpin, } from 'naive-ui'
import InfiniteList from 'vue3-infinite-list';
export default {
  name: "List",
  components: {
    ListItem,
    NGrid,
    NGridItem,
    // InfiniteList,
    // NSpace,
    // NSpin,
  },
  data(){
    return {
      allData:{},
      debug:false,
    //   loading:true,
    }
  },
  created(){
    this.fetchAllPokemon();
  },
  methods: {
    fetchAllPokemon(){
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=30&offset=0')
        .then( (response) => {
            this.allData = response.data;
            // console.log(this.allData);
            // this.loading = false;
            
        })
        .catch( (error) => {
            console.log(error);
        });
    }
  },
}
</script>


<style scoped>

</style>