<template lang="html">
  <input
    class="space-part"
    :value="partValue"
    v-bind:type="inputType"
    @input="updateColor"
  />
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "spacePart",
  props: {
    partIndex: {
      type: Number,
      required: true
    },
    partType: {
      type: String,
      required: true
    },
    range: {
      type: Array,
      required: true
    },
    space: {
      type: String,
      required: true
    }
  },
  computed: {
    partValue() {
      const color = this.$store.getters.getColorInSpace(this.space);
      return color[this.partIndex];
    },
    inputType() {
      return this.partType === "integer" ? "number" : "text";
    }
  },
  methods: {
    updateColor(evt) {
      const color = this.$store.getters.getColorInSpace(this.space);
      let newPartValue = evt.target.value;
      if (this.partType === "integer") {
        newPartValue = Number(newPartValue);
      }
      color[this.partIndex] = newPartValue;
      this.$store.commit("setColor", {
        space: this.space,
        color: color
      });
    }
  }
});
</script>

<style lang="css" scoped></style>
