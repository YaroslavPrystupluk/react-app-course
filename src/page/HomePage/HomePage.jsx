import { useEffect, useMemo, useRef, useState } from "react";
import { API_URL } from "../../constants/global.constants.js";
import { useFetch } from "../../hooks/useFetch.ts";
import { QuestionsCardList } from "../../components/QuestionsCardList";
import { Loader } from "../../components/Loader";
import { SearchInput } from "../../components/SearchInput";
import { Button } from "../../components/Button";
import { SortSelect } from "../../components/SortSelect";
import { CountSelect } from "../../components/CountSelect";
import { DEFAULT_PER_PAGE } from "../../constants/global.constants.js";

import s from "./index.module.css";

const HomePage = () => {
  const [searchParams, setSearchParams] = useState(`?_page=1&_per_page=${DEFAULT_PER_PAGE}`);
  const [questions, setQuestions] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [sortSelectValue, setSortSelectValue] = useState("");
  const [countSelectValue, setCountSelectValue] = useState("");
  const controlContainerRef = useRef();

  const getActivePageNumber = () => (questions?.next === null ? questions?.last : questions?.next - 1);

  const [getQuestions, isLoading, error] = useFetch(async (url) => {
    const response = await fetch(`${API_URL}/${url}`);
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const questions = await response.json();

    setQuestions(questions);
    return questions;
  });

  useEffect(() => {
    getQuestions(`react${searchParams}&${sortSelectValue}&question:contains=${searchValue}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortSelectValue, searchValue, searchParams]);

  const pagination = useMemo(() => {
    const totalCardCount = questions?.pages || 0;
    return Array(totalCardCount)
      .fill(0)
      .map((_, i) => i + 1);
  }, [questions]);

  const onSearchChangeHandler = (e) => {
    setSearchValue(e.target.value);
    setSearchParams(`?_page=1&_per_page=${countSelectValue}&${e.target.value}`);
  };

  const onSortSelectChangeHandler = (e) => {
    setSortSelectValue(e.target.value);
    setSearchParams(`?_page=1&_per_page=${countSelectValue}&${e.target.value}`);
  };

  const onCountSelectChangeHandler = (e) => {
    setCountSelectValue(e.target.value);
    setSearchParams(`?_page=1&_per_page=${e.target.value}&${sortSelectValue}`);
  };

  const paginationHandler = (e) => {
    if (e.target.tagName === "BUTTON") {
      setSearchParams(`?_page=${e.target.textContent}&_per_page=${countSelectValue}&${sortSelectValue}`);
      controlContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className={s.controlContainer} ref={controlContainerRef}>
        <SearchInput value={searchValue} onChange={onSearchChangeHandler} />
        <SortSelect value={sortSelectValue} onChange={onSortSelectChangeHandler} />
        <CountSelect value={countSelectValue} onChange={onCountSelectChangeHandler} />
      </div>
      {isLoading && <Loader />}
      {error && <p>Error: {error}</p>}

      <QuestionsCardList cards={questions?.data} />

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
