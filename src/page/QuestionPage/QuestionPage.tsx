import { useEffect, useId, useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { useFetch } from "../../hooks/useFetch";
import { API_URL } from "../../constants/global.constants";
import { Loader } from "../../components/Loader";
import { SmallLoader } from "../../components/SmallLoader";
import { useAuth } from "../../hooks/useAuth";

import s from "./index.module.css";
import type { QuestionCardType } from "../../types/global.types";

const QuestionPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const checkboxId = useId();
  const [card, setCard] = useState<QuestionCardType>();
  const { isAuth } = useAuth();

  const [fetchCard, isLoading] = useFetch(async () => {
    const response = await fetch(`${API_URL}/react/${id}`);
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();

    setCard(data);
  });

  const [updateCard, updateCardIsLoading] = useFetch(async (isChecked) => {
    const response = await fetch(`${API_URL}/react/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ completed: isChecked }),
    });
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();
    setCard(data);
  });

  useEffect(() => {
    fetchCard();
  }, []);

  const levelVariant = () => (card?.level === 1 ? "primary" : card?.level === 2 ? "success" : "alert");
  const completedVariant = () => (card?.completed ? "success" : "primary");

  const onCheckboxChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setCard((prev) => ({ ...prev, completed: checked }));
    updateCard(checked);
  };

  return (
    <>
      {isLoading && <Loader />}
      {card && (
        <div className={s.card}>
          <div className={s.cardLabels}>
            <Badge variant={levelVariant()}>level: {card.level}</Badge>
            <Badge variant={completedVariant()}>{card.completed ? "Completed" : "Not completed"}</Badge>
            {card?.editDate && <p className={s.editDate}>Edited: {card.editDate}</p>}
          </div>
          <h5 className={s.cardTitle}>{card.question}</h5>
          <h5 className={s.cardDescription}>{card.description}</h5>
          <div className={s.cardAnswers}>
            <label>short answer: </label>
            <p className={s.cardAnswer}>{card.answer}</p>
          </div>

          <ul className={s.cardLinks}>
            Resources:
            {card.resources?.map((resourse, index) => (
              <li className={s.cardLink} key={index}>
                <a href={resourse.trim()} target="_blank" rel="noreferrer">
                  {card.resources}
                </a>
              </li>
            ))}
          </ul>
          <label htmlFor={checkboxId} className={s.cardCheckbox}>
            <input
              className={s.checkbox}
              type="checkbox"
              id={checkboxId}
              onChange={onCheckboxChangeHandler}
              checked={card.completed}
              disabled={isLoading || updateCardIsLoading}
            />
            <span>mark question as completed</span>
            {updateCardIsLoading && <SmallLoader />}
          </label>
          {isAuth && (
            <Button onClick={() => navigate(`/editquestion/${card.id}`)} isDisabled={isLoading || updateCardIsLoading}>
              Edit Question
            </Button>
          )}
          <Button onClick={() => navigate(`/editquestion/${card.id}`)} isDisabled={isLoading || updateCardIsLoading}>
            Back
          </Button>
        </div>
      )}
    </>
  );
};

export default QuestionPage;
