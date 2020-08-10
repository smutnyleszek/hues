import Vue from "vue";
import Vuex from "vuex";
import * as packageJsonData from "../../package.json";
import converter from "../colors/converter";
import matcher from "../dictionary/matcher";
const version = (packageJsonData as any).version;

Vue.use(Vuex);

const initialColorValue = converter.getRandomColor("hsl");

const myStore = new Vuex.Store({
  getters: {
    getColorInSpace: (state: IState) => (space: TSpace) => {
      return converter.convertTo(state.color, space);
    },
  },
  mutations: {
    setColor(state: IState, payload: ISetColorPayload) {
      const primaryHue = matcher.matchHue(payload.color);
      const match = matcher.matchColor(payload.color);
      Vue.set(state, "color", [...payload.color]);
      Vue.set(state, "match", match);
      Vue.set(state, "primaryHue", primaryHue);
    },
  },
  state: {
    color: initialColorValue,
    match: matcher.matchColor(initialColorValue),
    primaryHue: matcher.matchHue(initialColorValue),
    version,
  },
  // we want strict only during development (performance heavy-ish)
  strict: window.location.hostname === "localhost",
});

export const store = myStore;
