import { useActionState } from "react";
import { QuestionForm } from "../../components/QuestionForm";
import { Loader } from "../../components/Loader";
import { delayFn } from "../../helper/delayFn";
import { API_URL } from "../../constants";
import { toast } from "react-toastify";

import s from "./index.module.css";
import { dateFormat } from "../../helper/dateFormat";

const editQuestionAction = async (_prevState, formData) => {
  try {
    await delayFn();
    const newLevel = formData.get("level");
    const isClearForm = formData.get("clearForm");
    const questionId = formData.get("questionId");
    const newResources = formData.get("resources").split(",");
    const newQuestion = {
      ...Object.fromEntries(formData),
      resources: newResources,
      level: Number(newLevel),
      completed: false,
      editDate: dateFormat(new Date()),
    };

    const response = await fetch(`${API_URL}/react/${questionId}`, {
      method: "PATCH",
      body: JSON.stringify(newQuestion),
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const question = await response.json();
    toast.success("Question is edited successfully");
    return isClearForm ? {} : question;
  } catch (error) {
    toast.error(error.message);
    return {};
  }
};

const EditQuestion = ({ initialState = {} }) => {
  const [formState, formAction, isPending] = useActionState(editQuestionAction, { ...initialState, clearForm: false });
  return (
    <>
      {isPending && <Loader />}
      <h1 className={s.formTitle}>Edit question</h1>
      <div className={s.formContainer}>
        <QuestionForm formState={formState} formAction={formAction} isPending={isPending} submitBtnText="Edit question" />
      </div>
    </>
  );
};

export default EditQuestion;
