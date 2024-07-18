"use client";

import { useMemo } from "react";
import { hydrateServerState } from "./atomNext";

const isServer = typeof window === "undefined";

export const JotaiHydrationBoundary = ({ children, state }) => {
  useMemo(() => {
    if (!isServer) {
      hydrateServerState(state);
    }
  }, []);

  return children;
};

export default JotaiHydrationBoundary;
