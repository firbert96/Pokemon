<template>
  <div class="my-8 place-content-center w-full">
    <img 
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png"/>
  </div>
  <n-card>
    <n-tabs type="segment" animated>
      <n-tab-pane name="list" tab="List">
        <List :isList="true"/>
      </n-tab-pane>
      <n-tab-pane name="favorites" tab="Favorites">
        <List :isList="false"/>
      </n-tab-pane>
    </n-tabs>
  </n-card>
  
</template>

<script>
import List from "./List/List.vue";
import {  NCard, NTabs, NTabPane } from 'naive-ui'
export default {
  name: "Home",
  components: {
    List,
    NCard,
    NTabs,
    NTabPane,
  },
}
</script>


<style scoped>
  img{
      height: 60%;
      width: 50%;
      display: block;
      margin-left: auto;
      margin-right: auto;
  }
  /* .n-tabs-tab--active{
    background-color: var('--vt-c-primary');
  } */

</style>