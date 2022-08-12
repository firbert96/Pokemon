<template>
  <h1 class="text-xl font-bold text-primary">
    Hello world!
  </h1>
  <List />
</template>

<script>
import List from "./List/List.vue";
export default {
  name: "Home",
  components: {
    List,
  },
}
</script>


<style scoped>

</style>