<template>
    <n-card :title="inputData.name.charAt(0).toUpperCase() + inputData.name.slice(1)" size="huge" hoverable>  
        <template #cover>
            <n-skeleton v-if="loading" :width="200" :height="200" :sharp="false" size="medium" />
            <n-image v-else :src="detailData?.sprites?.front_default" 
                fallback-src="https://icon-library.com/images/pokeball-icon-transparent/pokeball-icon-transparent-8.jpg"
                width="100%" 
                height="100%" 
                lazy
            />
        </template>

        <n-icon size="40" @click="favoriteFunc()" class="text-red-600">
            <heart v-if="favorite" />
            <heart-outline v-else />
        </n-icon>
        
        <n-skeleton v-if="loading" :width="200" :height="100" :sharp="false" size="medium" />
        <n-grid v-else x-gap="10" :cols="3" class="my-2">
            <n-gi v-for="item in detailData.types" :key="item.id">
                <!-- <n-image width="25" height="25"  
                    src="https://static.wikia.nocookie.net/pokemongo/images/8/88/Icon_Bug.png/revision/latest/scale-to-width-down/25?cb=20171219195822"/> -->
                <n-button strong secondary round :style="{color: 'white',
                    backgroundColor: typeColor(item.type.name),
                }">
                    {{item.type.name}}
                </n-button>
            </n-gi>
        </n-grid>
        
        <n-skeleton v-if="loading" :width="200" :height="200" :sharp="false" size="medium" />
        <n-grid v-else cols="2" v-for="item in detailData.stats" :key="item.id" >
            <n-grid-item>
                {{statName(item.stat.name)}} 
            </n-grid-item>
            <n-grid-item>
                {{item.base_stat}}
            </n-grid-item>
        </n-grid>
        <!-- <a :href="inputData.url" class="text-primary ">Go to URL</a> -->
    </n-card>
</template>

<script>
import { NGrid, NGridItem, NCard, NImage, NSkeleton, NGi, NButton, NIcon } from 'naive-ui'
import { HeartOutline, Heart } from '@vicons/ionicons5'
import axios from 'axios';
export default {
    name: "List Item",
    props: [
        "inputData",
    ],
    components: {
        NCard,
        NImage,
        NGrid,
        NGridItem,
        NSkeleton,
        NGi,
        NButton,
        HeartOutline,
        Heart,
        NIcon,
    },
    data(){
        return {
            detailData:{},
            loading:true,
            favorite:false,
        }
    },
    created(){
        this.fetchAPokemon();
        this.loading = false;
    },
    methods: {
        fetchAPokemon(){
            axios.get(this.inputData.url)
            .then( (response) => {
                this.detailData = response.data;
                console.log(this.detailData);
            })
            .catch( (error) => {
                console.log(error);
            });
        },
        statName(str) {
            switch(str) {
                case 'hp':
                    return 'HP';
                case 'attack':
                    return 'Attack';
                case 'defense':
                    return 'Defense';
                case 'special-attack':
                    return 'Special Attack';
                case 'special-defense':
                    return 'Special Defense';
                case 'speed':
                    return 'Speed';
            }
        },
        typeColor(str) {
            switch(str) {
                case 'normal':
                    return '#A8A878';
                case 'fire':
                    return '#F08030';
                case 'water':
                    return '#6890F0';
                case 'grass':
                    return '#78C850';
                case 'electric':
                    return '#F8D030';
                case 'ice':
                    return '#98D8D8';
                case 'figthing':
                    return '#C03028';
                case 'poison':
                    return '#A040A0';
                case 'ground':
                    return '#E0C068';
                case 'flying':
                    return '#A890F0';
                case 'psychic':
                    return '#F85888';
                case 'bug':
                    return '#A8B820';
                case 'rock':
                    return '#B8A038';
                case 'ghost':
                    return '#705898';
                case 'dark':
                    return '#705848';
                case 'dragon':
                    return '#7038F8';
                case 'steel':
                    return '#B8B8D0';
                case 'fairy':
                    return '#F0B6BC';
            }
        },
        favoriteFunc(){
            this.favorite = !this.favorite;
        },
    },
}
</script>

<style scoped>
    .n-image{
        display: flex !important;
    }
    .pokemonTypes {
        color: white;
        background-color: ;
    }
</style>