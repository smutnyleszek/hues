<template lang="html">
  <div class="space">
    <span v-for="(part, index) in parts">
      <span v-if="part.before">{{ part.before }}</span>
      <space-part
        v-bind:partIndex="index"
        v-bind:partType="part.partType"
        v-bind:range="part.range"
        v-bind:space="space"
      ></space-part>
      <span v-if="part.after">{{ part.after }}</span>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import spacePart from "./spacePart.vue";
import { spaces } from "./spacesConfig";
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
  }
});
</script>

<style lang="css" scoped></style>
