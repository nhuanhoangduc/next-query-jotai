import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Posts from "./posts";
import { queryKey, queryFn, setStateCallback } from "./useGetPosts";
import { PostState } from "./state";

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
        <Posts />
      </HydrationBoundary>
    </main>
  );
}
