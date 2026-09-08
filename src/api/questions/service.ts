import type { CardsSearchParams, QuestionCardDataType } from "../../types/global.types";
import { instance } from "../axios";

export const questionsApiService = {
  getListCards: async (params: CardsSearchParams, signal?: AbortSignal): Promise<QuestionCardDataType> => {
    const query = new URLSearchParams();
    if (params.page) query.set("_page", String(params.page));
    if (params.perPage) query.set("_per_page", String(params.perPage));
    if (params.sort) query.set("_sort", params.sort);
    if (params.search) query.set("question:contains", params.search);

    const x = await instance.get(`react?${query.toString()}`, { signal });
    return x.data;
  },
};
