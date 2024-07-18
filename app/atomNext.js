import { atom } from "jotai/vanilla";

const isServer = typeof window === "undefined";
let incrementId = 1;

// init cache store
if (!global.cacheStore) {
  global.cacheStore = new Map();
}

const atomNext = (defaultState, id = incrementId++) => {
  // server side - update both atom and cache store
  if (isServer) {
    const baseAtom = atom(defaultState);
    const derivedAtom = atom(
      (get) => global.cacheStore.get(id),
      (get, set, update) => {
        const newState =
          typeof update === "function"
            ? update(global.cacheStore.get(id))
            : update;
        set(baseAtom, newState);
        global.cacheStore.set(id, newState);
      }
    );
    return derivedAtom;
  }

  // client side - get atom default state from cache store
  else {
    const cached = global.cacheStore.get(id);
    const baseAtom = atom(cached || defaultState);
    return baseAtom;
  }
};

export default atomNext;
