import {Button} from "../Button/index.jsx";

import s from './index.module.css';

const QuestionForm = ({formState, formAction, isPending, submitBtnText}) => {
    return (

            <form action={formAction} className={s.form} >
                <div className={s.formControl}>
                    <label htmlFor="questuinField">Question: </label>
                    <textarea
                        defaultValue={formState.question}
                        name="question"
                        id="questuinField"
                        cols="30"
                        rows="2"
                        required
                        placeholder="please enter a question"
                    ></textarea>
                </div>

                <div className={s.formControl}>
                    <label htmlFor="answerField">Short answer: </label>
                    <textarea
                        defaultValue={formState.answer}
                        name="answer"
                        id="answerField"
                        cols="30"
                        rows="2"
                        required
                        placeholder="please enter a short answer"
                    ></textarea>
                </div>

                <div className={s.formControl}>
                    <label htmlFor="descriptionField">Description: </label>
                    <textarea
                        defaultValue={formState.description}
                        name="description"
                        id="descriptionField"
                        cols="30"
                        rows="5"
                        required
                        placeholder="please enter a full description"
                    ></textarea>
                </div>
                <div className={s.formControl}>
                    <label htmlFor="resourcesField">Resources: </label>
                    <textarea
                        defaultValue={formState.resources}
                        name="resources"
                        id="resourcesField"
                        cols="30"
                        rows="2"
                        required
                        placeholder="please enter resources separated by commas"
                    ></textarea>
                </div>
                <div className={s.formControl}>
                    <label htmlFor="levelField">Level: </label>
                    <select name="level" id="levelField" defaultValue={formState.level}>
                        <option value="" disabled>
                            Question level
                        </option>
                        <hr />
                        <option value="1">1 - easiest</option>
                        <option value="2">2 - medium</option>
                        <option value="3">3 - hardest</option>
                    </select>
                </div>

                <label htmlFor="clearFormField" className={s.clearFormControl}>
                    <input className={s.checkbox} type="checkbox" name="clearForm" id="clearFormField" defaultChecked={true} />
                    <span>clear form after submitting?</span>
                </label>
                <Button disabled={isPending}>{submitBtnText}</Button>
            </form>
    );
};

export default QuestionForm;