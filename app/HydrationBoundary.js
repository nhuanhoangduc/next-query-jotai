"use client";

import { useState, useMemo } from "react";
import {
  isServer,
  dehydrate,
  HydrationBoundary as QueryHydrationBoundary,
} from "@tanstack/react-query";

export const JotaiHydrationBoundary = ({ children, state }) => {
  const [hydrationQueue, setHydrationQueue] = useState();

  useMemo(() => {
    if (isServer) {
      setHydrationQueue("meomeomemo");
    }
  }, []);

  console.log("hydrationQueue", isServer, hydrationQueue);

  // React.useEffect(() => {
  //   if (hydrationQueue) {
  //     hydrate(client, { queries: hydrationQueue }, optionsRef.current);
  //     setHydrationQueue(undefined);
  //   }
  // }, [client, hydrationQueue]);

  return children;
};

const HydrationBoundary = ({ children }) => {
  return (
    <QueryHydrationBoundary state={dehydrate(global.queryClient)}>
      {children}
      {/* <JotaiHydrationBoundary state={Object.fromEntries(global.cacheStore)}>
      </JotaiHydrationBoundary> */}
    </QueryHydrationBoundary>
  );
};

export default HydrationBoundary;
