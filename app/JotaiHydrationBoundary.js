"use client";

import { useMemo } from "react";

const isServer = typeof window === "undefined";

export const JotaiHydrationBoundary = ({ children, state, queryClient }) => {
  useMemo(() => {
    if (!isServer) {
      global.cacheStore = new Map(Object.entries(state));
    }
  }, []);

  return children;
};

export default JotaiHydrationBoundary;
