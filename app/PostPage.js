"use client";

import Head from "next/head";
import { useAtomValue } from "jotai";

import { PostState } from "./state";
import useGetPosts from "./useGetPosts";

export default function PostPage() {
  const postId = 1;
  const { isLoading } = useGetPosts({ postId });
  const post = useAtomValue(PostState({ _id: postId }));

  if (isLoading) return "Loading....";
  if (!post) return;
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
