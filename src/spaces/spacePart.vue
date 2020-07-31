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
    spaceName: {
      type: String,
      required: true
    }
  },
  computed: {
    partValue() {
      const colorValue = this.$store.getters.getColorInSpace(this.spaceName);
      console.log("computed partValue", this.spaceName, colorValue);
      return colorValue[this.partIndex];
    },
    inputType() {
      return this.partType === "integer" ? "number" : "text";
    }
  },
  methods: {
    updateColor(evt) {
      const colorValue = this.$store.getters.getColorInSpace(this.spaceName);
      let newPartValue = evt.target.value;
      if (this.partType === "integer") {
        newPartValue = Number(newPartValue);
      }
      colorValue[this.partIndex] = newPartValue;
      this.$store.commit("setColor", {
        spaceName: this.spaceName,
        colorValue: colorValue
      });
    }
  }
});
</script>

<style lang="css" scoped></style>
