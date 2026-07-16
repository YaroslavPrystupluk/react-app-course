import { useEffect, useState } from "react";
import { QuestionCard } from "../../components/QuestionCard";
import { API_URL } from "../../constans/index.js";
import { useFetch } from "../../hooks/useFetch.jsx";
import { QuestionsCardList } from "../../components/QuestionsCardList";
import { Loader } from "../../components/Loader";
import { SearchInput } from "../../components/SearchInput";

import s from "./index.module.css";

const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  const [searchValue, setSearchValue] = useState("");

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
    geQquestions("react");
  }, []);

  const onSearchChangeHandler = (e) => {
    const searchValue = e.target.value;
    setSearchValue(searchValue);
  };

  return (
    <>
      <div className={s.controlContainer}>
        <SearchInput value={searchValue} onChange={onSearchChangeHandler} />
      </div>
      {isLoading && <Loader />}
      {error && <p>Error: {error}</p>}
      <QuestionsCardList cards={questions} />
    </>
  );
};

export default HomePage;
