import { atom } from "jotai/vanilla";

const isServer = typeof window === "undefined";
const cacheState = new Map();
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
        cacheState.set(id, newState);
      }
    );
    return derivedAtom;
  }

  // client side
  else {
    const cached = cacheState.get(id);
    const baseAtom = atom(cached || defaultState);
    return baseAtom;
  }
};

export default atomNext;
