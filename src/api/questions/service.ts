import type { CardsSearchParams, QuestionCardDataType, QuestionCardStateType, QuestionCardType } from "../../types/global.types";
import { instance } from "../axios";

export const questionsApiService = {
  getListCards: async (params: CardsSearchParams, signal?: AbortSignal): Promise<QuestionCardDataType> => {
    const query = new URLSearchParams();
    if (params.page) query.set("_page", String(params.page));
    if (params.perPage) query.set("_per_page", String(params.perPage));
    if (params.sort) query.set("_sort", params.sort);
    if (params.search) query.set("question:contains", params.search);

    const result = await instance.get(`react?${query.toString()}`, { signal });
    return result.data;
  },

  getCard: async (id: string) => {
    const result = await instance.get(`react/${id}`);
    return result.data;
  },

  editCard: async (id: string, data: FormData): Promise<QuestionCardType> => {
    const result = await instance.post(`react/${id}`, { data });
    return result.data;
  },

  deleteCard: async (id: string): Promise<Partial<QuestionCardStateType>> => {
    const result = await instance.delete(`react/${id}`);
    return result.data;
  },
};
