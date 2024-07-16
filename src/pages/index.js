import Head from "next/head";
import { atom, useAtomValue } from "jotai";
import { atomFamily } from "jotai/utils";
import _ from "lodash";

const PostState = atomFamily(
  (_id) => atom({ title: "iOS 18 could ‘sherlock’ $400M in app revenue" }),
  _.isEqual
);

export default function Home() {
  const post = useAtomValue(PostState(1));

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <main>
        <h1>{post.title}</h1>
      </main>
    </>
  );
}
