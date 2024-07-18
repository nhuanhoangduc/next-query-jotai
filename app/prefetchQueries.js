"use server";

const prefetchQueries = async (queryClient, useQueries) => {
  await Promise.all(
    useQueries.map(async (useQuery) => {
      const { queryKey, queryFn, setStateCallback } = useQuery;
      await queryClient.prefetchQuery({
        queryKey,
        queryFn,
      });
      const res = queryClient.getQueryData(queryKey);
      setStateCallback(global.store.get, global.store.set, res);
    })
  );
};

export default prefetchQueries;
