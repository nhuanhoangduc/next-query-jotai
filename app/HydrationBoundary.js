import {
  dehydrate,
  HydrationBoundary as QueryHydrationBoundary,
} from "@tanstack/react-query";

const HydrationBoundary = ({ children }) => {
  return (
    <main>
      <QueryHydrationBoundary state={dehydrate(queryClient)}>
        {children}
      </QueryHydrationBoundary>
    </main>
  );
};

export default HydrationBoundary;
