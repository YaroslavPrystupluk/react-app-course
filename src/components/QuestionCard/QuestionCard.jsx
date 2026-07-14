import s from "./index.module.css";
import {Button} from "../Button/index.jsx";

const QuestionCard = () => {
    return (
        <div className={s.card}>
            <div className={s.cardLabels}>
                <div>level: 1</div>
                <div>Not Completed</div>
            </div>
            <h5 className={s.cardTitle}>Що таке JSX?</h5>
            <div className={s.cardAnswers}>
                <label>short answer: </label>
                <p className={s.cardAnswer}>Dive in and learn React.js from scratch! Learn React, Hooks, Redux, React Router, Next.js, Best Practices and way more!</p>
            </div>
            <Button onClick={() => {}}>View</Button>
        </div>
    );
};

export default QuestionCard;