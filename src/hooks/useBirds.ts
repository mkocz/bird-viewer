import APIClient, { FetchResponse } from "../services/api-client";
import { useInfiniteQuery } from "@tanstack/react-query";
import ms from "ms";
import useBirdQueryStore from "../store";
import Bird from "../entities/Bird";

const apiClient = new APIClient<Bird>("/v2/birds");

const useBirds = () => {
  const birdQuery = useBirdQueryStore((s) => s.birdQuery);
  return useInfiniteQuery<FetchResponse<Bird>, Error>({
    queryKey: ["birds", birdQuery],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({
        params: {
          family: birdQuery.family,
          region: birdQuery.region,
          order: birdQuery.order,
          page: pageParam,
        },
      }),
    staleTime: ms("24h"),
    getNextPageParam: (lastPage) => {
      const { page, total } = lastPage;
      return page < total / 25 ? page + 1 : undefined;
    },
  });
};

export default useBirds;
