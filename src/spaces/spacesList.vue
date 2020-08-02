<template lang="html">
  <div class="spaces-list">
    <space-form v-for="spaceDef in spaces" v-bind:space="spaceDef"></space-form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import spaceForm from "./spaceForm.vue";
import { spaces } from "./spacesConfig";
export default Vue.extend({
  name: "spacesList",
  components: {
    spaceForm
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
