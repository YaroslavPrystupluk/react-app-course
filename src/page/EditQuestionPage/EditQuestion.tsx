import { useActionState, type FC } from "react";
import { QuestionForm } from "../../components/QuestionForm";
import { Loader } from "../../components/Loader";
import { delayFn } from "../../helper/delayFn";
import { API_URL } from "../../constants/global.constants";
import { toast } from "react-toastify";

import s from "./index.module.css";
import { dateFormat } from "../../helper/dateFormat";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import type { QuestionCardStateType } from "../../types/global.types";

const editQuestionAction = async (_prevState: Partial<QuestionCardStateType>, formData: FormData) => {
  try {
    await delayFn();
    const resourcesValue = formData.get("resources");
    const newLevel = formData.get("level");
    const isClearForm = formData.get("clearForm");
    const questionId = formData.get("questionId");
    const newResources = typeof resourcesValue === "string" ? resourcesValue.trim().split(",") : [];
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
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    toast.error(message);
    return {};
  }
};

type Props = {
  initialState: Partial<QuestionCardStateType>;
};

const EditQuestion: FC<Props> = ({ initialState }) => {
  const navigate = useNavigate();
  const [formState, formAction, isPending] = useActionState<Partial<QuestionCardStateType>, FormData>(editQuestionAction, {
    ...initialState,
    clearForm: false,
  });

  const [removeQuestions, isQuestionRemoving] = useFetch(async () => {
    const response = await fetch(`${API_URL}/react/${initialState.id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    toast.success("The question has been succssesfully removed");
    navigate("/");
  });

  const onRemoveQuestionHandler = () => {
    const isRemove = confirm("Are you sure");
    isRemove && removeQuestions();
  };

  return (
    <>
      {(isPending || isQuestionRemoving) && <Loader />}
      <h1 className={s.formTitle}>Edit question</h1>
      <div className={s.formContainer}>
        <button onClick={onRemoveQuestionHandler} className={s.removeBtn} disabled={isPending || isQuestionRemoving}>
          X
        </button>
        <QuestionForm
          formState={formState}
          formAction={formAction}
          isPending={isPending || isQuestionRemoving}
          submitBtnText="Edit question"
        />
      </div>
    </>
  );
};

export default EditQuestion;
