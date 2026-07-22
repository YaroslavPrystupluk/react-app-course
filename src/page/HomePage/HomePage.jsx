import { useEffect, useMemo, useState } from "react";
import { QuestionCard } from "../../components/QuestionCard";
import { API_URL } from "../../constans/index.js";
import { useFetch } from "../../hooks/useFetch.jsx";
import { QuestionsCardList } from "../../components/QuestionsCardList";
import { Loader } from "../../components/Loader";
import { SearchInput } from "../../components/SearchInput";
import { SortSelect } from "../../components/SortSelect";
import { DEFAULT_PER_PAGE } from "../../constants/constants.jsx";

import s from "./index.module.css";

const HomePage = () => {
  const [searchParams, setSearchParams] = useState(
    `?_page=1&_per_page=${DEFAULT_PER_PAGE}`,
  );
  const [questions, setQuestions] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [sortSelectValue, setSortSelectValue] = useState("");

  const [geQquestions, isLoading, error] = useFetch(async (url) => {
    const response = await fetch(`${API_URL}/${url}`);
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const questions = await response.json();

    setQuestions(questions);
    return questions;
  });

  useEffect(() => {
    geQquestions(
      `react${searchParams}&${sortSelectValue}&question:contains=${searchValue}`,
    );
  }, [sortSelectValue, searchValue, searchParams]);

  // const cards = useMemo(() => {
  //   return questions.filter((card) =>
  //     card.question.toLowerCase().includes(searchValue.toLowerCase().trim()),
  //   );
  // }, [questions, searchValue]);

  console.log(questions);

  const onSearchChangeHandler = (e) => {
    setSearchValue(e.target.value);
    searchParams(`?_page=1&_per_page=${DEFAULT_PER_PAGE}&${e.target.value}`);
  };

  const onSortSelectChangeHandler = (e) => {
    setSortSelectValue(e.target.value);
    searchParams(`?_page=1&_per_page=${DEFAULT_PER_PAGE}&${e.target.value}`);
  };

  return (
    <>
      <div className={s.controlContainer}>
        <SearchInput value={searchValue} onChange={onSearchChangeHandler} />
        <SortSelect
          value={sortSelectValue}
          onChange={onSortSelectChangeHandler}
        />
      </div>
      {isLoading && <Loader />}
      {error && <p>Error: {error}</p>}
      {!isLoading && questions?.length === 0 && (
        <p className={s.noCardsInfo}>No cards...</p>
      )}
      <QuestionsCardList cards={questions?.data} />
    </>
  );
};

export default HomePage;
