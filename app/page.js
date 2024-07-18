import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import PostPage from "./PostPage";
import { queryKey, queryFn, setStateCallback } from "./useGetPosts";
import { PostState } from "./state";
import { JotaiHydrationBoundary } from "./HydrationBoundary";

export default async function Home() {
  await global.queryClient.prefetchQuery({
    queryKey,
    queryFn: () => queryFn({ postId: 1 }),
  });

  setStateCallback(global.store.get, global.store.set, {
    userId: 1,
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body:
      "quia et suscipit\n" +
      "suscipit recusandae consequuntur expedita et cum\n" +
      "reprehenderit molestiae ut ut quas totam\n" +
      "nostrum rerum est autem sunt rem eveniet architecto",
  });

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
