<template lang="html">
  <div class="wrapper">
    <div class="current">
      <color-square
        space="hsl"
        v-bind:color="currentColor"
        title="current color"
      ></color-square>
    </div>

    <div class="matched">
      <color-square
        space="hsl"
        v-bind:color="matchedColor"
        title="closest match"
      ></color-square>
      <label>{{ matchedName }}</label>
      <span class="distance" title="difference/distance"
        >&larr;&rarr; {{ matchedDifference }}</span
      >
    </div>

    <div class="hue">
      <color-square
        space="hsl"
        v-bind:color="primaryHueColor"
        title="primary hue"
      ></color-square>
      <label>{{ primaryHueName }}</label>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import colorSquare from "./colorSquare.vue";
export default Vue.extend({
  name: "currentColor",
  components: {
    colorSquare
  },
  computed: {
    primaryHueColor() {
      return this.$store.state.primaryHue.color;
    },
    primaryHueName() {
      return this.$store.state.primaryHue.name;
    },
    currentColor() {
      return this.$store.getters.getColorInSpace("hsl");
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
  }
});
</script>

<style lang="css" scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}
.current {
  width: 100%;
}
.matched {
  flex: 1;
}
.hue {
  text-align: center;
}
.distance {
  color: var(--c-shady-lady);
}
</style>
