"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createStore, Provider } from "jotai";
import _ from "lodash";

global.store = createStore();
global.queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // With SSR, we usually want to set some default staleTime
      // above 0 to avoid refetching immediately on the client
      staleTime: 60 * 1000,
    },
  },
});

const AppProviders = ({ children }) => {
  return (
    <QueryClientProvider client={global.queryClient}>
      <Provider store={global.store}>{children}</Provider>
    </QueryClientProvider>
  );
};

export default AppProviders;
