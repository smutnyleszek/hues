<template>
  <div class="app">
    <header class="logo">h(u,e,s)</header>
    <main>
      <spaces-list></spaces-list>
      <current-color></current-color>
    </main>
    <footer>
      <a href="https://github.com/magicznyleszek/hues" target="_blank">*</a>
    </footer>
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
footer {
  margin-top: var(--s-leading);
}
footer a {
  text-decoration: none;
  opacity: 0.25;
}
footer a:hover {
  opacity: 1;
}
footer a:active {
  opacity: 0.75;
}
</style>
