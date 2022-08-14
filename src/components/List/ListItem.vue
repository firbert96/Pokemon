<template>
    <n-card :title="inputData.name.charAt(0).toUpperCase() + inputData.name.slice(1)" size="huge" hoverable>  
        <n-icon size="40" @click="favoriteFunc(inputData.name)" class="text-red-600" :class="isList ? 'fav-icon-isList': 'fav-icon-isNotList'">
            <heart v-if="favorite" />
            <heart-outline v-else />
        </n-icon>
        <template #cover>
            <div
                :id="'image-scroll-container-'+inputData.name"
                style="
                    overflow: auto;
                    width:100%;
                    height:100%;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                "
            >
                <n-image  :src="detailData?.sprites?.front_default" 
                    fallback-src="https://icon-library.com/images/pokeball-icon-transparent/pokeball-icon-transparent-8.jpg"
                    width="100%" 
                    height="100%" 
                    lazy
                    :intersection-observer-options="{
                        root: '#image-scroll-container-'+inputData.name
                    }"
                />
            </div>
        </template>
        <div v-if="isList">
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
            <n-grid v-else cols="2" v-for="item in detailData.stats" :key="item.id" class="my-2">
                <n-grid-item class="font-bold">
                    {{statName(item.stat.name)}} 
                </n-grid-item>
                <n-grid-item>
                    {{item.base_stat}}
                </n-grid-item>
            </n-grid>

            <button class="text-primary my-4" @click="showModal = true">
                More about {{inputData.name.charAt(0).toUpperCase() + inputData.name.slice(1)}} 
                <n-icon size="12" class="text-primary">
                    <arrow-forward-outline />
                </n-icon>
            </button>
            <n-modal v-model:show="showModal">
                <n-card
                    style="width: 60%"
                    :title="inputData.name.charAt(0).toUpperCase() + inputData.name.slice(1)"
                    :bordered="false"
                    size="huge"
                    role="dialog"
                    aria-modal="true"
                >
                    <n-grid cols="2" class="my-2">
                        <n-grid-item class="font-bold">Base Experience</n-grid-item>
                        <n-grid-item>{{detailData.base_experience}} EXP</n-grid-item>
                    </n-grid>
                    <n-grid cols="2" class="my-2">
                        <n-grid-item class="font-bold">Height</n-grid-item>
                        <n-grid-item>{{detailData.height}} m</n-grid-item>
                    </n-grid>
                    <n-grid cols="2" class="my-2">
                        <n-grid-item class="font-bold">Weight</n-grid-item>
                        <n-grid-item>{{detailData.weight}} KG</n-grid-item>
                    </n-grid>
                    <n-grid cols="2" v-for="(item, index) in detailData.abilities" :key="index" class="my-2">
                        <n-grid-item class="font-bold">
                            Ability {{index+1}}
                        </n-grid-item>
                        <n-grid-item>
                            {{item.ability.name}} 
                        </n-grid-item>
                    </n-grid>
                </n-card>
            </n-modal>
        </div>
    </n-card>
</template>

<script>
import { NGrid, NGridItem, NCard, NImage, NSkeleton, NGi, NButton, NIcon, NModal, } from 'naive-ui'
import { HeartOutline, Heart, ArrowForwardOutline, } from '@vicons/ionicons5'
import axios from 'axios';
export default {
    name: "List Item",
    props: [
        "inputData",
        "isList",
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
        ArrowForwardOutline,
        NModal,
    },
    data(){
        return {
            detailData:{},
            loading:true,
            favorite:false,
            showModal: false,
        }
    },
    created(){
        this.fetchAPokemon();
        this.initFavorite();
        
    },
    watch: {
        inputData: {
            handler: function (val, oldVal) { /* ... */ },
            deep: true
        },
    },
    methods: {
        initFavorite(){
            // console.log('initFavorite');
            if(!this.isList || (this.isList && this.listFavorites.includes(this.inputData.name))){
                this.favorite = true;
            }
        },
        fetchAPokemon(){
            this.loading = true;
            // console.log('url',this.inputData.url);
            axios.get(this.inputData.url)
            .then( (response) => {
                this.detailData = response.data;
                // console.log(this.detailData);
                this.loading = false;
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
        favoriteFunc(str){
            if(this.favorite){
                // this.listFavorites = this.listFavorites.filter(item => item !== str);
                this.listFavorites.forEach((element,index) => {
                    if(element === str) {
                        this.listFavorites.splice(index, 1);
                    }
                });
            }
            else {
                this.listFavorites.push(str);
            }
            
            // console.log('fav', this.listFavorites, this.favorite, str);
            this.favorite = !this.favorite;
            if(!this.isList){
                this.$emit("reloadFavorites");
            }
        },
    },
}
</script>

<style scoped>
    .n-image{
        display: flex !important;
    }
    .fav-icon-isList{
        position: absolute;
        right: 2%;
        top: -130%;
    }
    .fav-icon-isNotList{
        position: absolute;
        right: 2%;
        top: -1450%;
    }
</style>