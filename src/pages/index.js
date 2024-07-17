import Head from "next/head";
import { useAtomValue, createStore } from "jotai";
import { atomFamily, useAtomCallback } from "jotai/utils";
import _ from "lodash";
import { useQuery, QueryClient, dehydrate } from "@tanstack/react-query";

import atomNext from "./atomNext";

// state
const PostState = atomFamily(
  ({ _id }) => atomNext({}, `PostState_${_id}`),
  _.isEqual
);
const setPostCallback = (get, set, post) => {
  set(PostState({ _id: post.id }), post);
};

// query
const queryFn = ({ postId }) =>
  fetch("https://jsonplaceholder.typicode.com/posts/" + postId).then(
    (response) => response.json()
  );
const queryKey = ["getPosts"];
const useGetPosts = (queryParams) => {
  const setPostState = useAtomCallback(setPostCallback);

  const query = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const res = await queryFn(queryParams);
      setPostState(res);
      return res;
    },
  });
  return query;
};

export async function getStaticProps(context) {
  const store = createStore();
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
    queryKey: queryKey,
    queryFn: () => queryFn({ postId: 1 }),
  });
  const post = queryClient.getQueryData(queryKey);
  setPostCallback(store.get, store.set, post);

  console.log(global.cacheStore);

  return {
    props: {
      dehydratedQueryState: dehydrate(queryClient),
      dehydratedState: {},
    },
  };
}

export default function Home() {
  const postId = 1;
  const { isLoading } = useGetPosts({ postId });
  const post = useAtomValue(PostState({ _id: postId }));

  if (isLoading) return "Loading....";
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <main>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </main>
    </>
  );
}
