import {
  dehydrate,
  HydrationBoundary as QueryHydrationBoundary,
} from "@tanstack/react-query";

const HydrationBoundary = ({ children }) => {
  return (
    <main>
      {/* react query hydration boundary */}
      <QueryHydrationBoundary state={dehydrate(global.queryClient)}>
        {children}
      </QueryHydrationBoundary>
    </main>
  );
};

export default HydrationBoundary;
