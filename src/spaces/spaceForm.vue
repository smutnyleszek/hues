<template lang="html">
  <form>
    <div v-for="(part, index) in parts">
      <span v-if="part.before">{{ part.before }}</span>
      <space-part
        v-bind:partIndex="index"
        v-bind:partType="part.partType"
        v-bind:range="part.range"
        v-bind:space="space"
      ></space-part>
      <span v-if="part.after">{{ part.after }}</span>
    </div>
    <button @click="onCopyClick" title="copy to clipboard">&darr;</button>
  </form>
</template>

<script lang="ts">
import Vue from "vue";
import spacePart from "./spacePart.vue";
import { spaces } from "./spacesConfig";
import formatter from "../colors/formatter";
import clipboardier from "../misc/clipboardier";
export default Vue.extend({
  name: "spaceForm",
  components: {
    spacePart
  },
  props: {
    space: {
      type: String,
      required: true
    }
  },
  data: function() {
    return {
      parts: spaces.get(this.space).parts
    };
  },
  methods: {
    onCopyClick(evt) {
      evt.preventDefault();
      const colorValue = this.$store.getters.getColorInSpace(this.space);
      clipboardier.copy(formatter.formatColor(colorValue));
    }
  }
});
</script>

<style lang="css" scoped>
form, div {
  display: flex;
  flex-direction: row;
}
button {
  margin-left: 0.25rem;
}
</style>
