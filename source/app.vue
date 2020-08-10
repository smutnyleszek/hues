<template>
  <div class="app">
    <header>
      <h1>h(u,e,s)</h1>
      <a href="https://github.com/magicznyleszek/hues" target="_blank">*</a>
    </header>

    <main>
      <paste-box></paste-box>
      <spaces-list></spaces-list>
      <current-color></current-color>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import pasteBox from "./display/pasteBox.vue";
import spacesList from "./spaces/spacesList.vue";
import currentColor from "./display/currentColor.vue";
export default Vue.extend({
  name: "app",
  components: {
    pasteBox,
    spacesList,
    currentColor,
  },
});
</script>

<style lang="css" scoped>
header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
header h1 {
  font-size: inherit;
  font-weight: bold;
}
</style>
