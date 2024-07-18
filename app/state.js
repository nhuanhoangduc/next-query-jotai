import { atomFamily } from "jotai/utils";
import _ from "lodash";

import atomNext from "./atomNext";

export const PostState = atomFamily(
  ({ _id }) => atomNext({}, `PostState_${_id}`),
  _.isEqual
);
