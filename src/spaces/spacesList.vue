<template lang="html">
  <ul>
    <li>
      <space-form space="rgb"></space-form>
      <space-form space="hex"></space-form>
      <space-form space="hsl"></space-form>
      <space-form space="hwb"></space-form>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import spaceForm from "./spaceForm.vue";
export default Vue.extend({
  name: "spacesList",
  components: {
    spaceForm
  }
});
</script>

<style lang="css" scoped></style>
