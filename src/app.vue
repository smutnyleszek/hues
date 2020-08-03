<template>
  <div class="app">
    <figure class="logo">h(u,e,s)</figure>
    <spaces-list></spaces-list>
    <current-color></current-color>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import spacesList from "./spaces/spacesList.vue";
import currentColor from "./display/currentColor.vue";
export default Vue.extend({
  name: "app",
  components: {
    spacesList,
    currentColor
  }
});
</script>

<style lang="css" scoped>
.logo {
  font-weight: bold;
  margin-bottom: var(--s-leading);
}
</style>
