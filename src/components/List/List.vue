<template>
    <n-result
        status="404"
        title="0 Result of Data"
        description=""
        class="my-8"
        v-if="(this.isList && allData?.results?.length === 0 && showTypeDefault ==='all') ||
            (this.isList && allDataTypes?.length === 0 && showTypeDefault !=='all') || 
            (!this.isList && allDataFavorites?.length === 0)"
    >
    </n-result>
    <div v-else>
        <n-row gutter="12" v-if="this.isList">
            <n-col :span="6">
                <label for="showData">Select Show Data</label>
                <n-space vertical id="showData">
                    <n-select v-model:value="showDataDefault" :options="showData" placeholder="Select Show Data" @update:value="handleShowData"/>
                </n-space>
            </n-col>
            <n-col :span="6">
                <label for="showTypes">Select Types</label>
                <n-space vertical id="showTypes">
                    <n-select v-model:value="showTypeDefault" :options="showTypes" placeholder="Select Types" @update:value="handleShowTypes"/>
                </n-space>
            </n-col>
        </n-row>

        <div class="list-group-wrapper mt-4">
            <transition name="fade">
            <div class="loading" v-show="loading">
                <span class="fa fa-spinner fa-spin"></span> Loading
            </div>
            </transition>
            <div  id="infinite-list">
                <n-grid class="list-group" cols="2 s:2 m:3 l:3 xl:3 2xl:4" :x-gap="12" :y-gap="8"  responsive="screen" v-if="isList && showTypeDefault ==='all'">
                    <n-grid-item class="list-group-item" v-for="(item,index) in allData.results" :key="index">
                        <ListItem :inputData="item" :isList="isList"/>
                    </n-grid-item>
                </n-grid>
                <n-grid class="list-group" cols="2 s:2 m:3 l:3 xl:3 2xl:4" :x-gap="12" :y-gap="8"  responsive="screen" v-if="isList && showTypeDefault !=='all'">
                    <n-grid-item class="list-group-item" v-for="(item,index) in allDataTypes" :key="index">
                        <ListItem :inputData="item" :isList="isList"/>
                    </n-grid-item>
                </n-grid>
                <n-grid class="list-group" cols="2 s:2 m:3 l:3 xl:3 2xl:4" :x-gap="12" :y-gap="8"  responsive="screen" v-else>
                    <n-grid-item class="list-group-item" v-for="(item,index) in allDataFavorites" :key="index">
                        <ListItem :inputData="item" :isList="isList" @reloadFavorites="fetchAllPokemonFavorites()"/>
                    </n-grid-item>
                </n-grid>
            </div> 
        </div>
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
    NResult,
    NSpace,
    NSelect,
    NRow,
    NCol,
  },
  data(){
    return {
      allData:{},
      allDataTypes:[],
      allDataFavorites:[],
      loading: false,
      nextItem: 1,
      items: [],
      showData: [
        {
          label: '25',
          value: 25
        },
        {
          label: '50',
          value: 50
        },
        {
          label: '100',
          value: 100
        },
        {
          label: '1000',
          value: 1000
        },
        {
          label: '10000',
          value: 10000
        },
      ],
      showDataDefault: 25,
      showTypes: [
        {
          label: 'All Types',
          value: 'all'
        },
                {
          label: 'Normal',
          value: 1
        },
        {
          label: 'Fire',
          value: 10
        },
        {
          label: 'Water',
          value: 11
        },
        {
          label: 'Grass',
          value: 12
        },
        {
          label: 'Electric',
          value: 13
        },
        {
          label: 'Ice',
          value: 15
        },
        {
          label: 'Figthing',
          value: 2
        },
        {
          label: 'Poison',
          value: 4
        },
        {
          label: 'Ground',
          value: 5
        },
        {
          label: 'Flying',
          value: 3
        },
        {
          label: 'Psychic',
          value: 14
        },
        {
          label: 'Bug',
          value: 7
        },
        {
          label: 'Rock',
          value: 6
        },
        {
          label: 'Ghost',
          value: 8
        },
        {
          label: 'Dark',
          value: 17
        },
        {
          label: 'Dragon',
          value: 16
        },
        {
          label: 'Steel',
          value: 9
        },
        {
          label: 'Fairy',
          value: 18
        },
      ],
      showTypeDefault: 'all',
    }
  },
  props: [
    "isList",
  ],
  watch: {
    allData: {
      handler: function (val, oldVal) { /* ... */ },
      deep: true
    },
  },
  created(){
    if(this.isList) {
        this.fetchAllPokemon();
    }
    else {
        this.fetchAllPokemonFavorites();
    }
  },
  mounted () {
    // Detect when scrolled to bottom.
    const listElm = document.querySelector('#infinite-list');
    listElm.addEventListener('scroll', () => {
      if(listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
        this.loadMore();
      }
    });

    // Initially load some items.
    this.loadMore();

  },
  methods: {
    fetchAllPokemon(){
        axios.get('https://pokeapi.co/api/v2/pokemon?limit='+this.showDataDefault+'&offset=0')
        .then( (response) => {
            this.allData = response.data;
            // console.log(this.allData);
        })
        .catch( (error) => {
            console.log(error);
        });
    },
    fetchAllPokemonFavorites(){
        this.allDataFavorites = [];
        this.listFavorites.forEach(element => {
            axios.get('https://pokeapi.co/api/v2/pokemon/'+element)
            .then( (response) => {
                const params = {
                    name: response.data.name,
                    url:response.data.species.url.replace("pokemon-species", "pokemon"),
                }
                this.allDataFavorites.push(params);
            })
            .catch( (error) => {
                console.log(error);
            });
        });
        // console.log(this.allDataFavorites);
    },
    loadMore () {
        this.loading = true;
        setTimeout(() => {
            for (var i = 0; i < this.showDataDefault; i++) {
                this.items.push('Item ' + this.nextItem++);
            }
            this.loading = false;
        }, 200);  
    },
    handleShowData(){
        this.fetchAllPokemon();
    },
    handleShowTypes(){
        if(this.showTypeDefault !== 'all') {
            this.allDataTypes = [];
            axios.get('https://pokeapi.co/api/v2/type/'+this.showTypeDefault)
            .then( (response) => {
                // console.log(response.data.pokemon, this.showDataDefault);
                this.allData = {
                    count: this.showDataDefault,
                    next: null,
                    previous: null,
                    results: [],
                };
                for (let i = 0; i < this.showDataDefault; i++) {
                    const params = {
                        name: response.data.pokemon[i].pokemon.name,
                        url:response.data.pokemon[i].pokemon.url,
                    }
                    this.allDataTypes.push(params);
                }
                // console.log('trigger',this.allDataTypes);
            })
            .catch( (error) => {
                console.log(error);
            });
        }
        else{
            this.fetchAllPokemon();
        }
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
/* 
    .n-base-select-option--selected {
        .n-base-select-option__content {
            width: 100% !important;
        }
        .n-base-select-option__check {
            right: 0 !important;
            top: 0 !important;
        }
    } */
    
    
</style>