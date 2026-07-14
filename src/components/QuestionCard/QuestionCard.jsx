import { Button } from "../Button/index.jsx";
import { useNavigate } from "react-router-dom";

import s from "./index.module.css";

const QuestionCard = ({ card }) => {
  const navigate = useNavigate();

  return (
    <div className={s.card}>
      <div className={s.cardLabels}>
        <div>level: {card.level}</div>
        <div>{card.completed ? "Completed" : "Not completed"}</div>
      </div>
      <h5 className={s.cardTitle}>{card.question}</h5>
      <div className={s.cardAnswers}>
        <label>short answer: </label>
        <p className={s.cardAnswer}>{card.answer}</p>
      </div>
      <Button onClick={() => navigate(`/question/${card.id}`)}>View</Button>
    </div>
  );
};

export default QuestionCard;
