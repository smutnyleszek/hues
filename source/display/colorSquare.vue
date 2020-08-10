<template lang="html">
  <figure v-bind:style="bgStyle" v-bind:title="title"></figure>
</template>

<script lang="ts">
import Vue from "vue";
import formatter from "/colors/formatter";
export default Vue.extend({
  name: "colorSquare",
  props: {
    color: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
  },
  computed: {
    bgStyle() {
      const colorString = formatter.formatColor(this.color);
      return `background-color: ${colorString};`;
    },
  },
});
</script>

<style lang="css" scoped>
figure {
  width: 100%;
  min-width: calc(var(--s-leading) * 3);
  height: calc(var(--s-leading) * 3);
}
</style>
