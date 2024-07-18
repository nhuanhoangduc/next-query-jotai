import { useAtomCallback } from "jotai/utils";
import _ from "lodash";
import { useQuery } from "@tanstack/react-query";

import { PostState } from "./state";

// export query key
export const queryKey = ["getPosts"];

// export query function
export const queryFn = ({ postId }) =>
  fetch("https://jsonplaceholder.typicode.com/posts/" + postId).then(
    (response) => response.json()
  );

// export set state callback
export const setStateCallback = (get, set, post) => {
  set(PostState({ _id: post.id }), post);
};

export const useGetPosts = (queryParams) => {
  const setPostState = useAtomCallback(setStateCallback);

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

export default useGetPosts;
