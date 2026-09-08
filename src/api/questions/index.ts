import { queryOptions, useQuery } from "@tanstack/react-query";
import { questionsApiService } from "./service";
import { useCardsSearchParams } from "../../page/HomePage/constants";
import type { CardsSearchParams } from "../../types/global.types";

export const questionKey = {
  getListCards: (params: CardsSearchParams) => ["cards", params],
};

export const getListCardsOptions = (params: CardsSearchParams) =>
  queryOptions({
    queryKey: questionKey.getListCards(params),
    queryFn: ({ signal }) => questionsApiService.getListCards(params, signal),
  });

export const useGetlistCards = () => {
  const [params] = useCardsSearchParams();
  return useQuery(getListCardsOptions(params));
};
