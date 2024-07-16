import { useState } from "react";
import { createStore, Provider } from "jotai";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const myStore = createStore();

export default function App({ Component, pageProps }) {
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

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps?.dehydratedQueryState}>
        <Provider store={myStore}>
          <Component {...pageProps} />
        </Provider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
