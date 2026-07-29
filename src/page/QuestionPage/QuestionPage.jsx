import { useNavigate } from "react-router-dom";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";

import s from "./index.module.css";

const card = {};

const QuestionPage = () => {
  const navigate = useNavigate();

  const levelVariant = card.level === 1 ? "primary" : card.level === 2 ? "success" : "alert";
  const completedVariant = card.completed ? "success" : "primary";

  return (
    <div className={s.card}>
      <div className={s.cardLabels}>
        <Badge variant={levelVariant}>level: {card.level}</Badge>
        <Badge variant={completedVariant}>{card.completed ? "Completed" : "Not completed"}</Badge>
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

export default QuestionPage;
