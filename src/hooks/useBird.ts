import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import Bird from "../entities/Bird";

const apiClient = new APIClient<Bird>("/birds");

const useBird = (id: string) =>
  useQuery({
    queryKey: ["birds", id],
    queryFn: () => apiClient.get(id),
  });

export default useBird;
