<template lang="html">
  <div class="current-color">
    <div>
      <h1>current</h1>
      <color-square
        v-bind:space="space"
        v-bind:color="currentColor"
      ></color-square>
    </div>
    <div>
      <h1>matched</h1>
      <label>{{ matchedName }}</label>
      <color-square
        v-bind:space="space"
        v-bind:color="matchedColor"
      ></color-square>
      <small>{{ matchedDifference }}</small>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import colorSquare from "../colors/colorSquare.vue";
export default Vue.extend({
  name: "currentColor",
  components: {
    colorSquare
  },
  computed: {
    currentColor() {
      return this.$store.getters.getColorInSpace(this.space);
    },
    matchedColor() {
      return this.$store.state.match.color;
    }
    matchedName() {
      return this.$store.state.match.name;
    }
    matchedDifference() {
      return this.$store.state.match.difference;
    }
  },
  data: function() {
    return {
      space: "hsl"
    };
  },
});
</script>

<style lang="css" scoped></style>
