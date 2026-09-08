import { useMemo, useRef, type ChangeEvent, type FC, type MouseEvent } from "react";
import { QuestionsCardList } from "../../components/QuestionsCardList";
import { Loader } from "../../components/Loader";
import { SearchInput } from "../../components/SearchInput";
import { Button } from "../../components/Button";
import { SortSelect } from "../../components/SortSelect";
import { CountSelect } from "../../components/CountSelect";
import { useGetlistCards } from "../../api/questions";
import { useCardsSearchParams } from "./constants";
import s from "./index.module.css";

const HomePage: FC = () => {
  const controlContainerRef = useRef<HTMLDivElement | null>(null);
  const [{ perPage, sort, search }, setSearchParams] = useCardsSearchParams();
  const { data: questions, isPending, isError, error } = useGetlistCards();

  const getActivePageNumber = (): number | null => {
    if (!questions) return null;
    return questions.next === null ? questions.last : questions.next - 1;
  };

  const pagination = useMemo(() => {
    const totalCardCount = questions?.pages || 0;
    return Array(totalCardCount)
      .fill(0)
      .map((_, i) => i + 1);
  }, [questions]);

  const onSearchChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchParams({ search: e.target.value || null });
  };

  const onSortSelectChangeHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
    setSearchParams({ sort: e.target.value || null, page: 1 });
  };

  const onCountSelectChangeHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
    setSearchParams({ page: 1, perPage: Number(e.target.value) || null });
  };

  const paginationHandler = (e: MouseEvent<HTMLDivElement>): void => {
    const targetElement = e.target as HTMLElement;
    if (targetElement.tagName === "BUTTON") {
      setSearchParams({ page: Number(targetElement.textContent) || null, perPage, search });
      controlContainerRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className={s.controlContainer} ref={controlContainerRef}>
        <SearchInput value={search} onChange={onSearchChangeHandler} />
        <SortSelect value={sort} onChange={onSortSelectChangeHandler} />
        <CountSelect value={String(perPage)} onChange={onCountSelectChangeHandler} />
      </div>
      {isPending && <Loader />}
      {isError && <p>Error: {error.message}</p>}

      <QuestionsCardList cards={questions?.data ?? []} />

      {questions?.data?.length === 0 ? (
        <p className={s.noCardsInfo}>No cards...</p>
      ) : (
        pagination.length > 1 && (
          <div className={s.paginationContainer} onClick={paginationHandler}>
            {pagination.map((value) => (
              <Button key={value} isActive={value === getActivePageNumber()}>
                {value}
              </Button>
            ))}
          </div>
        )
      )}
    </>
  );
};

export default HomePage;
