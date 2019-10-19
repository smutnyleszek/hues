export const mutations = {
  initializeStore(state: IState): void {
    const storeCache = window.localStorage.getItem("hues");
    const cachedStateData = JSON.parse(storeCache || "{}");
    // only load cached data for current version
    if (storeCache && cachedStateData.version === state.version) {
      console.debug("loading cached store…");
      state.foo = cachedStateData.foo;
    }
  }
};
