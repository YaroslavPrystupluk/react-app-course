import { useEffect, useMemo, useState } from "react";
import { QuestionCard } from "../../components/QuestionCard";
import { API_URL } from "../../constans/index.js";
import { useFetch } from "../../hooks/useFetch.jsx";
import { QuestionsCardList } from "../../components/QuestionsCardList";
import { Loader } from "../../components/Loader";
import { SearchInput } from "../../components/SearchInput";
import { SortSelect } from "../../components/SortSelect";

import s from "./index.module.css";

const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortSelectValue, setSortSelectValue] = useState("");

  const [geQquestions, isLoading, error] = useFetch(async (url) => {
    const response = await fetch(`${API_URL}/${url}?${sortSelectValue}`);
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const questions = await response.json();

    setQuestions(questions);
    return questions;
  });

  useEffect(() => {
    geQquestions(`react?${sortSelectValue}&question:contains=${searchValue}`);
  }, [sortSelectValue, searchValue]);

  const cards = useMemo(() => {
    return questions.filter((card) =>
      card.question.toLowerCase().includes(searchValue.toLowerCase().trim()),
    );
  }, [questions, searchValue]);

  const onSearchChangeHandler = (e) => {
    const searchValue = e.target.value;
    setSearchValue(searchValue);
  };

  const onSortSelectChangeHandler = (e) => {
    const searchValue = e.target.value;
    setSortSelectValue(searchValue);
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
      {!isLoading && cards.length === 0 && (
        <p className={s.noCardsInfo}>No cards...</p>
      )}
      <QuestionsCardList cards={questions} />
    </>
  );
};

export default HomePage;
