import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { questionsApiService } from "./service";
import { useCardsSearchParams } from "../../page/HomePage/constants";
import type { CardsSearchParams, QuestionCardStateType } from "../../types/global.types";
import { toast } from "react-toastify";

export const questionKey = {
  getCards: () => ["cards"],
  getListCards: (params: CardsSearchParams) => ["cards", params],
  getCard: (id: string) => ["cards", id],
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

export const useEditCard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<QuestionCardStateType> }) => questionsApiService.editCard(id, data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: questionKey.getCards() });

      const prevCard = await queryClient.getQueriesData({ queryKey: questionKey.getCards() });

      queryClient.setQueryData(questionKey.getCards(), (oldData: Partial<QuestionCardStateType>) => [{ ...oldData, ...data }]);
      return { prevCard };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(questionKey.getCards(), (old: QuestionCardStateType) => ({
        ...old,
        ...data, // мерджимо відповідь сервера, а не замінюємо весь об'єкт
      }));
      toast.success("Question updated successfully");
    },
    onError: (error: unknown, _, context) => {
      if (context?.prevCard) {
        queryClient.setQueryData(questionKey.getCards(), context.prevCard);
      }
      const message = error instanceof Error ? error.message : "Something went wrong while updating the question";
      toast.error(message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: questionKey.getCards() });
    },
  });
};

export const useDeleteCard = () =>
  useMutation({
    mutationFn: (id: string) => questionsApiService.deleteCard(id),
  });
