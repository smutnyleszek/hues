import Vue from "vue";
import Vuex from "vuex";
import * as packageJsonData from "../../package.json";
import converter from "../colors/converter";
const version = (packageJsonData as any).version;

Vue.use(Vuex);

const initialColorSpace = "rgb";
const initialColor = converter.getRandomColor(initialColorSpace);

const myStore = new Vuex.Store({
  getters: {
    getColorInSpace: (state: IState) => (spaceName: TSpaceName) => {
      return converter.convertFromTo(
        state.spaceName,
        spaceName,
        state.colorValue
      );
    }
  },
  mutations: {
    setColor(state, payload) {
      Vue.set(state, "spaceName", payload.spaceName);
      Vue.set(state, "colorValue", [...payload.colorValue]);
    }
  },
  state: {
    colorValue: initialColor,
    spaceName: initialColorSpace,
    version
  },
  // we want strict only during development (performance heavy-ish)
  strict: window.location.hostname === "localhost"
});

export const store = myStore;
