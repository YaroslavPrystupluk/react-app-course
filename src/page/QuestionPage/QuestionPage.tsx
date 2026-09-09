import { useId, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Loader } from "../../components/Loader";
import { SmallLoader } from "../../components/SmallLoader";
import { useAuth } from "../../hooks/useAuth";

import s from "./index.module.css";
import { useEditCard, useGetCard } from "../../api/questions";

const QuestionPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const checkboxId = useId();
  const { isAuth } = useAuth();

  const { data: card, isPending } = useGetCard(id ?? "");
  const updateChrckedMutation = useEditCard();

  const levelVariant = () => (card?.level === 1 ? "primary" : card?.level === 2 ? "success" : "alert");
  const completedVariant = () => (card?.completed ? "success" : "primary");

  const onCheckboxChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!id) return;
    const checked = e.target.checked;
    updateChrckedMutation.mutate({ id, data: { completed: checked } });
  };

  return (
    <>
      {isPending && <Loader />}
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
              disabled={isPending || updateChrckedMutation.isPending}
            />
            <span>mark question as completed</span>
            {updateChrckedMutation.isPending && <SmallLoader />}
          </label>
          {isAuth && (
            <Button
              onClick={() => navigate(`/editquestion/${card.id}`)}
              isDisabled={isPending || updateChrckedMutation.isPending}
            >
              Edit Question
            </Button>
          )}
          <Button onClick={() => navigate(`/editquestion/${card.id}`)} isDisabled={isPending || updateChrckedMutation.isPending}>
            Back
          </Button>
        </div>
      )}
    </>
  );
};

export default QuestionPage;
