import { atom } from "jotai/vanilla";

const isServer = typeof window === "undefined";
let incrementId = 1;

global.cacheStore = new Map();

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
        global.cacheStore.set(id, newState);
      }
    );
    return derivedAtom;
  }

  // client side
  else {
    const cached = global.cacheStore.get(id);
    const baseAtom = atom(cached || defaultState);
    return baseAtom;
  }
};

export default atomNext;
