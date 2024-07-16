import Head from "next/head";
import { atom, useAtomValue } from "jotai";
import { atomFamily } from "jotai/utils";
import _ from "lodash";
import { useQuery, QueryClient, dehydrate } from "@tanstack/react-query";

// state
// const PostState = atomFamily(({ _id }) => atom(), _.isEqual);

// query
const queryFn = ({ postId }) =>
  fetch("https://jsonplaceholder.typicode.com/posts/" + postId).then(
    (response) => response.json()
  );
const queryKey = ["getPosts"];
const useGetPosts = (queryParams) => {
  const query = useQuery({
    queryKey: queryKey,
    queryFn: () => queryFn(queryParams),
  });
  return query;
};

export async function getStaticProps() {
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

  return {
    props: {
      dehydratedQueryState: dehydrate(queryClient),
    },
  };
}

export default function Home() {
  const { data: post, isLoading } = useGetPosts({ postId: 1 });

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
