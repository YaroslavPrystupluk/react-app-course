import type { FC } from "react";
import { QuestionCard } from "../QuestionCard";
import type { QuestionCardType } from "../../types/global.types";

import s from "./index.module.css";

type Props = {
  cards: QuestionCardType[];
};

const QuestionsCardList: FC<Props> = ({ cards }) => {
  return (
    <div className={s.cardList}>
      {cards?.map((card) => (
        <QuestionCard card={card} key={card.id} />
      ))}
    </div>
  );
};

export default QuestionsCardList;
