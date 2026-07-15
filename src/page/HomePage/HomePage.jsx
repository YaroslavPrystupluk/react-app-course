import { QuestionCard } from "../../components/QuestionCard";
import {API_URL} from "../../constans/index.js";
import {useFetch} from "../../hooks/useFetch.jsx";
import {QuestionsCardList} from "../../components/QuestionsCardList";

import s from "./index.module.css";

const HomePage = () => {
  const {data: cards, loading, error } = useFetch(`${API_URL}/react`);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      HomePage
      <QuestionsCardList cards={cards} />
    </>
  );
};

export default HomePage;
