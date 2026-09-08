import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { questionsApiService } from "./service";
import { useCardsSearchParams } from "../../page/HomePage/constants";
import type { CardsSearchParams, QuestionCardStateType } from "../../types/global.types";

export const questionKey = {
  getListCards: (params: CardsSearchParams) => ["cards", params],
  getCard: (id: string) => ["card", id],
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

const getCardOptions = (id: string) =>
  queryOptions({
    queryKey: questionKey.getCard(id),
    queryFn: () => questionsApiService.getCard(id),
  });

export const useGetCard = (id: string) => useQuery(getCardOptions(id));

export const useCreateCard = () =>
  useMutation({
    mutationFn: (data: Partial<QuestionCardStateType>) => questionsApiService.createCard(data),
  });

export const useEditCard = () =>
  useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => questionsApiService.editCard(id, data),
  });

export const useDeleteCard = () =>
  useMutation({
    mutationFn: (id: string) => questionsApiService.deleteCard(id),
  });
