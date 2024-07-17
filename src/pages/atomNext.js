import { atom } from "jotai/vanilla";

const cacheStore = new Map();
const isServer = typeof window === "undefined";
let incrementId = 1;

const atomNext = (defaultState, id = incrementId++) => {
  // server side
  if (isServer) {
    const baseAtom = atom(defaultState);
    const derivedAtom = atom(
      (get) => get(baseAtom),
      (get, set, update) => {
        const newState =
          typeof update === "function" ? update(get(baseAtom)) : update;
        set(baseAtom, newState);
        cacheStore.set(id, newState);
      }
    );
    return derivedAtom;
  }

  // client side
  else {
    const cached = cacheStore.get(id);
    const baseAtom = atom(cached || defaultState);
    return baseAtom;
  }
};

global.cacheStore = cacheStore;

export default atomNext;
