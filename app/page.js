import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Posts from "./posts";
import { queryKey, queryFn, setStateCallback } from "./useGetPosts";

export default async function Home() {
  await global.queryClient.prefetchQuery({
    queryKey,
    queryFn: () => queryFn({ postId: 1 }),
  });

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Posts />
      </HydrationBoundary>
    </main>
  );
}
