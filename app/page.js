import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import Posts from "./posts";
import { queryKey, queryFn } from "./useGetPosts";

export default async function Home() {
  await global.queryClient.prefetchQuery({
    queryKey,
    queryFn,
  });

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Posts />
      </HydrationBoundary>
    </main>
  );
}
