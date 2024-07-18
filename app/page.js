import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQueries,
} from "@tanstack/react-query";
import PostPage from "./PostPage";
// import { queryKey, queryFn, setStateCallback } from "./useGetPosts";
import JotaiHydrationBoundary from "./JotaiHydrationBoundary";
import prefetchQueries from "./prefetchQueries";
import * as useGetPosts from "./useGetPosts";

export default async function Home() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });
  await prefetchQueries(queryClient, [useGetPosts]);

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <JotaiHydrationBoundary state={Object.fromEntries(global.cacheStore)}>
          <PostPage />
        </JotaiHydrationBoundary>
      </HydrationBoundary>
    </main>
  );
}
