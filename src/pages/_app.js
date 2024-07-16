import { useState } from "react";
import { createStore, Provider } from "jotai";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const myStore = createStore();

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

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
