import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import PostPage from "./PostPage";
import { queryKey, queryFn, setStateCallback } from "./useGetPosts";
import JotaiHydrationBoundary from "./JotaiHydrationBoundary";

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

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => queryFn({ postId: 1 }),
  });
  const post = queryClient.getQueryData(queryKey);
  setStateCallback(global.store.get, global.store.set, post);

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <JotaiHydrationBoundary
          state={Object.fromEntries(global.cacheStore)}
          queryClient={dehydrate(queryClient)}
        >
          <PostPage />
        </JotaiHydrationBoundary>
      </HydrationBoundary>
    </main>
  );
}
