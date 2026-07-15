import { QuestionCard } from "../QuestionCard";

import s from "./index.module.css";

const QuestionsCardList = ({ cards }) => {
  return (
    <div className={s.cardList}>
      {cards.map((card) => (
        <QuestionCard card={card} key={card.id} />
      ))}
    </div>
  );
};

export default QuestionsCardList;
