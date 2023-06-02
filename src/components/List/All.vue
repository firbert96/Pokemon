<template>
  <n-row gutter="12">
    <n-col :span="this.$screen.width < 400 ? 12:6">
      <label for="showTypes">Select Types</label>
      <n-space vertical id="showTypes">
          <n-select v-model:value="showTypeDefault" :options="showTypes" placeholder="Select Types" @update:value="handleShowTypes"/>
      </n-space>
    </n-col>
  </n-row>
  <div class="list-group-wrapper mt-4">
    <n-grid class="list-group" cols="1 s:1 m:3 l:3 xl:3 2xl:4" :x-gap="12" :y-gap="8"  responsive="screen">
      <n-grid-item class="list-group-item" v-for="(item,index) in list" :key="index">
        <ListItem :inputData="item" :isList="true"/>
      </n-grid-item>
      <transition name="fade">
      <div class="loading" v-show="loading">
        <span class="fa fa-spinner fa-spin"></span> Loading
      </div>
      </transition>
    </n-grid>
  </div>
</template>

<script>
import ListItem from "./ListItem.vue";
import {  NGrid, NGridItem, NSpace, NSelect, NRow, NCol, } from 'naive-ui'
import axios from "axios";
export default {
  name: "All",
  components: {
    ListItem,
    NGrid,
    NGridItem,
    NSpace,
    NSelect,
    NRow,
    NCol,
  },
  data(){
    return {
      list:[],
      limit:9,
      offset:0,
      inc:9,
      loading: false,
      showTypes:[{
        label: 'All Types',
        value: '0'
      }],
      showTypeDefault:'0',
    }
  },
  beforeMount() {
    this.getInitial();
    this.getTypes();
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
          this.loading = true;
          this.offset += this.inc;
          axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${this.offset}`)
          .then( (response) => {
            this.list.push(...response.data.results)
          })
          .catch( (error) => {
              console.log(error);
          });
          this.loading = false;
        }
      }
    },

    getTypes(){
      axios.get(`https://pokeapi.co/api/v2/type`)
      .then( (response) => {
        response.data.results.map(el=>{
          this.showTypes.push({
            label: el.name.charAt(0).toUpperCase() + el.name.slice(1),
            value: el.url.split("https://pokeapi.co/api/v2/type/")[1].slice(0, -1),
          })
        });
      })
      .catch( (error) => {
          console.log(error);
      });
    },

    handleShowTypes(){

    },
  }
}
</script>

<style scoped>
    .list-group-wrapper {
        position: relative;
    }
    .list-group {
        overflow: auto;
        height: 100%;
    }
    .list-group-item {
        margin-top: 1px;
    }
    .loading {
        text-align: center;
        position: absolute;
        color: #fff;
        z-index: 9;
        background: var(--vt-c-primary);
        padding: 8px 18px;
        border-radius: 5px;
        left: calc(50% - 45px);
        top: calc(50% - 18px);
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-to {
        opacity: 0
    }
</style>