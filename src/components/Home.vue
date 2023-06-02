<template>
  <n-card>
    <n-tabs type="segment" animated>
      <n-tab-pane name="all" tab="All">
        <All/>
      </n-tab-pane>
      <!-- <n-tab-pane name="test" tab="test">
        <Test/>
      </n-tab-pane> -->
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
import Test from "./List/Test.vue";
import All from "./List/All.vue";
import {  NCard, NTabs, NTabPane } from 'naive-ui'
export default {
  name: "Home",
  components: {
    List,
    NCard,
    NTabs,
    NTabPane,
    // Test
    All,
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
</style>