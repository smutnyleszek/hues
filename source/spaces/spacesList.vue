<template lang="html">
  <div>
    <space-form space="rgb"></space-form>
    <space-form space="hex"></space-form>
    <space-form space="hsl"></space-form>
    <space-form space="hwb"></space-form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import spaceForm from "./spaceForm.vue";
export default Vue.extend({
  name: "spacesList",
  components: {
    spaceForm,
  },
});
</script>

<style lang="css" scoped>
div {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
