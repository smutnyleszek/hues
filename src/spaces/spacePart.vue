<template lang="html">
  <input
    v-bind:value="partValue"
    type="text"
    v-bind:style="widthStyle"
    @input="onInput"
    @keydown="onKeyDown"
  />
</template>

<script lang="ts">
import Vue from "vue";
import converter from "../colors/converter";
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
    widthStyle() {
      const valueTextLength = String(this.partValue).length;
      return `width: ${valueTextLength * 0.75}rem;`;
    }
  },
  methods: {
    onInput(evt): void {
      this.setValueWithChange(evt.target.value);
    },
    onKeyDown(evt) {
      switch (evt.key) {
        case "ArrowUp":
          if (evt.shiftKey) {
            this.setValueWithChange(this.partValue, 10);
          } else {
            this.setValueWithChange(this.partValue, 1);
          }
          evt.preventDefault();
          break;
        case "ArrowDown":
          if (evt.shiftKey) {
            this.setValueWithChange(this.partValue, -10);
          } else {
            this.setValueWithChange(this.partValue, -1);
          }
          evt.preventDefault();
          break;
        default:
          return;
      }
    },
    setValueWithChange(newValue: TColorValuePart, change: number = 0): void {
      let finalValue = newValue || "0";
      if (this.partType === "hexadecimal") {
        finalValue = converter.hexToInt(finalValue);
      } else {
        finalValue = parseInt(finalValue, 10);
      }

      finalValue += change;

      // fix by range limits
      finalValue = Math.max(finalValue, this.range[0]);
      finalValue = Math.min(finalValue, this.range[1]);

      // change it back to proper type if necessary
      if (this.partType === "hexadecimal") {
        finalValue = converter.intToHex(finalValue);
      }

      this.updatePartValue(finalValue);
    },
    updatePartValue(newValue): void {
      const color = this.$store.getters.getColorInSpace(this.space);
      if (this.partType === "integer") {
        newValue = Number(newValue);
      }
      color[this.partIndex] = newValue;
      this.$store.commit("setColor", {
        space: this.space,
        color: color
      });
    }
  }
});
</script>

<style lang="css" scoped>
input {
  min-width: 1rem;
  text-align: center;
}
</style>
