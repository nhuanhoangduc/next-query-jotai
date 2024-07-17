import { useState, useLayoutEffect, useMemo } from "react";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Provider, createStore } from "jotai";
import _ from "lodash";

global.store = createStore();

export default function App({ Component, pageProps }) {
  // init query client
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      })
  );

  // hydrate cache store
  useMemo(() => {
    if (_.isObject(pageProps.dehydratedCacheStore)) {
      global.cacheStore = new Map(
        Object.entries(pageProps.dehydratedCacheStore)
      );
    }
    return null;
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps?.dehydratedQueryState}>
        <Provider store={global.store}>
          <Component {...pageProps} />
        </Provider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
