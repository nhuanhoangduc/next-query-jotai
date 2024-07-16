import Head from "next/head";
import { atom, useAtomValue } from "jotai";
import { atomFamily } from "jotai/utils";
import _ from "lodash";
import { useQuery } from "@tanstack/react-query";

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
