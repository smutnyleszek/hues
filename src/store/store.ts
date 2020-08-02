import Vue from "vue";
import Vuex from "vuex";
import * as packageJsonData from "../../package.json";
import converter from "../colors/converter";
import matcher from "../dictionary/matcher";
const version = (packageJsonData as any).version;

Vue.use(Vuex);

const initialColorSpace = "hsl";
const initialColorValue = converter.getRandomColor(initialColorSpace);

const myStore = new Vuex.Store({
  getters: {
    getColorInSpace: (state: IState) => (space: TSpace) => {
      return converter.convertFromTo(state.space, space, state.color);
    }
  },
  mutations: {
    setColor(state: IState, payload: ISetColorPayload) {
      const match = matcher.matchColor(payload.space, payload.color);
      Vue.set(state, "match", match);
      Vue.set(state, "color", [...payload.color]);
      Vue.set(state, "space", payload.space);
    }
  },
  state: {
    color: initialColorValue,
    match: matcher.matchColor(initialColorSpace, initialColorValue),
    space: initialColorSpace,
    version
  },
  // we want strict only during development (performance heavy-ish)
  strict: window.location.hostname === "localhost"
});

export const store = myStore;
