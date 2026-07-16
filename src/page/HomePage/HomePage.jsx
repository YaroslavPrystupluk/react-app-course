import { useEffect, useState } from "react";
import { QuestionCard } from "../../components/QuestionCard";
import { API_URL } from "../../constans/index.js";
import { useFetch } from "../../hooks/useFetch.jsx";
import { QuestionsCardList } from "../../components/QuestionsCardList";
import { Loader } from "../../components/Loader";

import s from "./index.module.css";

const HomePage = () => {
  const [questions, setQuestions] = useState([]);
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

  return (
    <>
      {isLoading && <Loader />}
      {error && <p>Error: {error}</p>}
      <QuestionsCardList cards={questions} />
    </>
  );
};

export default HomePage;
