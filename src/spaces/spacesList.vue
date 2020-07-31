<template lang="html">
  <div class="spaces-list">
    <space v-for="spaceDef in spaces" v-bind:spaceName="spaceDef"></space>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import space from "./space.vue";
import { spaces } from "./spacesConfig";
export default Vue.extend({
  name: "spacesList",
  components: {
    space
  }
  data: function() {
    return {
      spaces: spaces.keys()
    };
  },
});
</script>

<style lang="css" scoped>
@import "../styles-config/variables.css";
.spaces-list {
  padding: var(--s-leading);
}
</style>
