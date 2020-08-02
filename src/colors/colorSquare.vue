<template lang="html">
  <div class="square" v-bind:style="bgStyle"></div>
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
.square {
  width: calc(var(--s-leading) * 2);
  height: calc(var(--s-leading) * 2);
  border: 1px solid currentColor;
  border-radius: 0.125rem;
}
</style>
