<template lang="html">
  <div>
    <input
      @blur="onBlur"
      @focus="onFocus"
      @input="onInput"
      title="paste here"
      type="text"
      placeholder="…"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import identifier from "../colors/identifier";
export default Vue.extend({
  name: "pasteBox",
  methods: {
    onInput(evt): void {
      const identified = identifier.identify(evt.target.value);
      if (identified !== null) {
        this.$store.commit("setColor", { color: identified });
      }
    },
    onFocus(evt): void {
      evt.target.setAttribute("placeholder", "paste or type here");
    },
    onBlur(evt): void {
      evt.target.setAttribute("placeholder", "…");
    }
  }
});
</script>

<style lang="css" scoped>
input {
  width: 100%;
}
</style>
