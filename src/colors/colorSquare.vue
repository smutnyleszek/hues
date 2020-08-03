<template lang="html">
  <figure v-bind:style="bgStyle"></figure>
</template>

<script lang="ts">
import Vue from "vue";
import formatter from "./formatter";
export default Vue.extend({
  name: "colorSquare",
  props: {
    color: {
      type: Array,
      required: true
    },
    space: {
      type: String,
      required: true
    }
  },
  computed: {
    bgStyle() {
      const colorString = formatter.formatColor(this.space, this.color);
      return `background-color: ${colorString};`;
    }
  }
});
</script>

<style lang="css" scoped>
@import "../styles-config/variables.css";
figure {
  width: 100%;
  min-width: calc(var(--s-leading) * 3);
  height: calc(var(--s-leading) * 3);
}
</style>
