import { useActionState } from "react";
import { Button } from "../../components/Button";
import s from "./index.module.css";
import { toast } from "react-toastify";
import { delayFn } from "../../helper/delayFn";
import { API_URL } from "../../constants";

const createQuestionAction = async (_prevState, formdata) => {
  try {
    delayFn();
    const newLevel = formdata.get("level");
    const isClearForm = formdata.get("clearForm");
    const newResources = formdata.get("resources").split(",");
    const newQuestion = {
      ...Object.fromEntries(formdata),
      resources: newResources,
      level: Number(newLevel),
      completed: false,
      editDate: undefined,
    };

    const responce = await fetch(`${API_URL}/react`, {
      method: "POST",
      body: JSON.stringify(newQuestion),
    });

    const question = await responce.json();
    toast.success("New question is successfully");
    return isClearForm ? {} : question;
  } catch (error) {
    toast.error(error.message);
  }
};

const AddQuestionPage = () => {
  const [formState, formAction, isPending] = useActionState(createQuestionAction, { clearForm: false });
  return (
    <>
      <h1 className={s.formTitle}>Add new question</h1>
      <div className={s.formContainer}>
        <form action={formAction} className={s.form} disabled={isPending}>
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
            <label htmlFor="answerField">Short ansver: </label>
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
          <Button disabled={isPending}>Add question</Button>
        </form>
      </div>
    </>
  );
};

export default AddQuestionPage;
