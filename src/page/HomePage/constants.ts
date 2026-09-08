import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

export const searchParamsConfig = {
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  sort: parseAsString.withDefault(""),
  search: parseAsString.withDefault("").withOptions({
    history: "push",
    limitUrlUpdates: { method: "debounce", timeMs: 400 },
  }),
};

export const useCardsSearchParams = () => {
  return useQueryStates(searchParamsConfig, {
    urlKeys: {
      page: "_page",
      perPage: "_per_page",
      sort: "_sort",
      search: "question:contains",
    },
    history: "push",
  });
};
